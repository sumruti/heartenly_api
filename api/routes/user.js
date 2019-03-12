const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/auth');
var multer = require('multer')
var AWS = require('aws-sdk')
var multerS3 = require('multer-s3')
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-south-1' })



var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'playit-dev',

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname)
    }
  })
})

router.post("/login", UserController.login);

router.post('/uploadFile', (req, res, next) => {
  console.log(req.body)
  var params = {
    ACL: 'public-read',
    Bucket: 'playitev',
    Key: Date.now().toString() + req.body.name,
    Expires: 10000,
    ContentType: req.body.type
  }
  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    else {
      return res.json({
        postURL: url,
        getURL: url.split("?")[0]
      })
    }
  })
})

router.get('/aaa', (req, res, next) => {
  var params = {
    Bucket: 'playit-dev',
    Key: 'hh1540802060906.jpg',
    Expires: 10000,
  }
  s3.getSignedUrl('getObject', params, (err, url) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    else {
      return res.json({
        postURL: url,
        getURL: url.split("?")[0]
})
}
})
})

router.post("/createUser", UserController.userCreate);
router.post("/createUser/step2", checkAuth, UserController.userCStep2);
router.post("/createUser/step3", checkAuth, UserController.userCStep3);
router.post("/createUser/step4", checkAuth, UserController.userCStep4);
router.post("/createUser/step5", checkAuth, UserController.userCStep5);
router.post("/createUser/step6", checkAuth, UserController.userCStep6);
router.post("/createUser/step7", checkAuth, UserController.userCStep7);
router.post("/createUser/step8", checkAuth, UserController.userCStep8);
router.post("/profile", checkAuth, UserController.profile);
router.post("/updateProfile", checkAuth, UserController.updateProfile);
router.post("/play", checkAuth, UserController.play);
router.get('/checkSlug', (req, res, next) => {
console.log('--------------------------------------------------------------------------------------------------');
})
module.exports = router;
                        
