const mongoose = require('mongoose');
const userimg = new mongoose.Schema({
    image: {type: String},
    SetAsPrimary:{type:String},
    user_id:{type:String}
    
})

module.exports = mongoose.model('user_images', userimg);
