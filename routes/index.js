var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path.join');
var pathh = require('path');
var _ = require('underscore');
var _ = require('lodash');
var unzip = require('unzip');
var assert = require('assert');
const mongoose = require('mongoose');
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
const SimpleNodeLogger = require('simple-node-logger'),
  opts = {
    logFilePath: 'mylogfile.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log = SimpleNodeLogger.createSimpleLogger(opts);

const visits = mongoose.model("visits", schema.visitSchema);
const homevisits = mongoose.model("homevisits", schema.visitSchema);
const hosteditems = mongoose.model("hosteditems", schema.hostedItemSchema);

mongoose.connect(config.MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

router.get('/hosteditems', middleware.checkToken, async function (req, res, next) {
  const hosteditemInfo = await hosteditems.find({});
  try {
    res.send(hosteditemInfo);
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
});

router.get('/gethomevisits', middleware.checkToken, async function (req, res) {
  const homevisitsInfo = await homevisits.find({});
  try {
    res.send(homevisitsInfo);
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
});


router.get('/gethomevisits/:visiterId', middleware.checkToken, async function (req, res) {
  const homevisitsInfo = await homevisits.find({ 'uid': req.params.visiterId });
  try {
    res.send(homevisitsInfo);
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
});

router.get('/alldata', middleware.checkToken, async function (req, res, next) {
  const visitsInfo = await visits.find({});
  try {
    res.send(visitsInfo);
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
});

router.get('/veriyfyToken', middleware.checkToken, function (req, res, next) {
  res.sendStatus(200)
});

router.get('/table/:id', function (req, res, next) {
  res.redirect("/table.html#" + req.params.id)
});

router.get('/visits/:id', async function (req, res) {
  const hosteditemInfo = await hosteditems.find({ 'secretKey': req.params.id }, { 'uid': 1 });
  try {
    if (hosteditemInfo.length > 0) {
      const visitsInfo = await visits.find({ 'uid': hosteditemInfo[0].uid });
      res.json(visitsInfo);
    } else {
      res.sendStatus(500)
    }
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
});

router.post('/files/requiresecret/:id', async function (req, res) {
  var requestData = {};


  const hosteditemInfo = await hosteditems.find({ 'uid': req.params.id, 'stype': 'File hosting' }, { 'accessSecret': 1 });
  try {
    requestData.isSecretRequired = false
    if (hosteditemInfo.length > 0 && hosteditemInfo[0].accessSecret != undefined) {
      requestData.isSecretRequired = true
    }
    res.send(requestData)
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
})



router.post('/issuecredentials', async function (req, res, next) {
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

  const hosteditemInfo = new hosteditems(data);
  await hosteditemInfo.save();
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

router.post('/homevisits', async function (req, res) {
  req.body.stime = Date()
  req.body.remoteAddress = req.socket.remoteAddress
  req.body.remotePort = req.socket.remotePort
  req.body.localAddress = req.socket.localAddress
  req.body.localPort = req.socket.localPort
  req.body.uid = lib.generateUID(Date.now().toString())
  const data = new homevisits(req.body);
  try {
    // pastInfo contain the visit information of the visit which is made from the same IP and URL in past 'config.activeSessionTime' milli seconds
    // to make sure same visit information not inserted on page reloads
    const pastInfo = await homevisits.aggregate([
      { $match: { _id: { $gt: lib.objectIdWithTimestamp(Date.now() - config.activeSessionTime) } } },
      { $match: { url: req.body.url } },
      { $match: { ip: req.body.ip } }
    ])

    if (pastInfo.length == 0) {
      await data.save();
      log.info('Inserted visit info about -> ' + req.body.url + ' successfully!! with uid: ' + req.body.uid);
    }

    res.send(req.body.uid)
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
})








router.post('/visiterInfo', async function (req, res) {
  req.body.remoteAddress = req.socket.remoteAddress
  req.body.remotePort = req.socket.remotePort
  req.body.localAddress = req.socket.localAddress
  req.body.localPort = req.socket.localPort
  req.body.stime = Date()

  const data = new visits(req.body);
  try {
    // pastInfo contain the visit information of the visit which is made from the same IP and URL in past 'config.activeSessionTime' milli seconds
    // to make sure same visit information not inserted on page reloads
    const pastInfo = await visits.aggregate([
      { $match: { _id: { $gt: lib.objectIdWithTimestamp(Date.now() - config.activeSessionTime) } } },
      { $match: { url: req.body.url } },
      { $match: { ip: req.body.ip } }
    ])
    if (pastInfo.length == 0) {
      await data.save();
      log.info('Inserted visit info  -> ' + req.body.url);
    }
    hosteditems.updateOne({ 'uid': req.body.uid }, { $set: { 'lastAccess': Date.now() } })
    res.send(req.body)
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }
});

router.get('/delete/:id', async function (req, res, next) {
  // Fetch the UID of the stored data using supplied secret key
  const hosteditemsInfo = await hosteditems.find({ 'secretKey': req.params.id }, { 'uid': 1, 'stype': 1 });
  try {
    if (hosteditemsInfo.length > 0) {
      if (hosteditemsInfo[0].stype == "File hosting") {
        rimraf(path(__dirname, '../public', 'uploads', hosteditemsInfo[0].uid.toString()), function () { log.info("directory cleanup on delete for info of uid: " + hosteditemsInfo[0].uid.toString()); })
        rimraf(path(__dirname, '../public', 'uploads', hosteditemsInfo[0].uid.toString() + ".zip"), function () { log.info("zip file cleanup on delete for info of uid: " + hosteditemsInfo[0].uid.toString()); })
      }
      await hosteditems.deleteOne({ 'uid': hosteditemsInfo[0].uid })
      log.info("deleted db entry of uid: " + hosteditemsInfo[0].uid.toString());
      await visits.remove({ 'uid': hosteditemsInfo[0].uid })
      log.info("deleted visits of uid: " + hosteditemsInfo[0].uid.toString())
      res.send("files deleted succcessfully!!")

    } else {
      res.redirect(constants.values.notFoundPage)
    }
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
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
      log.error(err);
    });
    form.on('end', async function () {
      var hdata = {}; // hosting data
      hdata.public_link = source + "uploads/" + uid
      hdata.private_dashboard_link = source + "table/" + secretKey
      hdata.direct_link_to_delete_all = source + "delete/" + secretKey
      var data = {};
      data.uid = uid;
      data.lastAccess = Date.now();
      data.secretKey = secretKey.toString();
      data.upload_time = Date();
      if ("secret" in formData && formData.secret != '') {
        data.accessSecret = md5(formData.secret)
      }
      data.visiterId = formData.visiterId
      data.stype = "File hosting"
      const hosteditemInfo = new hosteditems(data);
      await hosteditemInfo.save();
      res.send(hdata.public_link + "+" + hdata.private_dashboard_link + "+" + hdata.direct_link_to_delete_all);
    });
    form.parse(req);
  }
  catch (e) {
    log.error(e)
    res.sendStatus(500)
  }
});

router.post('/files/:id', async function (req, res) {
  let password = req.headers['secret'] || ''; // Express headers are auto converted to lowercase
  var dirpath = path('public', 'uploads', req.params.id)

  const hosteditemsInfo = await hosteditems.find({ 'uid': req.params.id, 'stype': 'File hosting' }, { 'accessSecret': 1 });
  try {
    if (hosteditemsInfo.length > 0) {
      if (hosteditemsInfo[0].accessSecret == undefined) {
        checkFileAvailability()
      } else {

        if (password == "") {
          res.sendStatus(410)
        } else {
          if (hosteditemsInfo[0].accessSecret == password) {
            checkFileAvailability()
          } else {
            res.sendStatus(410)
          }
        }
      }
    } else {
      res.sendStatus(404) // in case if file is already deleted
    }
  } catch (err) {
    log.error(err)
    res.status(500).send(err);
  }

  function checkFileAvailability() {
    //Extract ZIP file, of already not extracted
    fs.access(dirpath, function (err) {
      if (err && err.code === 'ENOENT') {
        mkdirp(path("public", "uploads", req.params.id), function (e) {
          let stream = fs.createReadStream(dirpath + '.zip').pipe(unzip.Extract({ path: dirpath }));
          // Wait till zip get file extracted
          stream.on('close', () => {
            setTimeout(function () {
              rimraf(dirpath, function () { log.info("data directory cleaned up, path: " + dirpath); })
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
        log.error(err)
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
            log.error(e);
            res.sendStatus(500)
          }
        });
      data = _.sortBy(data, function (f) { return f.Name });
      res.json(data);
    });
  }
});
module.exports = router;
