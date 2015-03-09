var request = require('request-promise');
var constants = require('./constants');
var _ = require('lodash');
var path = require('path');
var url = require('url');
var Promise = require('bluebird');
var glob = Promise.promisify(require("glob"));
var fs = Promise.promisifyAll(require('fs'));
var browserify = require('browserify');
var resumer = require('resumer');
var streamToPromise = require('stream-to-promise');
var Errors = require('./errors');

function createAndSaveLib(options) {
  options.output = path.dirname(options.output) || __dirname;
   return Promise.all([
      createLibFor(options , false, './taskd.dev.js'),
      createLibFor(options, true, './taskd.js'),
   ]);
}

function createLibFor(options, production, filePath) {
  return createTaskd(_.extend({}, options, {embedCode: !production})).then(createLibFile(path.resolve(options.output, filePath), options));
}

function createLibFile(output, options) {
  return function(content) {

    var scriptPath = path.dirname(module.filename);
    var fileContent = fs.readFileSync(path.resolve(scriptPath, './taskd_output.jst')).toString();
    fileContent = fileContent.replace('{CONFIG}', JSON.stringify(content, null, 2));

    var libStream = resumer().queue(fileContent).end();
    var writableSream = fs.createWriteStream(output);

    var b = browserify({standalone: 'taskd', basedir: scriptPath});
    b.add(libStream);

    // b.transform({
    //   global: true
    // }, 'uglifyify');
    return streamToPromise(b.bundle().pipe(writableSream));

  };
}

function createTaskd(options) {
  if (!options.tenantName) {
    Errors.fieldIsRequired('tenantName', 'your account name');
  }
  if (!options.tenantToken) {
    Errors.fieldIsRequired('tenantToken', 'your account token');
  }
  if (!options.files) {
    Errors.fieldIsRequired('files', 'the WebTasks to be run');
  }

  options.embedCode = _.isUndefined(options.embedCode) ? true : options.embedCode;
  return generateTasks(options).then(function(tasks) {

    var taskd = {
      embedCode: options.embedCode,
      tenantName: options.tenantName,
      tasks: tasks
    };

    if (options.embedCode) {
      taskd.tenantToken = options.tenantToken;
    }

    return taskd;
  });
}

function generateTasks(options) {

  return glob(options.files).then(function(files) {
    var tasksPromise = _.map(files, _.partial(createFileConfig, options));
    return Promise.all(tasksPromise).then(function(tasks) {
      return _.reduce(tasks, function(obj, task) {
        obj[task.name] = _.omit(task, 'name');
        return obj;
      }, {});
    });
  });
}

function createFileConfig(options, file) {
  var fileConfig = {
    name: path.basename(file, path.extname(file)),
    path: file
  };

  if (options.embedCode) {
    return Promise.resolve(fileConfig);
  } else {
    return request({
      url: url.resolve(constants.url, constants.tokenEndpoint),
      headers: {
        Authorization: 'Bearer ' + options.tenantToken
      },
      method: 'POST',
      json: true,
      body: {
        url: url.resolve(options.baseUrl || '/', path.relative(process.cwd(), file)),
        ectx: options.env
      }
    }).then(function(response) {
      fileConfig.token = response;
      return fileConfig;
    });
  }
}


module.exports = createAndSaveLib;
// module.exports = createTaskd;

