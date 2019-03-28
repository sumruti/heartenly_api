const mongoose = require('mongoose');
const userimg = new mongoose.Schema({
    user_id: {type: String},
    plan: {type: String},
    paid_status:{type:String},
    payerID:{type:String},
    paymentID:{type:String},
    paymentToken:{type:String},
    
})

module.exports = mongoose.model('payments', userimg);
