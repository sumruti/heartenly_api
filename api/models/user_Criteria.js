
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Until: { type: String},
    Years: { type: String,},
    Minimaleducation: { type: String,},
    tribe: { type: String,unique : true},
    skin_Color: { type: String},
    height: { type: String},
    Width: { type: String},
    Daily: { type: String},
    Lifestyle: { type: String},
    minimumincome: { type: String},
    criteriacouple: { type: String,unique : true},
    physical: { type: String,},
    Eyeglasses: { type: String,},
    Veli :{type:String},
    Smoke : {type:String},
    Alcohol : {type:String},
    Tattoo: {type:String},
    Piercing: {type:String},
    hobby: {type:String},
    user_id: {type:String},
   
})

module.exports = mongoose.model('user_Criteria', userSchema);


