// var fs = require('fs');

// var deleteFolderRecursive = function (path) {
//   if (fs.existsSync(path)) {
//     var len = fs.readdirSync(path)
//     fs.readdirSync(path).forEach(function (file, index) {
//       var curPath = path + "/" + file;
//       if (fs.lstatSync(curPath).isDirectory()) { // recurse
//         deleteFolderRecursive(curPath);
//       } else { // delete file
//         fs.unlinkSync(curPath);
//       }
//     });
//     fs.unlinkSync(path);
//   }
// };

function objectIdWithTimestamp(timestamp) {
  // Convert string date to Date object (otherwise assume timestamp is a date)
  if (typeof (timestamp) == 'string') {
    timestamp = new Date(timestamp);
  }
  // Convert date object to hex seconds since Unix epoch
  var hexSeconds = Math.floor(timestamp / 1000).toString(16);

  // Create an ObjectId with that hex timestamp
  var constructedObjectId = require('mongodb').ObjectId(hexSeconds + "0000000000000000");

  return constructedObjectId
}


// module.exports.deleteFolderRecursive = deleteFolderRecursive
module.exports.objectIdWithTimestamp = objectIdWithTimestamp
