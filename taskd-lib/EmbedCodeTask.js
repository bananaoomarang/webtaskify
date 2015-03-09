var request = require('reqwest');
var when = require('when');
var constants = require('./constants.json');
var url = require('url');
var querystring = require('querystring');

function EmbedCodeTask(task, manifest) {
  this.manifest = manifest;
  this.task = task;
  this.loadingTask = this.loadTask();
}

EmbedCodeTask.prototype.loadTask = function() {
  return when(request({
    url: url.resolve(location.origin, this.task.path),
    type: 'text',
    method: 'GET'
  })).catch(function() {
    throw new Error("Cannot load Taskd task ");
  });
}

EmbedCodeTask.prototype.run = function(params) {
  var __this = this;
  return this.loadingTask.then(function(taskContent) {
    return request({
      crossOrigin: true,
      url: constants.url + __this.manifest.tenantName + '?' + querystring.stringify(params),
      headers: {
        Authorization: 'Bearer ' + __this.manifest.tenantToken
      },
      method: 'POST',
      data: taskContent.response
    });
  });
}

module.exports = EmbedCodeTask;
