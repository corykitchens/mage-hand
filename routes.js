var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET login listing */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET campaigns */
router.get('/campaigns', function(req, res, next) {
  res.render('campaigns', { title: 'Campaigns' });
});

module.exports = router;
