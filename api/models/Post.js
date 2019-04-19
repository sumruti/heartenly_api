const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPost = new Schema({
    status: {type: String},
    date:{type:String},
    about:{type:String},
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
    
})

module.exports = mongoose.model('user_post', userPost);
