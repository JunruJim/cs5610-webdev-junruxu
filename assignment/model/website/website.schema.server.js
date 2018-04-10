var mongoose = require('mongoose');
var pageSchema = require('../page/page.schema.server');

var websiteSchema = mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
  name: String,
  description: String,
  pages: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}
  ],
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'website'});

module.exports = websiteSchema;
