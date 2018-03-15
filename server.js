
// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');

// parse info when receive
// parse JSON file from HTTP response
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

//var serverSide = require("./server/test-mongodb/app");
//serverSide(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// var hello = require('./hello');
// hello(app);
// or require('./hello')(app);

app.get('/api/hahaha', function(req, res) {
  res.send('hahaha');
});

require("./assignment/app")(app);

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))
});
