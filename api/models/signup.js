
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String,unique : true,},
    gender: { type: String,},
    status: { type: String,},
    email: { type: String,unique : true},
    fullName: { type: String},
    DOB: { type: String},
    religion: { type: String},
    wanna_find: { type: String},
    child: { type: String},
    address: { type: String},
    mobileNumber: { type: String,unique : true},
    password: { type: String,},
    encryptedpass: { type: String,},
    mobile_verified_status :{type:String},
    otp_expire_time : {type:String},
    otp: {type:String},
    image: [{type: mongoose.Schema.Types.ObjectId, ref: 'user_images'}]
   
})

module.exports = mongoose.model('users', userSchema);


