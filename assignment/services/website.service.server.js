module.exports = function (app) {

  var websiteModel = require("../model/website/website.model.server");

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  // var websites = [
  //   { '_id': '1', 'name': 'Facebook',    'developerId': '4', 'description': 'Lorem' },
  //   { '_id': '2', 'name': 'Tweeter',     'developerId': '4', 'description': 'Lorem' },
  //   { '_id': '4', 'name': 'Gizmodo',     'developerId': '4', 'description': 'Lorem' },
  //   { '_id': '8', 'name': 'Go',          'developerId': '1', 'description': 'Lorem' },
  //   { '_id': '5', 'name': 'Tic Tac Toe', 'developerId': '1', 'description': 'Lorem' },
  //   { '_id': '6', 'name': 'Checkers',    'developerId': '1', 'description': 'Lorem' },
  //   { '_id': '7', 'name': 'Chess',       'developerId': '2', 'description': 'Lorem' },
  //   { '_id': '3', 'name': 'Haha',        'developerId': '2', 'description': 'Lorem' }
  // ];

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    websiteModel.createWebsiteForUser(userId, website)
      .then(function (website){
        res.json(website);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId)
      .then(function(websites) {
        res.json(websites);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId).then(function(website) {
      if (website) {
        res.json(website);
      } else {
        res.status(404);
        res.json(website);
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

  function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website)
      .then(function(status) {
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.deleteWebsite(websiteId)
      .then(function(status) {
        res.json(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }
};
