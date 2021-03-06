#!/usr/bin/env node
var program = require('commander');
var creator = require('./index');
var logger = require('./logger');
var _ = require('lodash');
var colors = require('colors');
var Errors = require('./errors');
var Login = require('./login');


program
  .version(require('./package.json').version)
  .command('login')
  .description('Enter your account name and WebTask token to run other tasks')
  .action(function(options) {
    Login.register();
  });

program
  .command('create')
  .description('Creates the proxy files to be able to call https://webtask.io/ to run your backend task')
  // .option('-t, --tenantName <tenantName>', 'The name of your account')
  .option('-b, --baseUrl <baseUrl>', 'Base URL for all tasks files. By default, Referer will be used from the request if not specified')
  .option('-f, --files <files>', 'Glob that references all tasks that can be used')
  // .option('-n, --tenantToken <tenantToken>', 'The main token from your account')
  .option('-e, --env <env>', 'The path to the .env file. Defaults to ./.env.')
  .option('-o, --output <folder>', 'Location to save the proxy files. Defaults to current directory')
  .action(function(options) {
    try {
      var loginOptions = Login.login();
      creator(_.extend(options, loginOptions)).then(function(response) {
        console.log("Proxy files creates successfully".green);
      }, function(error){
        Errors.displayException(error);
      });
    } catch (error) {
      Errors.displayException(error);
    }
  });


program
  .command('logs')
  .description('Logs the output of Webtask.io. Usefull for debugging tasks')
  // .option('-t, --tenantName <tenantName>', 'The name of your account')
  // .option('-n, --tenantToken <tenantToken>', 'The main token from your account')
  .option('-r, --raw', 'Outputs a raw JSON output')
  .action(function(options) {
    try {
      var loginOptions = Login.login();
      logger(_.extend(options, loginOptions));
    } catch (e) {
      Errors.displayException(e);
    }
  })



program.parse(process.argv);


