var express = require('express');
var router = express.Router();


/* GET root */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET A campaigns */
router.get('/campaign', function(req, res, next) {
  res.render('campaign', { title: 'Campaign' });
});


/* GET campaigns */
router.get('/campaigns', function(req, res, next) {
  res.render('campaigns', { title: 'Campaigns' });
});


/* GET A character */
router.get('/character', function(req, res, next) {
  res.render('character', { title: 'Character' });
});


/* GET characters */
router.get('/characters', function(req, res, next) {
  res.render('characters', { title: 'Characters' });
});

module.exports = router;
