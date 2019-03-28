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
     console.log( req.body.payment)
     var paid_status = req.body.payment.paid;
     var payerID = req.body.payment.payerID;
     var paymentID = req.body.payment.paymentID;
     var paymentToken = req.body.payment.paymentToken;
     var plan = req.body.plan;

console.log(paymentToken,'paymentToken')
   	 let Data = new userpayments({
		  user_id: user_id,
		  plan: plan,
		  paid_status: paid_status,
		  payerID:payerID,
		  paymentID:paymentID,
		  paymentToken:paymentToken,
	});

	Data.save()
		.then(Signupresult => {
		     return res.status(200).json({
		      message: "Payment Successful",
		      status: true,
		    });
		})
		.catch(err => {
		  	return res.status(201).json({
		      message: err,
		      status: false,
		    });
		})


	
})

module.exports = app;