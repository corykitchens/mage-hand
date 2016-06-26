require("./styles/core.scss");

// var $ = require('jquery');
var Vue = require('vue');
var fb = require('./fb').database();
var hideOverlay = require('./globals').hideOverlay;
var hideDetailPane = require('./globals').hideDetailPane;
var routeUser = require('./router').routeUser;

//var showOverlay = require('./globals').showOverlay;
//var showDetailPane = require('./globals').showDetailPane;
//require("./styles/core.scss");


// Initialize on every page load
function init(){

  Vue.config.debug = true;  // TODO
  if (Vue.config.debug == true) console.log('!vue debug is on');

  // TODO offline content
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/offline.js');
  }
  // https://www.youtube.com/watch?v=qDJAz3IIq18

  // When app is loaded, route user
  routeUser(); // Get the user to the right page depending on their state
  setGlobals();
  initHandlers();
}; init();

function setGlobals(){
  window.revealed = false;
  $("#loading-text").text("Don't trust the rogue."); //TODO make this random
};


function initHandlers(){
  // # Sticky section header on characters + campaigns
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
  // These maybe should live in Vue?
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

  // Mobile nav square icon
  $("#mobile-nav-toggle").on('click', function(){
    $('#mobile-nav-icons').toggleClass('show');
  });

  // Social explanation on login page
  $("#social").on('click', function(){
    $("#social-explanation").toggle();
  });

};



// #Notice
// var console_style = "font-size: 14px; color:#7AA790; font-family:'Lato', monospace;"
// console.log("%cmagehand.xyz ✋", "color: black; font-family: 'Doris', monospace; font-size: 2rem; font-weight: 800;");
// console.log('%cHey hombre! Feel free to poke around for any bugs and report them to', console_style);
// console.log('%chttps://github.com/bananatron/mage-hand/issues', console_style + 'font-size: 18px; color: #A77A7A; font-family:monospace;');
// console.log("%c\n\nLive adventurously.", console_style);
