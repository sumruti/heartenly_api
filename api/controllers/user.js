
const User = require("./../models/user");

const Play = require("./../models/play");

const jwt = require("jsonwebtoken");

require('dotenv').load();


exports.login = (req, res, next) => {

  console.log(req.body,'---');
  User
    .find({ "userID": req.body.id })
    .exec()
    .then(admin => {
      if (admin.length >= 1) {
        const token = jwt.sign(
          {
            id: admin[0]._id,
          },
          'playit',
          {
            expiresIn: 60 * 60 * 24 * 7
          }
        );
        return res.status(201).json({
          message: "Authentication Successful",
          token: token,
          step: admin[0].nextSet
        })
      }
      else {
        return res.status(201).json({
          step: "info"
        })
      }
    })
}

exports.userCreate = (req, res, next) => {
  user = new User({
    userID: req.body.userID || '',
    fbid: req.body.id || '',
    name: req.body.name || '',
    location: req.body.location || '',
    category: req.body.cat || '',
    about: req.body.about || '',
    fan: req.body.fan || '',
    nextSet: 'editinfo'
  })
  user.save()
    .then(resa => {
      const token = jwt.sign(
        {
          id: resa._id,
        },
        'playit',
        {
          expiresIn: 60 * 60 * 24
        }
      );
      res.json({
        res: resa,
        step: "editinfo",
        token
      })
    })
}

exports.userCStep2 = (req, res, next) => {
  User
    .updateMany(
      { "_id": req.userData },
      { $set: { "story": req.body.story, nextSet: 'play' } })
    .then(resa => {
      console.log(resa)
      res.json({
        res: resa,
        step: "play"
      })
    })
}

exports.userCStep3 = (req, res, next) => {
  User
    .updateMany(
      { "_id": req.userData },
      {
        $set: {
          'media': {
            'img': req.body.imgs,
            'audio': req.body.audio,
            'video': req.body.video
          }, nextSet: 'addDate'
        }
      })
    .then(resa => {
      console.log(resa)
      res.json({
        res: resa,
        step: "addDate"
      })
    })
}

exports.userCStep4 = (req, res, next) => {
  console.log(req.userData)
  User
    .updateMany(
      { "_id": req.userData },
      {
        $set: { dates:req.body.dates , nextSet: 'about' }
      })
    .then(resa => {
      console.log(resa)
      res.json({
        res: resa,
        step: "about",
      })
    })
}

exports.userCStep5 = (req, res, next) => {
  const play = new Play({
    about: req.body.story,
    userId: req.userData
  })
  play.save()
    .then(response => {
      res.json({
        playid: response._id,
        step: "playupload"
      })
    })
}

exports.userCStep6 = (req, res, next) => {
  Play
    .updateMany(
      { "_id": req.body.id },
      {
        $set: {
          'media': {
            'img': req.body.imgs,
            'audio': req.body.audio,
            'video': req.body.video
          }, nextSet: 'addDatePlay'
        }
      })
    .then(resa => {
      res.json({
        res: resa,
        step: "addDatePlay"
      })
    })
}

exports.userCStep7 = (req, res, next) => {
  res.json({
    step: "moreInfo"
  })
}

exports.userCStep8 = (req, res, next) => {
  Play
    .updateMany(
      { "_id": req.body.id },
      {
        $set:
        {
          playName: req.body.playName,
          showTime: req.body.showTime,
          price: req.body.price,
          crowd: req.body.crowd,
          particpants: req.body.particpants,
          genre: req.body.genre
        }
      })
    .then(resa => {
      res.json({
        res: resa,
        step: "done"
      })
    })
}

exports.profile = (req, res, next) => {
  User
    .findOne({ "_id": req.userData })
    .exec()
    .then(admin => {
      if (admin) {
        return res.status(201).json({
          aaa: admin
        })
      }
      else {
        return res.status(202).json({
          aaa: false
        })
      }
    })
}

exports.play = (req, res, next) => {
  Play
    .find({ "userId": req.userData })
    .exec()
    .then(admin => {
      if (admin) {
        return res.status(201).json({
          aaa: admin
        })
      }
      else {
        return res.status(202).json({
          aaa: false
        })
      }
    })
}

exports.updateProfile = (req, res, next) => {
  User
    .updateMany({ "_id": req.body.id },
      {
        $set: {
          "name": req.body.name,
          "category": req.body.category,
          "sub_cat": req.body.sub_cat,
          "location": req.body.location,
          "about": req.body.about,
          "fan": req.body.fan,
          "story": req.body.story,
        }
      }
    )
    .then(response => {
      if (response) {
        return res.status(201).json({
          response
	})
      }
      else {
        return res.status(202).json({
          response: false
        })
      }
    })
}

