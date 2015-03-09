var constants = require('./constants');
var _ = require('lodash');
var url = require('url');
var Promise = require('bluebird');
var request = require('request');
var through = require('through')
var debug = require('debug')('webtaskify');
var colors = require('colors');
var prettyjson = require('prettyjson');

module.exports = function(options) {
  if (!options.tenantName) {
    Errors.fieldIsRequired('tenantName', 'your account name', 'check WebTask.io logs');
  }
  if (!options.tenantToken) {
    Errors.fieldIsRequired('tenantToken', 'your account token', 'check WebTask.io logs');
  }

  var requestStream = request({
    url: url.resolve(constants.url, constants.logEndpoint) + options.tenantName,
    method: 'GET',
    json: true,
    qs: {
      key: options.tenantToken
    }
  })

  debug("Raw option", options.raw);
  if (!options.raw) {
    var dataParser = through(function write(data) {
      var log = data.toString('utf8');
      this.queue('New log entry:'.underline.magenta);
      this.queue('\n');
      this.queue(prettyjson.render(JSON.parse(log)));
    });
    requestStream = requestStream.pipe(dataParser);
  }
  requestStream.pipe(process.stdout);
}
