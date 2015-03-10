var Webtask = require('./webtask');

var WebtaskCreator = function(manifest) {
  return new Webtask(manifest)
};

module.exports = WebtaskCreator;
