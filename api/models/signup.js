
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String,unique : true},
    gender: { type: String,},
    status: { type: String,},
    email: { type: String,unique : true},
    mobileNumber: { type: String,unique : true},
    password: { type: String,},
    encryptedpass: { type: String,},
   
})

module.exports = mongoose.model('users', userSchema);


