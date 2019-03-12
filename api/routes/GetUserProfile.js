const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


app.post('/', (req, res, next) => {

     var user_id = req.body.user_id;
     usermodel.find({'_id':user_id}).then(result=>{
     	console.log(result,'----------')
	       return res.status(201).json({ data: result});
	     
     })
	  
})

module.exports = app;