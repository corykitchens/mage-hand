// var $ = require('jquery');
var Vue = require('vue');
var fb = require('./fb').database();
var routeUser = require('./router').routeUser;
var showOverlay = require('./globals').showOverlay;
var hideOverlay = require('./globals').hideOverlay;
var showDetailPane = require('./globals').showDetailPane;
var hideDetailPane = require('./globals').hideDetailPane;

require("./styles/core.scss");

Vue.config.debug = true;  // TODO
if (Vue.config.debug == true) console.log('!vue debug is on');

// On auth state change
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // If user is logged in, set global
    window.currentUser = firebase.auth().currentUser;
  };
  routeUser(); // Then route user appropriately
});


// #Notice
// var console_style = "font-size: 14px; color:#7AA790; font-family:'Lato', monospace;"
// console.log("%cmagehand.xyz ✋", "color: black; font-family: 'Doris', monospace; font-size: 2rem; font-weight: 800;");
// console.log('%cHey hombre! Feel free to poke around for any bugs and report them to', console_style);
// console.log('%cdev@magehand.xyz', console_style + 'font-size: 18px; color: #A77A7A; font-family:monospace;');
// console.log("%c\n\nLive adventurously.", console_style);


//// # Globals
window.revealed = false;
$("#loading-text").text("Don't trust the rogue."); //TODO make this random


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


// # Sticky section header
// On characters + campaigns
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


// # Global handlers
$(document).keypress(function(e) { // Prevent enter from doing anything
  if(e.which == 13) return false;
});

// Overlay clickity clicker
$(".overlay").on("click", function(){
  hideOverlay();
  hideDetailPane();
});

// Bottom fixed nav bar thing
$(".nav-button").on("click", function(ee){
  hideOverlay();
  hideDetailPane();
  var selector = $(ee.currentTarget).data('show');
  var $slidableForms = $(".slidable-form");

  $slidableForms.addClass("off-screen");
  $slidableForms.show();

  setTimeout(function(){
    $(window).scrollTop(0);
    $("#" + selector).removeClass("off-screen");
  }, 200)

  // After animation (0.3) hide non-visible screens to prevent excess scroll areas
  setTimeout(function(){
    $("form").each(function(ii, form){
      $form = $(form);
      if($form.hasClass('off-screen')) $form.hide();
    })
  }, 200)

});
