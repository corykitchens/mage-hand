"use strict";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Setup (TODO this should be moved out probably)
var fb = new Firebase("https://magicmissile.firebaseio.com/"); console.log("Firebase loaded!");

window.mage = {};

// BaseModel - Parent class for all firebase listeners
const BaseModel = function(key){

  // Latest snapshot received on update from firebase
  this.latestSnap;

  // Path to the object source this model will reference
  // Init will attach to the firebase location using this path
  // eg. 'blog/posts'
  this.path = this.path || this.constructor.name.toLowerCase();

  // Key used to select an instance of an object
  // Init will also use this key if it's present
  // eg. 'post1235'
  this.key = key;

  // Sets a selector which is used to identify model in dom w/ 'data-model' attrribute
  // Will use classname by defualt  eg. data-model="campaign" or data-model="character"
  this.selector = this.selector || this.constructor.name.toLowerCase();


  // Properties to build in dom. This will get populated from
  // init() based on the firebase object
  //this.fbProps = []; //TODO remove

  // A function to be run after an update is received from Firebase
  this.onUpdate;

  this.init(); // Let's get this party started
};


BaseModel.prototype.init = function(){
  var _this;
  if (this.path === undefined) console.log('NO PATH IS SET!');

  // Setup window storage
  if (window.mage[this.path] == undefined) { window.mage[this.path] = {} };


  // If it exists in window, set that as reference
  if (window.mage[this.path][this.key] == undefined){
    window.mage[this.path][this.key] = this
  }
  _this = window.mage[this.path][this.key];

  // Build path to object reference eg. blog/posts/post12345
  const fullpath = _this.path + "/" + _this.key;

  // Listen for changes on the cooresponding Firebase object
  fb.child(fullpath).on("value", function(object_snapshot) {
    _this.latestSnap = object_snapshot.val(); // Store the latest update/snapshot
    if (_this.onUpdate){ _this.onUpdate() }; // Call onUpdate if it's being defined
  });
};







  //   // Synchronize object properties (fbProps) with that of the update/snapshot
  //   Object.keys(snapshot).forEach(function(snap_key){
  //
  //     // If we find a collection, we want to bring in any relational
  //     if (snapshot[snap_key].meta_type === "collection"){
  //       Object.keys(snapshot[snap_key]).forEach(function(collection_key){
  //         if (collection_key.split("_")[0] == "meta") { return; } // Skip meta stuff
  //         var collection_object = snapshot[snap_key][collection_key];
  //
  //         var lookup = Object.keys(collection_object)[0] // e.g. user_id
  //         var path_name = lookup.split("_id")[0]; // e.g. user
  //
  //         debugger;
  //       });
  //
  //       _this[snap_key] = snapshot[snap_key];
  //       _this.fbProps.push(snap_key);
  //     });
  //   });
  // });





// BaseModel.prototype.refresh = function(){
//   const _this = this;
//   console.log('refreshing!');
//
//   debugger;
//   // If a dom element exists with the object key as the ID, we'll use that
//   if ($( '.' + _this.selector + '#' + _this.key ).length > 0){
//     var $node = $( '.' + _this.selector + '#' + _this.key ); // Select by ID
//   } else { // else, let's build a new one
//     var $template_node = $('.' + _this.selector + '.js-template'); // Find the template for this obj
//     var $node = $template_node.clone(); // Clone for manipulation
//     $node.attr('id', _this.key); // Set ID so we can find it on next update
//     $node.removeClass('js-template'); // Remove .js-template from clone
//   };
//
//   if ($node.length === 0) { console.log("No node with ." + _this.selector); return; };
//
//   this.fbProps.forEach(function(prop){
//     // If the value of the object is an updatable type, just set the text/value
//     // If the prop is an object then it's likely waiting on firebase for the response at this point
//     if (typeof _this[prop] === "string" || typeof _this[prop] === "number"){
//       const $prop_node = $node.find( '.js-' + prop );
//       if ($prop_node.is("input")){ // Use value if input
//         $prop_node.val(_this[prop])
//       } else { // Else, set text
//         $prop_node.text( _this[prop] );
//       };
//     };
//   });
//
//   if ($template_node) { $template_node.parent().append($node) }; // Add updated node to dom
//   if (_this.afterRefresh){_this.afterRefresh(_this)};
// };



console.log("Base model loaded!")


// Define the Campaigns constructor
const Campaigns = function Campaigns(key) {
  // Set/override instance specific properties before we call BaseModel
  // eg. this.path = 'campaigns';
  // eg. this.customThing = 'omglol';

  this.owners = [];
  this.characters = [];

  this.onUpdate = function onUpdate(){
    const _this = this;

    Object.keys(_this.latestSnap.characters).forEach(function(push_key){
      if (push_key.split("_")[0] == "meta") { return; } // Skip meta stuff
      const characters_id = _this.latestSnap.characters[push_key].characters_id;

      _this.characters.push(new Characters(characters_id))
    });

  };

  BaseModel.call(this, key);
};

Campaigns.prototype = Object.create(BaseModel.prototype);
Campaigns.prototype.constructor = Campaigns;
console.log('Campaigns model loaded');


// Characters belong to users which make accessing them directly problematic
// Ends up we just set path and pass in user_id?

const Characters = function Characters(key, user_id) {


  this.onUpdate = function onUpdate(){
    var _this = this;

    Object.keys(window.mage.characters).forEach(function(character_id){

      $("[data-sourcekey="+ character_id +"][data-model='characters']")
        .find("[data-source]")
        .each(function(ii, element){
          var $element = $(element);

          if ($element.is('input')){
            $element.val( _this.latestSnap[$element.data('source')] );
          } else {
            $element.text( _this.latestSnap[$element.data('source')] );
          };
        });
    });
    
  };

  BaseModel.call(this, key); // Call the parent constructor
};



Characters.prototype = Object.create(BaseModel.prototype);
Characters.prototype.constructor = Characters;
console.log('Characters model loaded');

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
