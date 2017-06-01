//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//global
var port = 7575;

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(port, function() {
  console.log('server up on port', port);
});
