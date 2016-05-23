var requiresAuth = require('./auth').requiresAuth;
var charactersPage = require('./characters').charactersPage;
var characterPage = require('./character').characterPage;
var campaignsPage = require('./campaigns').campaignsPage;
var campaignPage = require('./campaign').campaignPage;

var twitterAuth = require('./auth').twitterAuth;
var revealPage = require('./globals').revealPage;

// ROUTER
// For routing the user around depending on their state

module.exports.routeUser = function(){

  if (window.location.pathname === "/"){

    if (window.currentUser == undefined){ // If user is logged OUT
      $(".logged-in").hide();
    } else {
      $(".logged-out").hide();
    };
    revealPage();
  }

  else if (window.location.pathname === "/login"){ // IF at login
    if (window.currentUser) { window.location.replace("/"); } // Redirect if already logged in
    else { revealPage(); } // Else show login page

    // Enable login click handlers (Might not really belong here but whatevs #YOLO)
    $('.ion-social-twitter').on('click',function(){ twitterAuth(); });
  }

  else if (window.location.pathname === "/character"){
    requiresAuth(characterPage);
  }
  else if (window.location.pathname === "/characters"){
    requiresAuth(charactersPage);
  }

  else if (window.location.pathname === "/campaigns"){
    requiresAuth(campaignsPage);
  }
  else if (window.location.pathname === "/campaign"){
    requiresAuth(campaignPage);
  }



};
