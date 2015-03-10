var EmbedCodeTask = require('./EmbedCodeTask.js');
var CodeUrlCodeTask = require('./CodeUrlCodeTask.js');

function WebTask(manifest) {
  this.readConfig(manifest);
}

WebTask.prototype.readConfig = function(manifest) {
  var taskCreator = manifest.embedCode ? EmbedCodeTask : CodeUrlCodeTask;
  for (var task in manifest.tasks) {
    if (manifest.tasks.hasOwnProperty(task) && task) {
      this[task] = new taskCreator(manifest.tasks[task], manifest);
    }
  }
};

module.exports = WebTask;
