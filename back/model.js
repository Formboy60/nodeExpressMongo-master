const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  titre: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  uid:{
    type: String
  }
});



const blog = mongoose.model("article", UserSchema);

module.exports = blog;