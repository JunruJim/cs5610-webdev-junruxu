module.exports = function (app) {

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websites = [
    { '_id': '1', 'name': 'Facebook',    'developerId': '4', 'description': 'Lorem' },
    { '_id': '2', 'name': 'Tweeter',     'developerId': '4', 'description': 'Lorem' },
    { '_id': '4', 'name': 'Gizmodo',     'developerId': '4', 'description': 'Lorem' },
    { '_id': '8', 'name': 'Go',          'developerId': '1', 'description': 'Lorem' },
    { '_id': '5', 'name': 'Tic Tac Toe', 'developerId': '1', 'description': 'Lorem' },
    { '_id': '6', 'name': 'Checkers',    'developerId': '1', 'description': 'Lorem' },
    { '_id': '7', 'name': 'Chess',       'developerId': '2', 'description': 'Lorem' },
    { '_id': '3', 'name': 'Haha',        'developerId': '2', 'description': 'Lorem' }
  ];

  function createWebsite(req, res) {
    var createdWebsite = req.body;
    var userId = req.params["userId"];
    createdWebsite._id = (websites.length + 1).toString();
    createdWebsite.developerId = userId;
    websites.push(createdWebsite);
    res.json(createdWebsite);
  }

  function findAllWebsitesForUser(req, res) {
    var resultSet = [];
    var userId = req.params["userId"];

    // it is key not the value
    // for (var index in websites) {
    //   if (websites[index].developerId === userId) {
    //     resultSet.push(websites[index]);
    //   }
    // }
    for(var i = 0; i < websites.length; i++) {
      if (websites[i].developerId === userId) {
        resultSet.push(websites[i]);
      }
    }
    res.json(resultSet);
  }

  function findWebsiteById(req, res){
    var websiteId = req.params["websiteId"];
    var foundWebsite = websites.find(function (website) {
      return website._id === websiteId;
    });
    if (foundWebsite){
      res.json(foundWebsite);
    } else {
      res.status(401);
      res.json(foundWebsite);
    }
  }

  function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var foundWebsite = websites.find(function (website) {
      return website._id === websiteId;
    });
    var website = req.body;
    foundWebsite.name = website.name;
    foundWebsite.developerId = website.developerId;
    foundWebsite.description = website.description;
    res.json(foundWebsite);
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    for (const i in websites) {
      if (websites[i]._id === websiteId) {
        const j = +i;
        websites.splice(j, 1);
      }
    }
    res.send("success");
  }
};
