var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname:String,
  lastname: String,
  email: String,
  phone: String,
  websites:[websiteSchema],
  dateCreated: {type: Date, default: Date.now}
}, {collection:'user'});

module.exports = userSchema;
