const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const SendOtp = require('sendotp');
var rn = require('random-number');
const sendOtp = new SendOtp('SADFDFDFDS115454SDFDSADSADSA');

var accountSid = 'ACfee313d0fdda376e44d9bfd6378c636c'; // Your Account SID from www.twilio.com/console
var authToken = '2b9ebbc838f284e1756d597bad210195';   
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
const moment = require('moment');

app.post('/users/GetUserById', (req, res, next) => {

      var user_id = req.body.user_id;
      usermodel.find({'_id':user_id}).then(result=>{
        userPost.find({'user_id':user_id}).then(userPost=>{
          userimg.find({'user_id':user_id}).then(user_img=>{
           var primaryimg= [];
              user_img.forEach(function(GetPrimaryImg) {
                 if(GetPrimaryImg.SetAsPrimary==1){
                    primaryimg.push(GetPrimaryImg.image)
                 }
              });
            return res.status(201).json({ data: result,userPost:userPost,user_img:user_img,primaryimg:primaryimg});

          });
        });

      })


    
});

app.post('/users/edit_user_profile', (req, res, next) => {
        var gen = rn.generator({
                min: -1000
                , max: 1000
                , integer: true
            })
 
        if (req.files) {
          /*console.log(req.files.pictures.length)
            if (req.files.pictures.length) {
              console.log('001110')
                    for (i = 0; i < req.files.pictures.length; i++)
                    {

                    var data = req.files.pictures[i].name;
                    // update user img
                    var splitname = data.split('.');
                    var time = new Date().getTime() / 1000;
                    var image_name = parseInt(time) + "_" + gen(500)  + "." + splitname[1];
                    pictures = image_name.trim(' ');
                    // Use the mv() method to place the file somewhere on your server 
                    req.files.pictures[i].mv('uploads/user_img/' + pictures, function (err) {
                        if (err)
                            console.log("error is:" + err);
                    });
                    console.log(req.protocol+'://'+req.get('host')+'/user_img/'+pictures,'--')
                  let Data = new userimg({
                image: req.protocol+'://'+req.get('host')+'/user_img/'+pictures,
                user_id:req.body.user_id,
                SetAsPrimary:'0'

              
               });

                   Data.save()
                 .then(img_res => {
                          console.log(img_res)
                 });

               
                } 
            }else{*/

              var data = req.files.pictures.name;
                    // update user img
                    var splitname = data.split('.');
                    var time = new Date().getTime() / 1000;
                    var image_name = parseInt(time) + "_" + gen(500)  + "." + splitname[1];
                    pictures = image_name.trim(' ');
                    // Use the mv() method to place the file somewhere on your server 
                    req.files.pictures.mv('uploads/user_img/' + pictures, function (err) {
                        if (err)
                            console.log("error is:" + err);
                    });
                  let Data = new userimg({
                    image: req.protocol+'://'+req.get('host')+'/user_img/'+pictures,
                    user_id:req.body.user_id,
                    SetAsPrimary:'0'
                   });

                   Data.save()
                 .then(img_res => {
                 });

          //  }
        }

               

              
              usermodel.update({'_id': req.body.user_id}, {'$set': {
                    'username': req.body.username,
                    'gender': req.body.gender,
                    //'email': req.body.email,
                    'fullName': req.body.fullName,
                    'DOB': req.body.DOB,
                    'religion': req.body.religion,
                    'status': req.body.status,
                    'wanna_find': req.body.wanna_find,
                    'child': req.body.child,
                    'address': req.body.address,
                }}).then(result=>{
                     return res.status(201).json({message:"Profile updated successfull", data: result});
                   
                 })
});


app.post('/users/mobile', (req, res, next) => {
    var otp = Math.floor(1000 + Math.random() * 9000);
    var startdate = moment().format("YYYY-MM-DD hh:mm:ss");
    var expire_time = moment(startdate).add(1, 'minutes');  
    console.log(req.body)
    client.messages.create({
        body: "OTP: "+otp+"",
        to: req.body.mobile,  // Text this number
        from: '+12028049449' // From a valid Twilio number
    })
    .then((message) => console.log(message,'-------------'));

    usermodel.update({'_id': req.body.user_id}, {'$set': {
            'mobile_verified_status': 0,
            'otp_expire_time':expire_time,
            'otp' : otp
        }}).then(result=>{
            return res.status(201).json({status:true});
         
     })



  


});

