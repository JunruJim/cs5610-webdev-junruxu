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

  function findUserById(req, res){
    var userId = req.params["userId"];
    var foundUser = users.find(function (user) {
      return user._id === userId;
    });
    if (foundUser){
      res.json(foundUser);
    } else {
      res.status(404);
      res.send('no user found');
    }
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var foundUser = users.find(function (user) {
      return user._id === userId;
    });
    var user = req.body;
    foundUser.username = user.username;
    foundUser.password = user.password;
    foundUser.firstName = user.firstName;
    foundUser.lastName = user.lastName;
    res.json(foundUser);
  }

  function findUserByCredentialOrUsername(req, res){
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password){
      var foundUserByCredential = users.find(function (user){
        return user.username === username && user.password === password;
      });
      if (foundUserByCredential){
        res.json(foundUserByCredential);
      } else {
        res.status(401);
        res.send('no user found');
      }
      return;
    }

    // should return a list if username is not unique
    else if (username){
      var foundUserByUsername = users.find(function (user) {
        return user.username === username;
      });
      if (foundUserByUsername) {
        res.json(foundUserByUsername);
      } else {
        res.status(401);
        res.send('no user found');
      }
      return;
    }
    res.status(401);
    res.send('no user found');
  }

  function deleteUser(req, res) {

  }
};
