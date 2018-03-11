module.exports = function (app) {

  // the former one would be implemented if it is same method and same url
  app.get("/api/user/hello", helloUser);

  app.post("/api/user", createUser);
  app.get("/api/user", findUserByCredentialOrUsername);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  var users = [
    { _id: '1', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder' },
    { _id: '2', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley' },
    { _id: '3', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia' },
    { _id: '4', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
  ];

  // functions used for test
  function helloUser(req, res) {
    var username = req.query["username"];
    res.send("Hello from user service!" + username);
  }

  // should check if the username exists if username is unique (maybe the database would provide a solution)
  function createUser(req, res) {
    var createdUser = req.body;

    // use String here to consist what User be defined in client side
    createdUser._id = (users.length + 1).toString();
    users.push(createdUser);
    res.json(createdUser);
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    var foundUser = users.find(function (user) {
       return user._id === userId;
    });
    if (foundUser){
      res.json(foundUser);
    } else {
      res.status(401);
      res.json(foundUser);
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
        res.json(foundUserByCredential);
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
        res.json(foundUserByUsername);
      }
      return;
    }
    res.status(401);
    res.send(undefined);
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    for (const i in users) {
      if (users[i]._id === userId) {
        const j = +i;
        users.splice(j, 1);
      }
    }
    res.send("success");
  }
};