app.post('/users/verifyotp' , (req, res, next) => {
    usermodel.find({'_id':req.body.user_id}).then(result=>{

        var expire_time = moment(result[0].otp_expire_time).format("YYYY-MM-DD hh:mm:ss")
        var now =  moment().format("YYYY-MM-DD hh:mm:ss");

        if (now > expire_time) {
               return res.status(201).json({message:"your otp is expired please re-send again",status:false});
        } else {
              
               if(result[0].otp===req.body.otp){
                   usermodel.update({'_id': req.body.user_id}, {'$set': {
                            'mobile_verified_status': 1,
                        }}).then(result=>{
                           return res.status(201).json({message:"Verified",status:true});
                     })
                  
               }else{

                  return res.status(201).json({message:"You have entered the wrong otp password",status:false});
               }
           
        }

    });
});

app.post('/users/deleteImage' , (req, res, next) => {

        userimg.remove({'_id':req.body.img_id}).then(delete_img=>{
           return res.status(201).json({ status: true,message:"Image deleted successfull"});
        });
})


app.post('/users/setImgPrimary' , (req, res, next) => {
        userimg.updateMany({'user_id': req.body.user_id}, {'$set': {
            'SetAsPrimary':0,
        }}).then(result=>{

            userimg.update({'_id': req.body.img_id}, {'$set': {
            'SetAsPrimary':1,
            }}).then(result=>{
                 return res.status(201).json({status:true});
            });
           
       })
})

app.get('/users/GetallUser', async (req, res, next) => {

            var users= [];
            var user = await userimg.find()
                    .populate("user_id")
                    .exec();
                     
                    user.forEach(function(user) {
                        if(user.SetAsPrimary==1){
                            users.push({user})
                                console.log(user.user_id)
                        }
                    })
                    return res.status(201).json({ data: users,status:true});

  /* usermodel.find({}).then(result=>{
   // console.log(result)

     result.forEach(function(user) {

         userimg.find({'user_id':user._id}).then(user_img=>{
                   user_img.forEach(function(GetPrimaryImg) {
                             if(GetPrimaryImg.SetAsPrimary==1){
                                 users.push({user:GetPrimaryImg.image,
                                    username:user.username,
                                    fullname:user.fullName,
                                    gender:user.gender,
                                    status:user.status,
                                    email:user.email,
                                    DOB:user.DOB,
                                    religion:user.religion,
                                    wanna_find:user.wanna_find,
                                    child:user.child,
                                    address:user.address,
                                    mobileNumber:user.mobileNumber,
                                })
                             }
                });
            });
         
     })
               return res.status(201).json({ data: users,status:true});

     
});*/
});

app.post('/AddPost' , (req, res, next) => {
      var status = req.body.status;
      var date = req.body.date;
      var user_id = req.body.user_id;
      userPost.find({user_id: user_id}).then(checkUserStatus=>{
        console.log(checkUserStatus.length,'checkUserStatus');

         if(checkUserStatus.length==0){
            let Data = new userPost({
                  status: status,
                  date: date,
                  user_id:user_id,
               });
              Data.save()
                   .then(result => {
                   
                     return res.status(200).json({
                        message: "Status added successfully",
                        status: true,
                       
                      });
                   })
                   .catch(err => {
                     console.log(err);
                      return res.status(201).json({
                          message: "Something went wrong,Please try again",
                          status: false,
                        });
                   })

         }else{
             userPost.update({'user_id': user_id}, {'$set': {
                'status':status,
                'date':date,
                }}).then(result=>{
                      return res.status(200).json({
                        message: "Status updated successfully",
                        status: true,
                       
                      });
                });

         }
             
       });
})
app.post('/aboutMe' , (req, res, next) => {
      var aboutMe = req.body.aboutMe;
      console.log(aboutMe,'aboutMe')
      var user_id = req.body.user_id;
      userPost.find({user_id: user_id}).then(checkUser=>{

         if(checkUser.length==0){
            let Data = new userPost({
                  about: aboutMe,
                  user_id:user_id,
               });
              Data.save()
                   .then(result => {
                   
                     return res.status(200).json({
                        message: "About added successfully",
                        status: true,
                       
                      });
                   })
                   .catch(err => {
                     console.log(err);
                      return res.status(201).json({
                          message: "Something went wrong,Please try again",
                          status: false,
                        });
                   })

         }else{
             userPost.update({'user_id': user_id}, {'$set': {
                'about':aboutMe,
                }}).then(result=>{
                      return res.status(200).json({
                        message: "About added successfully",
                        status: true,
                       
                      });
                });

         }
             
       });
})




module.exports = app;