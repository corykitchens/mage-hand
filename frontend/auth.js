var firebase = require('./fb');
var fb_auth = require('./fb').auth;
var fb_data = require('./fb').database();

window.fb_data = fb_data; //TODO remove
window.fb_auth = fb_auth;
// window.auth = fb.getAuth(); //TODO replace


var provider = new firebase.auth.TwitterAuthProvider();

//TODO fix this \/ ?
// // Set up user when the log in
// module.exports.setupUser = function setupUser(authData){
//   fb.child("users").child(authData.uid).once("value", function(snap){
//     if (snap.val() == undefined){ // If they aren't in databse, create a record for them
//       fb.child("users").child(authData.uid).update({ // Always use update, never set
//         provider: authData.provider,
//         name: getProviderName(authData)
//       });
//     };
//     window.auth = fb.getAuth();
//   });
// };
//


// Only let authorized users into these pages
module.exports.requiresAuth = function requiresAuth(callback){
  if (!window.currentUser) {
    window.location.replace("/login")
  } else {
    if (callback) callback();
  }
};

// #Authentication
module.exports.twitterAuth = function(){

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = result.credential.accessToken;
    var secret = result.credential.secret;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log("Logged in correctly lol", result);
    window.currentUser = user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("An error happened during login lol", error);
    // ...
  });
};



// // find a suitable name based on the meta info given by each provider
// var getProviderName = function getProviderName(authData) {
//   switch(authData.provider) {
//      case 'password':
//        return authData.password.email.replace(/@.*/, '');
//      case 'twitter':
//        return authData.twitter.displayName;
//      case 'facebook':
//        return authData.facebook.displayName;
//   }
// };
