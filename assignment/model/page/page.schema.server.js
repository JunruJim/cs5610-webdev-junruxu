var mongoose = require("mongoose");
var widgetSchema = require('../widget/widget.schema.server');

// var widgetModel = require("../widget/widget.model.server");
var pageSchema = mongoose.Schema({
  _website: {type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'},
  name: String,
  title: String,
  description: String,
  widgets:[widgetSchema],

  // or do it this way here. then it can be update automatically!
  // widgets: [
  //   {type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel'}
  // ],

  dateCreated: {type: Date, default: Date.now}
}, {collection:'page'});

// delete all widget for current page when delete the page
pageSchema.pre('remove', function(next) {
  widgetModel.remove({_page: this._id}).exec();
  next();
});

module.exports = pageSchema;
