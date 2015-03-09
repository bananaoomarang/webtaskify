var EmbedCodeTask = require('./EmbedCodeTask.js');
var CodeUrlCodeTask = require('./CodeUrlCodeTask.js');

function Taskd(manifest) {
  this.readConfig(manifest);
}

Taskd.prototype.readConfig = function(manifest) {
  var taskCreator = manifest.embedCode ? EmbedCodeTask : CodeUrlCodeTask;
  for (var task in manifest.tasks) {
    if (manifest.tasks.hasOwnProperty(task) && task) {
      this[task] = new taskCreator(manifest.tasks[task], manifest);
    }
  }
};

module.exports = Taskd;
