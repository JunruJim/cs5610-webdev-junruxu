var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model('websiteModel', websiteSchema);

var userModel = require("../user/user.model.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function findAllWebsitesForUser(userId) {
  return websiteModel.find({_user: userId})
    .populate('_user')
    .exec();
}

function createWebsiteForUser(userId, website){
  website._user = userId;
  return websiteModel.create(website)
    .then(function(responseWebsite) {
      userModel.findUserById(responseWebsite._user)
        .then(function(user) {
          user.websites.push(responseWebsite);

          // the newly created one will not be added into websites without this line
          return user.save();
        });
      return responseWebsite;
    });
}

function findWebsiteById(websiteId) {
  return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
  return websiteModel.update({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  websiteModel.findById(websiteId)
    .then(function(website) {
      userModel.findUserById(website._user)
        .then(function(user) {
          user.websites.pull({_id: websiteId});
          user.save();
        })
    });
  return websiteModel.deleteOne({_id: websiteId});
}
