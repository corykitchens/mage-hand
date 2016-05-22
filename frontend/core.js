// var $ = require('jquery');
var Vue = require('vue');
var fb = require('./fb').database();
var setupUser = require('./auth').setupUser;
var routeUser = require('./router').routeUser;

require("./styles/core.scss");

Vue.config.debug = true; console.log('!vue debug is on'); // TODO

// On auth state change
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.currentUser = firebase.auth().currentUser;
  } else {
    // User not logged in
  }
  routeUser()
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
    $head.removeClass("u-opacity0");
  } else {
    $head.addClass("u-opacity0");
   }
});
