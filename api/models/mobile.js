const mongoose = require('mongoose');
const mobile_no = new mongoose.Schema({
    mobile_no: {type: String},
    verified_status :{type:String},
    user_id:{type:String},
    expire_time : {type:String},
    otp: {type:String},
    
})

module.exports = mongoose.model('mobile_number', mobile_no);
