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

     var name = req.body.name;
     var gender = req.body.gender;
     var relationship = req.body.relationship;
     var email = req.body.email;
     var mobileNumber = req.body.mobileNumber;
     var username = req.body.username;
     var hashedPassword = bcrypt.hashSync(req.body.password, 8);
     const encryptedString = cryptr.encrypt(req.body.password);
//const decryptedString = cryptr.decrypt(encryptedString);

   	 let Data = new usermodel({
		  name: name,
		  //gender: gender,
		  //relationship: relationship,
		  email: email,
		 // mobileNumber: mobileNumber,
		  password: hashedPassword,
		  //username: username,
		  //encryptedpass:encryptedString

		  
	 });
	
     usermodel.find({'email':email}).then(result=>{
     
	     if(result.length==0){
	     	Data.save()
			   .then(Signupresult => {
			   	var token = jwt.sign({ id: result._id }, "ADNDJKWEDJKSABSCNMCBNXZCHSADA", {
			      expiresIn: 86400 // expires in 24 hours
			    });
			     return res.status(200).json({
		          message: "Signup Successful",
		          status: true,
		          token:token,
		          user_id:Signupresult._id
		        });
			   })
			   .catch(err => {
			   	 console.log(err);
			      return res.status(201).json({
			          message: err,
			          status: false,
			        });
			   })

	     }else{
                return res.status(201).json({
		          message: 'Email ' + email + ' is already taken',
		          status: false,
		        });
	     }
     })
	  
})

module.exports = app;