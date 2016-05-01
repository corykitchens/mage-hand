// var $ = require('jquery');
var Vue = require('vue');
var fb = require('./fb');
var requiresAuth = require('./auth').requiresAuth;
var setupUser = require('./auth').setupUser;
var charactersPage = require('./characters').charactersPage;
var characterPage = require('./character').characterPage;
var revealPage = require('./globals').revealPage;

require("./styles/core.scss");

Vue.config.debug = true; console.log('!vue debug is on');

fb.onAuth(function(authData) { // On authorizatoin
  if (fb.getAuth()){ setupUser(fb.getAuth()); }
});

// #Notice
// var console_style = "font-size: 14px; color:#7AA790; font-family:'Lato', monospace;"
// console.log("%cmagehand.xyz ✋", "color: black; font-family: 'Doris', monospace; font-size: 2rem; font-weight: 800;");
// console.log('%cHey hombre! Feel free to poke around for any bugs and report them to', console_style);
// console.log('%cdev@magehand.xyz', console_style + 'font-size: 18px; color: #A77A7A; font-family:monospace;');
// console.log("%c\n\nLive adventurously.", console_style);


//// #GLOBALS

window.revealed = false;
$("#loading-text").text("Don't trust the rogue."); //TODO make this random


// Sticky section header
var $head = $(".header-sticky");
var nav_height = $(".nav").height();

$( window ).scroll(function() {
  var scroll_pos = $(window).scrollTop();

  if (scroll_pos > nav_height) {
    $head.removeClass("opacity0");
  } else {
    $head.addClass("opacity0");
   }
});

















//// #ROOT
if (window.location.pathname === "/"){
  if (fb.getAuth() == undefined){ // If user is logged OUT
    $(".logged-in").hide();
  } else {
    $(".logged-out").hide();
  }; revealPage();
};







//// CHARACTER
if (window.location.pathname === "/character"){
  requiresAuth();
  characterPage();
}
//// #CHARACTERS
if (window.location.pathname === "/characters"){
  requiresAuth();
  charactersPage();
}






//// #CAMPAIGNS
if (window.location.pathname === "/campaigns"){
  requiresAuth();

  fb.child("users/" + auth.uid + "/campaigns").on("value", function(ss) {
    const snap = ss.val(); if(snap == undefined){ return; }

    //debugger;
    new Vue({
      el: '#xxxkey',
      data: {
        greeting: 'lol'
      }
    });

  });

  var v = new Campaigns('xxxkey');
  revealPage();
};

















//// #LOGIN
if (window.location.pathname === "/login"){
  if (fb.getAuth()) { window.location.replace("/"); }
  else { revealPage(); }

  // #Authentication
  var twitterAuth = function(){
    fb.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("By grabthar's hammer, you shall be avenged.")
        window.location.replace("/");
      }
    });
  };
  $('.ion-social-twitter').on('click',function(){ twitterAuth(); });
};
