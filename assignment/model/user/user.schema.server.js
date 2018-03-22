var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server')

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname:String,
  lastname: String,
  email: String,
  phone: String,
  websites:[websiteSchema],
  dateCreated: Date
}, {collection:'user'});

module.exports = UserSchema;
