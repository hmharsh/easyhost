var IPToASN = require('ip-to-asn');
var client = new IPToASN();

function hourToMilliSec(hours) {
  return hours * 60 * 60 * 1000
}
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

function getASN(ip) {
  var addresses = [];
  addresses.push(ip)
  client.query(addresses, function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    return (results);

    // example result
    //   { '106.207.217.220':
    //  { range: '106.207.216.0/21',
    //    countryCode: 'IN',
    //    ASN: '45609',
    //    registrar: 'apnic',
    //    dateString: '2011-03-17',
    //    description:
    //     'BHARTI-MOBILITY-AS-AP Bharti Airtel Ltd. AS for GPRS Service, IN' } }

  });
}

module.exports.objectIdWithTimestamp = objectIdWithTimestamp
module.exports.generateUID = generateUID
module.exports.hourToMilliSec = hourToMilliSec
module.exports.getRandomInt = getRandomInt
module.exports.getASN = getASN