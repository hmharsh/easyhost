var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path.join');
var pathh = require('path');
var _ = require('underscore');
var _ = require('lodash');
var unzip = require('unzip');
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient
var schedule = require('node-schedule');
var mkdirp = require('mkdirp')
var request = require('request');
var formidable = require('formidable');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var rimraf = require("rimraf");

var config = require("../js/config");
var constants = require("../js/constants");
var lib = require('../js/library')
var middleware = require('../js/middleware')
var schema = require('../js/schema')
var dir = process.cwd();


router.get('/', function (req, res, next) {
  res.send("index.html")
});

router.get('/uploads/:id', function (req, res, next) {
  res.redirect("/template.html#" + req.params.id)
});

router.get('/download/:id', function (req, res, next) {
  if (fs.existsSync(path(__dirname, '../public', 'uploads', req.params.id + '.zip'))) {
    res.download(path(__dirname, '../public', 'uploads', req.params.id + '.zip'))
  } else {
    res.redirect(constants.values.notFoundPage)
  }
});

router.get('/hosteditems', middleware.checkToken, function (req, res, next) {
  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collection = db.collection('hosteditem');
    collection.find({}).toArray(function (err, docs) {
      if (err) throw err;
      res.json(docs)
      db.close();
    });
  });
});

router.get('/gethomevisits', middleware.checkToken, function (req, res) {
  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collection = db.collection('homevisits');
    collection.find({}).toArray(function (err, docs) {
      if (err) throw err;
      res.json(docs);
      db.close();
    });
  });
});


router.get('/gethomevisits/:visiterId', middleware.checkToken, function (req, res) {
  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collection = db.collection('homevisits');
    collection.find({ 'uid': req.params.visiterId }).toArray(function (err, docs) {
      if (err) throw err;
      res.json(docs);
      db.close();
    });
  });
});

router.get('/alldata', middleware.checkToken, function (req, res, next) {
  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collection = db.collection('visits');
    collection.find({}).toArray(function (err, docs) {
      if (err) throw err;
      res.json(docs)
      db.close();
    });
  });
});

router.get('/veriyfyToken', middleware.checkToken, function (req, res, next) {
  res.sendStatus(200)
});

router.get('/table/:id', function (req, res, next) {
  res.redirect("/table.html#" + req.params.id)
});

router.get('/visits/:id', function (req, res) {
  try {
    //get visits of specific userid
    function data(tim) {
      MongoClient.connect(config.mongoURL, function (err, db) {
        if (err) throw err;
        var collection = db.collection('visits');
        collection.find({ 'uid': tim }).toArray(function (err, docss) {
          if (err) throw err;
          res.json(docss)
          db.close();
        });
      });
    }
    MongoClient.connect(config.mongoURL, function (err, db) {
      if (err) throw err;
      var collection = db.collection('hosteditem');
      collection.find({ 'secretKey': req.params.id }, { 'uid': 1 }).toArray(function (err, docs) {
        if (err) throw err;
        if (docs.length > 0) {
          data(docs[0].uid)
          tim = docs[0].uid
        } else {
          res.sendStatus(500)
        }
        db.close();
      });
    });
  }
  catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
});

router.post('/files/:id', function (req, res) {
  let password = req.headers['secret'] || ''; // Express headers are auto converted to lowercase
  var dirpath = path('public', 'uploads', req.params.id)

  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collection = db.collection('hosteditem');
    collection.find({ 'uid': req.params.id, 'stype': 'File hosting' }, { 'accessSecret': 1 }).toArray(function (err, docs) {
      if (err) throw err;
      if ("accessSecret" in docs[0]) {
        if (password == "") {
          res.send(410)
        } else {
          if (docs[0].accessSecret == password) {
            checkFileAvailability()
          } else {
            res.send(410)
          }
        }

      } else {
        checkFileAvailability()
      }
      db.close();

    });
  });



  function checkFileAvailability() {
    // Add dir deletion feature after 5 min of unzip

    //Extract ZIP file, of already not extracted
    fs.access(dirpath, function (err) {
      if (err && err.code === 'ENOENT') {
        mkdirp(path("public", "uploads", req.params.id), function (e) {
          let stream = fs.createReadStream(dirpath + '.zip').pipe(unzip.Extract({ path: dirpath }));
          // Wait till zip get file extracted
          stream.on('close', () => {
            setTimeout(function () {
              rimraf(dirpath, function () { console.log("data directory cleaned up, path: " + dirpath); })
            }, config.storeExtractedFileTime);
            serveFiles()
          });
        })
      } else {
        serveFiles()
      }
    });
  }

  function serveFiles() {
    if (!dir.match(/public/)) {
      dir = dirpath
    }
    var currentDir = dir;
    var query = req.query.path || '';
    if (query) currentDir = path(dir, query);
    fs.readdir(currentDir, function (err, files) {
      if (err) {
        console.log(err)
        res.redirect(constants.values.notFoundPage)
      }
      var data = [];
      files
        .filter(function (file) {
          return true;
        })
        .forEach(function (file) {
          try {
            var isDirectory = fs.statSync(path(currentDir, file)).isDirectory();
            if (isDirectory) {
              data.push({ Name: file, IsDirectory: true, Path: path(query, file) });
            } else {
              var ext = pathh.extname(file);
              data.push({ Name: file, Ext: ext, IsDirectory: false, Path: path(query, file) });
            }
          } catch (e) {
            console.log(e);
            res.sendStatus(500)
          }
        });
      data = _.sortBy(data, function (f) { return f.Name });
      res.json(data);
    });
  }
});

