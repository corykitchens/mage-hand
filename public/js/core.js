console.log('Core loaded');
Vue.config.debug = true; console.log('!vue debug is on');



// #Notice
// var console_style = "font-size: 14px; color:#7AA790; font-family:'Lato', monospace;"
// console.log("%cmagehand.xyz", "color: black; font-family: 'Montserrat', monospace; font-size: 2rem; font-weight: 800;");
// console.log('%cHey hombre - feel free to poke around for any bugs and report them to', console_style);
// console.log('%cdev@magehand.xyz', console_style + 'font-size: 18px; color: #A77A7A; font-family:monospace;');
// console.log("%c\n\nBe happy.", console_style);


//// #GLOBALS
window.auth = fb.getAuth();
window.revealed = false;
$("#loading-text").text("Don't trust the rogue."); //TODO make this random

var revealPage = function revealPage(){
  if (window.revealed == false){
    $(".loading-message").hide();
    $(".body-content").addClass("show");
  }
};

// Set up user when the log in
var setupUser = function setupUser(authData){
  fb.child("users").child(authData.uid).once("value", function(snap){
    if (snap.val() == undefined){ // If they aren't in databse, create a record for them
      fb.child("users").child(authData.uid).update({ // Always use update, never set
        provider: authData.provider,
        name: getName(authData)
      });
    };
    window.auth = fb.getAuth();
  });
};
fb.onAuth(function(authData) {
  if (fb.getAuth()){ setupUser(fb.getAuth()); }
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

// Only let authorized users into these pages
var requiresAuth = function requiresAuth(){
  if (!window.auth) { debugger; window.location.replace("/login"); }
};










//// #ROOT
if (window.location.pathname === "/"){
  if (fb.getAuth() == undefined){ // If user is logged OUT
    $(".logged-in").hide();
  } else {
    $(".logged-out").hide();
  }; revealPage();
};











//// #CAMPAIGNS
if (window.location.pathname === "/campaigns"){
  requiresAuth();
  var vm;

  fb.child("users/" + auth.uid + "/campaigns").on("value", function(ss) {
    const snap = ss.val(); if(snap == undefined){ return; }

    //debugger;
    vm = new Vue({
      el: '#xxxkey',
      data: {
        greeting: 'lol'
      }
    });

  });

  var v = new Campaigns('xxxkey');
  revealPage();
};





//// #CHARACTER
if (window.location.pathname === "/character"){
  var character_id = window.location.search.replace("?", "");
  // ^ If more params are being passed in, this will need to be updated

  // Generate a vue directly from the firebase character object
  // All fb object properties will be avilable and bindable in the view
  fb.child("characters").child(character_id).on("value", function(snap){

    new Vue({
      el: '#vue-character',
      data: {character: snap.val()},
      methods: {
        updateStore: function updateStore(){
          console.log('keyup');
          console.log(this.character);
          // Object.keys(this.character).forEach(function(char_key){
          //   this.character[char_key]
          // });
          fb.child("characters").child(character_id).update(this.character);
        }
      }
    });

    revealPage();
  });
};











//// #CHARACTERS
if (window.location.pathname === "/characters"){
  requiresAuth();

  var vv;
  var characters = [];
  fb.child("users").child(window.auth.uid).child("characters").once('value', function(snap){
    Object.keys(snap.val()).forEach(function(character_id){
      fb.child("characters").child(character_id).once('value', function(character_snap){
        // Push each character to the characters array so that vue can draw them
        var cc = character_snap.val();
        cc.key = character_id;
        characters.push(cc);
        revealPage();
      });
    });
  });

  // Draw all the characters pulled from firebase above
  new Vue({
    el: '#vue-characters',
    data: { characters: characters }
  });

  // Clicking on a character sends you to a character page
  $(document).on("click", ".character",  function(ee){
    window.location.href = "/character?" + $(ee.currentTarget).attr("id");
  });

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
