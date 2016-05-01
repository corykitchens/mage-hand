var fb = require('./fb');
window.auth = fb.getAuth();

// Set up user when the log in
module.exports.setupUser = function setupUser(authData){
  fb.child("users").child(authData.uid).once("value", function(snap){
    if (snap.val() == undefined){ // If they aren't in databse, create a record for them
      fb.child("users").child(authData.uid).update({ // Always use update, never set
        provider: authData.provider,
        name: getProviderName(authData)
      });
    };
    window.auth = fb.getAuth();
  });
};

// Only let authorized users into these pages
module.exports.requiresAuth = function requiresAuth(){
  if (!window.auth) { debugger; window.location.replace("/login"); }
};


// find a suitable name based on the meta info given by each provider
var getProviderName = function getProviderName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
};
