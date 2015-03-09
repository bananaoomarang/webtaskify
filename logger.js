var constants = require('./constants');
var _ = require('lodash');
var url = require('url');
var Promise = require('bluebird');
var request = require('request');



module.exports = function(options) {
  if (!options.tenantName) {
    Errors.fieldIsRequired('tenantName', 'your account name', 'check WebTask.io logs');
  }
  if (!options.tenantToken) {
    Errors.fieldIsRequired('tenantToken', 'your account token', 'check WebTask.io logs');
  }


  request({
    url: url.resolve(constants.url, constants.logEndpoint) + options.tenantName,
    method: 'GET',
    json: true,
    qs: {
      key: options.tenantToken
    }
  })
  .pipe(process.stdout);
}
