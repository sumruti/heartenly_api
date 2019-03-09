const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

app.post('/', (req, res, next) => {

     var email = req.body.email;
     var password = req.body.password;
     usermodel.find({'email':email}).then(user=>{
     	console.log(user)
     	//return false
	    if (user.length==0){
	    	return res.status(201).send({ status: false, token: null,user_id:null,message: 'Email and password incorrect.' });
	    }else{ 
			    var passwordIsValid = bcrypt.compareSync(password,user[0].password);
			    if (!passwordIsValid){
						return res.status(201).send({ status: false, token: null ,message: 'Email and password incorrect',user_id:null});
			    }else{ 
				        var token = jwt.sign({ id: user._id }, 'ADNDJKWEDJKSABSCNMCBNXZCHSADA', {
				     	   expiresIn: 86400 // expires in 24 hours
				        });
			            res.status(200).send({ status: true, token: token,message:"Login successfull" ,user_id:user[0]._id});
		        } 
	}
     }).catch(err => {
	   	 console.log(err);
	      return res.status(504).json({
	          message: "Error on the server.",
	          status: false,
	          user_id:null
	        });
	   })
	  
})

module.exports = app;