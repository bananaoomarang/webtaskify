var request = require('reqwest');
var when = require('when');
var constants = require('./constants.json');
var querystring = require('querystring');

function CodeUrlCodeTask(task, manifest) {
  this.manifest = manifest;
  this.task = task;
}

CodeUrlCodeTask.prototype.run = function(params) {
  return when(request({
    url: constants.url + this.manifest.tenantName + '?' + querystring.stringify(params),
    crossOrigin: true,
    headers: {
      Authorization: 'Bearer ' + this.task.token
    },
    method: 'POST'
  }));

}

module.exports = CodeUrlCodeTask;
