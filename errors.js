exports.displayException = function(error) {
  console.log("There was an error creating your proxy files".red);
  console.log((error.stack || error).underline.red);
};

exports.fieldIsRequired = function(fieldName, fieldDesc, action) {
  throw new Error('You must send the' + (fieldDesc + ' (' + fieldName + ')').blue + ' to be able to ' + (action || 'create the JS proxies for webtask.io'));
}
