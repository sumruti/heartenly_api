const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    fbid: {
        type: String,
    },
    name: {
        type: String,
    },
    media: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
    },
    category: {
        type: String
    },
    about: {
        type: String
    },
    fan: {
        type: String,
    },
    sub_cat: {
        type: String,
    },
    story:{
        type: String
    },
    onboarding:{
        type:Boolean,
    },
    nextSet:{
        type:String,
    },
    dates:{
        type:Array,
        default:[{ date: '1', allDay: false, time: ['00:00', '12:12'] }]
    }
})

module.exports = mongoose.model('users', userSchema);
