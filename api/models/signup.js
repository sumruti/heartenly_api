
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String,},
    gender: { type: String,},
    relationship: { type: String,},
    email: { type: String,},
    mobileNumber: { type: String,},
    password: { type: String,},
    username: { type: String,},
    encryptedpass: { type: String,},
   
})

module.exports = mongoose.model('users', userSchema);


