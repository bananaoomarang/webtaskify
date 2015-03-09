var Taskd = require('./taskd');

var TaskdCreator = function(manifest) {
  return new Taskd(manifest)
};

module.exports = TaskdCreator;
