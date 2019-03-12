const mongoose = require('mongoose');
const playSchema = new mongoose.Schema({
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
  userId: {
    type: String
  },
  playName: {
    type:String
  },
  showTime: {
    type:String
  },
  price:  {
    type:String
  },
  crowd:{
    type:String
  },
  particpants:{
    type:String
  },
  genre:{
    type:String
  },
  dates:{
    type:Array,
    default:[{ date: '1', allDay: false, time: ['00:00', '12:12'] }]

  }
})

module.exports = mongoose.model('plays', playSchema);
