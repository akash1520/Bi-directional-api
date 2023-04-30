const mongoose = require("mongoose");


// Create a Mongoose schema for a blog post
const APISchema = new mongoose.Schema({
  Url: {
    type: String,
    required: true
  },
  Method: {
    type: String,
    required: true
  },
  Time: {
    type: Number,
  },
  Data : {
    type: Object
  }
});

// Create a Mongoose model for the blog post schema
const API = mongoose.model("API", APISchema);


module.exports = API
