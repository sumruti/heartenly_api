const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Lasteducation: {type: String},
    Departement: {type: String},
    user_id: {type: String},
    Privacy: {type: String},

   
})

module.exports = mongoose.model('user_education', userSchema);