router.post('/files/requiresecret/:id', function (req, res) {
  var requestData = {};
  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collection = db.collection('hosteditem');
    collection.find({ 'uid': req.params.id, 'stype': 'File hosting' }, { 'accessSecret': 1 }).toArray(function (err, docs) {
      if (err) throw err;
      if ("accessSecret" in docs[0]) {
        requestData.isSecretRequired = true
      } else {
        requestData.isSecretRequired = false
      }
      db.close();
      res.send(requestData)
    });
  });
})

// router.get('/files', function (req, res) {
//   try {
//     var currentDir = dir;
//     var query = req.query.path || '';
//     if (query) currentDir = path(dir, query);
//     fs.readdir(currentDir, function (err, files) {
//       if (err) {
//         res.send("please enter valid url..")
//         throw err;
//       }
//       var data = [];
//       files
//         .filter(function (file) {
//           return true;
//         })
//         .forEach(function (file) {
//           try {
//             var isDirectory = fs.statSync(path(currentDir, file)).isDirectory();
//             if (isDirectory) {
//               data.push({ Name: file, IsDirectory: true, Path: path(query, file) });
//             } else {
//               var ext = path.extname(file);
//               data.push({ Name: file, Ext: ext, IsDirectory: false, Path: path(query, file) });
//             }
//           } catch (e) {
//             console.log(e);
//           }
//         });
//       data = _.sortBy(data, function (f) { return f.Name });
//       res.json(data);
//     });
//   }
//   catch (e) {
//     console.log(e)
//   }
// });

router.post('/issuecredentials', function (req, res, next) {
  var time = Date.now().toString()
  uid = lib.generateUID(time);
  var source = req.headers.referrer || req.headers.referer
  var hdata = {};
  var secretKey = md5(time + config.secret);
  hdata.private_dashboard_link = source + "table/" + secretKey
  scriptTag = "&lt;script src='" + source + "javascripts/commancript.js?id=" + uid + "''&gt;&lt;/script&gt;"
  res.send(hdata.private_dashboard_link.toString() + '+' + scriptTag)
  var data = {};
  data.uid = uid;
  data.secretKey = secretKey.toString();
  data.upload_time = Date();
  data.visiterId = req.body.visiterId
  data.stype = "Script tag"
  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collcetion = db.collection('hosteditem');
    collcetion.insertOne(data, function (err, res) {
      if (err) throw err;
      console.log('Inserted credentials');
      db.close();
    });
  });
});

router.post('/login', function (req, res, next) {
  if (req.body.username && req.body.password) {
    if (md5(req.body.username) === config.usernameHash && md5(req.body.password) === config.passwordHash) {
      let token = jwt.sign({ username: req.body.username },
        config.secret,
        {
          expiresIn: config.loginTokenExpiry
        }
      );
      // return the JWT token for the future API calls
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
      });
    }
    else {
      res.status(401).json({
        message: "Enter valid username and password..",
        success: false
      });
    }
  }
  else {
    res.send(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    });
  }
});

router.post('/logout', function (req, res, next) {
  req.session.destroy();
  res.send("index.html")
});

router.post('/homevisits', function (req, res) {
  req.body.stime = Date()
  req.body.remoteAddress = req.connection.remoteAddress
  req.body.remotePort = req.connection.remotePort
  req.body.localAddress = req.connection.localAddress
  req.body.localPort = req.connection.localPort
  try {
    MongoClient.connect(config.mongoURL, function (err, db) {
      //assert.equal(err,null);
      var collcetion = db.collection('homevisits');
      collcetion.aggregate([
        { $match: { _id: { $gt: lib.objectIdWithTimestamp(Date.now() - config.activeSessionTime) } } },
        { $match: { url: req.body.url } },
        { $match: { ip: req.body.ip } }
      ]).toArray(function (err, docss) {
        if (err) throw err;
        if (docss.length < 1) {
          req.body.uid = lib.generateUID(Date.now().toString())
          collcetion.insertOne(req.body, function (eerr, rres) {
            if (eerr) throw eerr;
            console.log('Inserted info about -> ' + req.body.url + ' successfully!! with uid: ' + req.body.uid);
            db.close();
            res.send(req.body.uid)
          });
        }
        db.close();
      });
    });
  }
  catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})








