const mongoose = require("mongoose");
const { Schema } = mongoose;

// create schema for menu items
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
     minlength: 3,
  },
  photoURL: String,
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }

});

module.exports = mongoose.model("User", userSchema);
