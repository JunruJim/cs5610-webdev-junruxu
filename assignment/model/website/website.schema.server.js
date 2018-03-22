var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  name: String,
  description: String,


  dateCreated: Date
}, {collection: 'website'})

module.exports = websiteSchema;
