// AUTH - - - -
// Contains functions related to authentication

var firebase = require('./fb');
var fb_auth = require('./fb').auth;
var fb_data = require('./fb').database();


// Only let authorized users into these pages
module.exports.requiresAuth = function requiresAuth(callback){
  if (!window.currentUser) {
    window.location.replace("/login");
  } else {
    if (callback) callback();
  }
};

module.exports.twitterAuth = function(){
  var provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    window.currentUser = result.user;
  }).catch(function(error){
    var errorCode = error.code;
    console.log("An error happened during login lol", error);
    alert(error.message)
  });
};

module.exports.googleAuth = function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    window.currentUser = result.user;
  }).catch(function(error){
    var errorCode = error.code;
    console.log("An error happened during login lol", error);
    alert(error.message)
  });
};

module.exports.facebookAuth = function(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    window.currentUser = result.user;
  });
};

module.exports.signOut = function(){
  firebase.auth().signOut().then(function(){
    window.location.replace('/');
  });
};
