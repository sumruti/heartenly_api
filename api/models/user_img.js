const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userimg = new Schema({
    image: {type: String},
    SetAsPrimary:{type:String},
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
    
})

module.exports = mongoose.model('user_images', userimg);
