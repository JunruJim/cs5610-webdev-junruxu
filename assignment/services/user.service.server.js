module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  // the former one would be implemented if it is same method and same url
  app.get("/api/user/hello", helloUser);

  app.post("/api/user", createUser);
  app.get("/api/user", findUserByCredentialOrUsername);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  // var users = [
  //   { _id: '1', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder' },
  //   { _id: '2', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley' },
  //   { _id: '3', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia' },
  //   { _id: '4', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
  // ];

  // functions used for test
  function helloUser(req, res) {
    var username = req.query["username"];
    res.send("Hello from user service!" + username);
  }

  // should check if the username exists if username is unique (maybe the database would provide a solution)
  function createUser(req, res) {
    var createdUser = req.body;

    // createdUser._id = new Date().getTime().toString();
    // users.push(createdUser);
    // res.json(createdUser);

    userModel.createUser(createdUser)
      .then(function(user){
        res.json(user);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    userModel.findUserById(userId).then(function (user){
      if (user) {
        res.json(user);
      } else {
        res.status(404);
        res.json(user);
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user)
      .then(function(status){
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findUserByCredentialOrUsername(req, res){
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
      userModel.findUserByCredentials(username, password)
        .then(function(user) {
          if (!user) {
            res.status(401);
            res.json(user);
          } else {
            res.json(user);
          }
        }, function(err) {
          res.status(500).json(err);
        });
      return;
    }

    // should return a list if username is not unique
    else if (username){
      userModel.findUserByUserName(username)
        .then(function(user) {
          if (user) {
            res.json(user);
          } else {
            res.status(404);
            res.json(user);
          }
        }, function(err) {
          res.status(500).json(err);
        });
      return;
    }
    res.status(404);
    res.send(undefined);
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId).then(function(status) {
      console.log(status);
      res.json(status);
    }, function(err) {
      res.status(500).json(err);
    });


    // for (const i in users) {
    //   if (users[i]._id === userId) {
    //     const j = +i;
    //     users.splice(j, 1);
    //   }
    // }
    // res.send("success");
  }
};
