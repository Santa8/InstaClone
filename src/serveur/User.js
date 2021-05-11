const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: [20, "User name too long"],
        //minlength: [3, "Fist name too short"]
      },
      email: {
        type: String,
        required: true,
        maxlength: [30, "Email exceed the maximum length"],
        //minlength: [6, "Email invalid"]
      },
      password: {
        type: String,
        required: true,
        //maxlength: [20, "Password too long"],
        //minlength: [6, "Password too short"]
      },

      followers: {
        type: Array,
        default : []
      },

      following: {
        type: Array,
        default : []
      }
    
})


module.exports = mongoose.model('User', userShema);

