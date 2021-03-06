var express = require('express');
var router = express.Router();

// TODO these titles aren't doing shit, why are they here?

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

/* GET profile */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

/* GET Logout */
router.get('/logout', function(req, res, next) {
  res.render('logout');
});

/* GET about page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});


module.exports = router;
