var firebase = require('./fb');
var requiresAuth = require('./auth').requiresAuth;
var charactersPage = require('./characters').charactersPage;
var characterPage = require('./character').characterPage;
var campaignsPage = require('./campaigns').campaignsPage;
var campaignPage = require('./campaign').campaignPage;
var profilePage = require('./profile').profilePage;

var signOut = require('./auth').signOut;
var twitterAuth = require('./auth').twitterAuth;
var googleAuth = require('./auth').googleAuth;
var facebookAuth = require('./auth').facebookAuth;
var revealPage = require('./globals').revealPage;

// ROUTER
// For routing the user around depending on their state
module.exports.routeUser = function(){

  firebase.auth().onAuthStateChanged(function(user) {

    // If user is logged in, set global
    if (user){
      window.currentUser = firebase.auth().currentUser;
      $("#mobile-nav-toggle").show();
     }

    if (window.location.pathname === "/"){
      if (window.currentUser == undefined){ // If user is logged OUT
        $(".logged-in").hide();
      } else {
        $(".logged-out").hide();
      };
      revealPage();
    }

    else if (window.location.pathname === "/login"){ // IF at login

      if (window.currentUser) { // Redirect if already logged in
        window.location.replace("/");
      } else { // Else show login page
        revealPage();
      }
      // Enable login click handlers (Might not really belong here but whatevs #YOLO)
      $('.ion-social-twitter').on('click',function(){ twitterAuth(); });
      $('.ion-social-facebook').on('click',function(){ facebookAuth(); });
      $('.ion-social-google').on('click',function(){ googleAuth(); });
    }

    else if (window.location.pathname === "/character"){ // Specific character
      requiresAuth(characterPage);
    }
    else if (window.location.pathname === "/characters"){ // List of characters
      requiresAuth(charactersPage);
    }
    else if (window.location.pathname === "/campaign"){ // Specific campaign
      requiresAuth(campaignPage);
    }
    else if (window.location.pathname === "/campaigns"){ // List of campaigns
      requiresAuth(campaignsPage);
    }
    else if (window.location.pathname === "/profile"){ // List of campaigns
      requiresAuth(profilePage);
    }
    else if (window.location.pathname === "/logout"){ // List of campaigns
      signOut();
    }
  });
};
