console.log('Core loaded');

//Notice
// var console_style = "font-size: 14px; color:#7AA790; font-family:'Lato', monospace;"
// console.log("%cmagehand.xyz", "color: black; font-family: 'Montserrat', monospace; font-size: 2rem; font-weight: 800;");
// console.log('%cHey hombre - feel free to poke around for any bugs and report them to', console_style);
// console.log('%cdev@magehand.xyz', console_style + 'font-size: 18px; color: #A77A7A; font-family:monospace;');
// console.log("%c\n\nBe happy.", console_style);


//// GLOBALS

// const routeUser = function routeUser(authData){
//   if (authData){
//     window.location.replace("/");
//   };
// };

$("#loading-text").text("Don't trust the rogue.");

const revealPage = function revealPage(){
  $(".loading-message").hide();
  $(".body-content").addClass("show");
};

const isNewUser = true;

fb.onAuth(function(authData) {
  if (fb.getAuth() && isNewUser) {
    fb.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });
  }
});

// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
};



//// ROOT
if (window.location.pathname === "/"){
  if (fb.getAuth() == undefined){ // If user is logged out
    $(".logged-in").hide();
    //Show the campaign character stuff - hide the sell page?
  } else {
    $(".logged-out").hide();
  };
  revealPage();
};


//// CAMPAIGNS
if (window.location.pathname === "/campaigns"){
  var v = new Campaigns('xxxkey');
  revealPage();
};



//// LOGIN
if (window.location.pathname === "/login"){
  if (fb.getAuth()) { window.location.replace("/"); }
  else { revealPage(); }

  // Authentication
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
  $('.ion-social-twitter').on('click',function(){
    twitterAuth();
  });

};
