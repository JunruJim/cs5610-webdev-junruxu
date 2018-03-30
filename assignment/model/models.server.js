var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/webdev', {useMongoClient: true});

// mongodb://heroku_jmhwjlk9:11pl3qm17i1j15v150ifp6ruc1@ds111648.mlab.com:11648/heroku_jmhwjlk9
// mongodb://admin:admin@ds111648.mlab.com:11648/heroku_jmhwjlk9

var connectionString = 'mongodb://localhost:27017/webdev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds111648.mlab.com:11648/heroku_jmhwjlk9/webdev'; // use yours
}


// var db = mongoose.connect('mongodb://admin:admin@ds111648.mlab.com:11648/heroku_jmhwjlk9', {useMongoClient: true});
var db = mongoose.connect(connectionString, {useMongoClient: true});

module.exports = db;
