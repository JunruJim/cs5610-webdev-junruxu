var mongoogse = require("mongoose");

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  websites:[]
})
