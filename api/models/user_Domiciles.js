const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user_id: {type: String},
    currentcity: {type: String},
    Homestatus: {type: String},
    Hometown: {type: String},
    Privacy: {type: String},

});
module.exports = mongoose.model('user_Domiciles', userSchema);
