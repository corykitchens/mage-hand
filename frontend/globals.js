// Global helpers

var showOverlay = function(){ // So that it's accesible to other functions here
  var $overlay = $(".overlay");
  $overlay.css('z-index', '1');
  $overlay.show();
  $("#character-bottom-nav-menu").css('z-index', 1);
}; module.exports.showOverlay = showOverlay;


var hideOverlay = function(){ // So that it's accesible to other functions here
  $(".overlay").hide();
  $(".join-overlay").hide();
  $("#character-bottom-nav-menu").css('z-index', '');
  $(".join-modal").hide();
}; module.exports.hideOverlay = hideOverlay;


module.exports.revealPage = function(){
  if (window.revealed == false){
    $(".loading-message, .loading-image").hide();
    $(".body-content").addClass("u-opacity1");
  };
};


module.exports.getUrlParam = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


module.exports.showDetailPane = function(selector, fieldValue){
  var $detailTab = $("[data-selector="+ selector +"]");
  var $detailPane = $("#" + fieldValue + "-info");

  showOverlay();

  $(".detail-panes").addClass("off-screen"); // Hide all detail panes
  $(".character-detail-tab").removeClass("selected"); // Remove selected highlight style

  $detailTab.removeClass("off-screen"); // Show race tabs
  $detailTab.find($("#"+ fieldValue +"-tab")).addClass("selected");
  $detailPane.removeClass("off-screen"); // Show the selected race pane
};


module.exports.hideDetailPane = function(){
  $(".detail-tabs").addClass("off-screen");
  $(".detail-panes").addClass("off-screen"); // Hide detail panes
  hideOverlay();
};
