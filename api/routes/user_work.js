const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Work: {type: String},
    income: {type: String},
    user_id: {type: String},

   
})

module.exports = mongoose.model('user_work', userSchema);
