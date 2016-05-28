var Vue = require('vue');
var fb_data = require('firebase').database();
var revealPage = require('./globals').revealPage;
var gameTypes = require('./game_meta/meta').gameTypes;
var gameMeta = require('./game_meta/meta').gameMeta;

module.exports.charactersPage = function charactersPage(){
  var userUid = window.currentUser.uid;
  var charactersPath = "users/" + userUid + "/characters";
  var characters = []; // Used to render all characters on page through vue

  fb_data.ref(charactersPath).once('value').then(function(snap){
    if (snap.val() == null){ // If no characters exist yet

      $(".button-add").addClass("button-huge-middle");
      revealPage(); // TODO Show a tooltip or something on how to make new

    } else { // Else, display each character user has

      Object.keys(snap.val()).forEach(function(character_id){
        fb_data.ref("characters/" + character_id).once('value', function(character_snap){
          // Push each character to the characters array so that vue can draw them afterwards
          var cc = character_snap.val();
          cc.key = character_id;
          characters.push(cc);
          revealPage();
        });
      });

    };
  }).then(function(){

    new Vue({ // Draw all the characters pulled from firebase above
      el: '#vue-characters',
      data: { characters: characters }
    });
    attachClickHandlers();

  });
};


var attachClickHandlers = function(){
  // Clicking on a character sends you to a character page
  $(document).on("click", ".character", function(ee){
    window.location.href = "/character?id=" + $(ee.currentTarget).attr("id");
  });

  $(document).on("click touchstart", ".overlay", function(ee){
    $(ee.target).hide();
    $(".modal").hide();
  });

  $(document).keyup(function(e){ // Escape key
    if (e.keyCode === 27) $('.overlay').click();
  });

  // Clicking on the new button adds a new (mostly-empty) character
  $(document).on("click", "#new-character", function(ee){
    showGameTypeModal();
  });

};

var showGameTypeModal = function(){
  new Vue({
    el: '#game-selection',
    data: { game_types: gameTypes() },
    methods: { createNewCharacter: createNewCharacter }
  });
  $(".modal").show(); $(".overlay").show();
};

// Creates a new character, pushes it to fb, performs callback w/ character_id string
var createNewCharacter = function(ee){
  var userUid = window.currentUser.uid;
  var charactersPath = "users/" + userUid + "/characters";
  var game_type = $(ee.target).attr('id'); // Game type from link id
  var new_char_template = gameMeta(game_type).default_character; // Get default from meta
  new_char_template.game_type = game_type; // Set game type on new character

  var oo = fb_data.ref("characters").push(new_char_template); // Push new character to /characters

  // Add to /users node to draw referance
  // This might change with Firebase 3?
  var character_id = oo.key;
  fb_data.ref(charactersPath + "/" + character_id).update(
    {created_on: (new Date).toString()}
  );
  window.location.href = "/character?id=" + character_id; // Redirect to character view
};

// Wildcat!Wildcat! Tower
