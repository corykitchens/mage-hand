var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<h2>lol</h2>');
});

app.listen(3000, function () {
  console.log('## App started! Listening on port 3000!');
});
