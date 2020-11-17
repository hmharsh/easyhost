function generateUID(timestamp) {
  // Make sure event if two items are uploaded on same time have different uid, with two extra random digits are associated
  return timestamp + getRandomInt(9).toString() + getRandomInt(9).toString()
}

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.objectIdWithTimestamp = objectIdWithTimestamp
module.exports.generateUID = generateUID