router.post('/visiterInfo', function (req, res) {
  req.body.remoteAddress = req.connection.remoteAddress
  req.body.remotePort = req.connection.remotePort
  req.body.localAddress = req.connection.localAddress
  req.body.localPort = req.connection.localPort
  req.body.stime = Date()
  try {
    MongoClient.connect(config.mongoURL, function (err, db) {
      if (err) throw err;
      var collcetion = db.collection('visits');
      collcetion.aggregate([
        { $match: { _id: { $gt: lib.objectIdWithTimestamp(Date.now() - config.activeSessionTime) } } },
        { $match: { url: req.body.url } },
        { $match: { ip: req.body.ip } }
      ]).toArray(function (err, docss) {
        if (err) throw err;
        if (docss.length < 1) {
          collcetion.insertOne(req.body, function (eerr, rres) {
            if (eerr) throw eerr;
            console.log('visit info inserted');
            db.close();
          });
        }
        db.close();
      });
    });
    // If last inserted within config.activeSessionTime milli seconds, update last visit value
    MongoClient.connect(config.mongoURL, function (err, db) {
      if (err) throw err;
      var collection = db.collection('hosteditem');
      collection.updateOne({ 'uid': req.body.uid }
        , { $set: { 'lastAccess': Date.now() } }, null, function (err, result) {
          if (err) throw err;
          console.log("hosted file's last visit info updated ");
        });
    });
    res.send(req.body)
  }
  catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
});

router.get('/delete/:id', function (req, res, next) {
  // Fetch the UID of the stored data using supplied secret key
  MongoClient.connect(config.mongoURL, function (err, db) {
    if (err) throw err;
    var collection = db.collection('hosteditem');
    collection.find({ 'secretKey': req.params.id }, { 'uid': 1, 'stype': 1 }).toArray(function (err, docs) {
      if (err) throw err;
      if (docs.length > 0) {
        dat(docs[0])
        tim = docs[0].uid
      } else {
        res.redirect(constants.values.notFoundPage)
      }
      db.close();
    });
  });

  // Perform deletion using UID
  var dat = function (data) {
    if (data.stype == "File hosting") {
      rimraf(path(__dirname, '../public', 'uploads', data.uid.toString()), function () { console.log("directory cleanup on delete for data of uid: " + data.uid.toString()); })
      rimraf(path(__dirname, '../public', 'uploads', data.uid.toString() + ".zip"), function () { console.log("zip file cleanup on delete for data of uid: " + data.uid.toString()); })
    }
    MongoClient.connect(config.mongoURL, function (err, db) {
      if (err) throw err;
      var collcetion = db.collection('hosteditem');
      collcetion.deleteOne({ 'uid': data.uid }, function (err, result) {
        if (err) throw err;
        console.log("deleted database entry of uid: " + data.uid.toString());
      });
    });

    MongoClient.connect(config.mongoURL, function (err, db) {
      if (err) throw err;
      var collcetion = db.collection('visits');
      collcetion.remove({ 'uid': data.uid }, function (err, result) {
        if (err) throw err;
        console.log("deleted visits of uid: " + data.uid.toString())
      });
    });
    res.send("files deleted succcessfully!!")
  }
});

router.post('/uploadfile', function (req, res) {
  try {
    var formData = {};
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = pathh.join(__dirname, '../public', '/uploads');
    var time = Date.now().toString()
    var uid = lib.generateUID(time)
    var secretKey = md5(time + config.secret);
    var source = req.headers.referrer || req.headers.referer
    form.on('file', function (field, file) {
      fs.renameSync(file.path, pathh.join(form.uploadDir, uid + ".zip"));
    });
    form.on('field', function (name, value) {
      formData[name] = value
    });
    form.on('error', function (err) {
      console.log('Error: \n' + err);
    });
    form.on('end', function () {
      var hdata = {}; // hosting data
      hdata.public_link = source + "uploads/" + uid
      hdata.private_dashboard_link = source + "table/" + secretKey
      hdata.direct_link_to_delete_all = source + "delete/" + secretKey
      var data = {};
      data.uid = uid;
      data.lastAccess = lib.objectIdWithTimestamp(Date.now());
      data.secretKey = secretKey.toString();
      data.upload_time = Date();
      if ("secret" in formData && formData.secret != '') {
        data.accessSecret = md5(formData.secret)
      }
      data.visiterId = formData.visiterId
      data.stype = "File hosting"
      MongoClient.connect(config.mongoURL, function (err, db) {
        if (err) throw err;
        var collcetion = db.collection('hosteditem');
        collcetion.insertOne(data, function (err, res) {
          if (err) throw err;
          db.close();
        });
      });
      res.send(hdata.public_link + "+" + hdata.private_dashboard_link + "+" + hdata.direct_link_to_delete_all);
    });
    form.parse(req);
  }
  catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
});
module.exports = router;
