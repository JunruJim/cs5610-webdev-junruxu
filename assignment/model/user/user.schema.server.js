var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname:String,
  lastname: String,
  email: String,
  facebook : {
    token: String,
    id: String,
    displayName : String
  },
  phone: String,
  websites:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}
  ],
  dateCreated: {type: Date, default: Date.now}
}, {collection:'user'});

module.exports = userSchema;
