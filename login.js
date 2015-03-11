 var prompt = require('prompt');
 var colors = require('colors');
 var _ = require('lodash');
 var fs = require('fs');
 var path = require('path');

 var userSchema = {
  properties: {
    tenantName: {
      description: 'Enter your WebTask account name:',
      type: 'string',
      message: 'Account name doesn\'t have a valid format',
      required: true,
      pattern: /^[A-Za-z0-9-_]+$/
    },
    tenantToken: {
      description: 'Enter your WebTask Token (hidden):',
      type: 'string',
      hidden: true,
      message: 'Token must be a JWT',
      required: true,
      pattern: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    }
  }
 }

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

 exports.login = function() {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(getUserHome(), '.webtaskify.cfg'), 'utf8'));
  } catch(e) {
    throw new Error("You must do webtaskify login to be able to call this task".red);
  }

 }

exports.register = function() {
  prompt.message = '';
  prompt.delimiter = '';
  prompt.start();
  prompt.get(userSchema, function(err, result) {
    if (err) {
      console.log("The information entered is incorrect".underline.red);
      console.log((err.message || err).red);
      return;
    }

    fs.writeFileSync(path.resolve(getUserHome(), '.webtaskify.cfg'), JSON.stringify(_.pick(result, 'tenantName', 'tenantToken'), null, 2), 'utf8');
    console.log("Logged in successfully".green);
  });
}
