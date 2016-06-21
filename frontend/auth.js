var firebase = require('./fb');
var fb_auth = require('./fb').auth;
var fb_data = require('./fb').database();

var provider = new firebase.auth.TwitterAuthProvider();


// Only let authorized users into these pages
module.exports.requiresAuth = function requiresAuth(callback){
  if (!window.currentUser) {
    window.location.replace("/login");
  } else {
    if (callback) callback();
  }
};

// #Authentication
module.exports.twitterAuth = function(){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    window.currentUser = result.user;
  }).catch(function(error){
    var errorCode = error.code;
    console.log("An error happened during login lol", error);
    alert(error.message)
  });
};
