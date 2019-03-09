const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
app.post('/', (req, res, next) => {

     var email = req.body.email;
     usermodel.find({'email':email}).then(user=>{
     	console.log(user)
     	//return false
	    if (user.length==0){
	    	return res.status(404).send({ status: false,message: 'email does not exist' });
	    }else{ console.log(user[0].password,'0000');
	    	    const decryptedpassword = cryptr.decrypt(user[0].encryptedpass);
	    	  

               // create reusable transporter object using the default SMTP transport
				var transporter = nodemailer.createTransport('smtps://sumitchoudhary727@gmail.com:sumit1994@smtp.gmail.com');

				// setup e-mail data with unicode symbols
				var mailOptions = {
				    from: '"Forget Password ?" bavasofts@gmail.com', // sender address
				    to: email, // list of receivers
				    subject: 'Forgot Password✔', // Subject line
				    html: '<b>You are receiving this because you  have requested the reset of the password for your account.Your old password '+decryptedpassword+'</b>' // html body
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        return console.log(error);
				    }
				    return res.status(200).json({
			          message: 'An e-mail has been sent to ' + user[0].email + ' with further instructions.',
			          status: true,
			        });

				    
				    console.log('Message sent: ' + info.response);
				});
					
			  
	    }
     }).catch(err => {
	   	 console.log(err);
	      return res.status(504).json({
	          message: "Error on the server.",
	          status: false,
	        });
	   })
	  
})



module.exports = app;