
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String,unique : true},
    gender: { type: String,},
    status: { type: String,},
    email: { type: String,unique : true},
    fullName: { type: String},
    DOB: { type: String},
    religion: { type: String},
    uploadcard: { type: String},
    wanna_find: { type: String},
    child: { type: String},
    address: { type: String},
    mobileNumber: { type: String,unique : true},
    password: { type: String,},
    encryptedpass: { type: String,},
    mobile_verified_status :{type:String},
    otp_expire_time : {type:String},
    role : {type:String},
    nickName : {type:String},
    interestedIn : {type:String},
    otp: {type:String},
    user_id: { type: Schema.Types.ObjectId, ref: "user_images" },
    Privacy: {type:String},
    cover: {type:String},
    profilepic: {type:String},

   
})

module.exports = mongoose.model('users', userSchema);


