// Global helpers
module.exports.revealPage  = function revealPage(){
  if (window.revealed == false){
    $(".loading-message").hide();
    $(".body-content").addClass("u-opacity1");
  };
};
