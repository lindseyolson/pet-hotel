//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//global
var port = 7575;

var config = {
  database: 'omega',
  host: 'localhost',
  port: 5432,
  max: 20
};

//create new pool using config
var pool = new pg.Pool(config);

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//listening
app.listen(port, function() {
  console.log('server up on port', port);
});

//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

app.get('/pets', function(req, res) {
  console.log('get hit to /pets');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.sendStatus(400);
    } else {
      console.log('connected to db');
      var allPets = [];
      var resultSet = connection.query('SELECT * FROM pets');
      resultSet.on('row', function(row) {
        allPets.push(row);
      });
      resultSet.on('end', function() {
        done();
        res.send(allPets);
      });
    }
  });
});

//post stuff
app.post('/owner', function(req, res) {
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.sendStatus(400);
    } else {
      connection.query('INSERT INTO pets (owner_first_name, owner_last_name) VALUES ($1, $2)', [req.body.firstName, req.body.lastName]);
      done();
      res.sendStatus(201);
    }
  });
  console.log(req.body);

});
