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
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    // var token = result.credential.accessToken; //var secret = result.credential.secret;
    var user = result.user;
    window.currentUser = user;
  }).then(function(){
    setupUser('twitter');
  }).catch(function(error){
    var errorCode = error.code;
    console.log("An error happened during login lol", error);
    alert(error.message)
  });
};


// Set up user when the log in
var setupUser = function setupUser(auth_type){
  var authData = window.currentUser;
  var snap_val;

  fb_data.ref("users/" + authData.uid).once("value", function(snap){
    snap_val = snap.val();
  }).then(function(){
    if (snap_val == undefined || snap_val == null){ // If they aren't in databse, create a record for them
      fb_data.ref("users/" + authData.uid).update({
        provider: auth_type,
        display_name: authData.displayName
      });
    };
  });
};
