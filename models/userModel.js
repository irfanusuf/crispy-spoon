const mongoose = require("mongoose");

const User = mongoose.model("User", {

  email: { type: String },
  password: { type: String },
  isAdmin : {type : Boolean , default : false}
});

module.exports = { User };
