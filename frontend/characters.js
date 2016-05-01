var Vue = require('vue');
var fb = require('./fb');
var revealPage = require('./globals').revealPage;
var gameTypes = require('./meta').gameTypes;
var gameMeta = require('./meta').gameMeta;

module.exports.charactersPage = function charactersPage(){

  var characters = [];
  fb.child("users").child(window.auth.uid).child("characters").once('value', function(snap){

    if (snap.val() == null){ // If no characters exist yet
      $(".button-add").addClass("button-huge-middle")
      revealPage(); // Show page
      // TODO Show a tooltip or something on how to make new
    } else { // Else, display each character user has
      Object.keys(snap.val()).forEach(function(character_id){
        fb.child("characters").child(character_id).once('value', function(character_snap){
          // Push each character to the characters array so that vue can draw them
          var cc = character_snap.val();
          cc.key = character_id;
          characters.push(cc);
          revealPage();
        });
      });
    }
  });


  // Draw all the characters pulled from firebase above
  new Vue({
    el: '#vue-characters',
    data: { characters: characters }
  });


  // Clicking on a character sends you to a character page
  $(document).on("click", ".character", function(ee){
    window.location.href = "/character?id=" + $(ee.currentTarget).attr("id");
  });

  $(document).on("click", ".overlay", function(ee){
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


  var showGameTypeModal = function(){
    new Vue({
      el: '#game-selection',
      data: { game_types: gameTypes() },
      methods: {
        createNewCharacter: createNewCharacter
      }
    });
    $(".modal").show(); $(".overlay").show();
  };



  // Creates a new character, pushes it to fb, performs callback w/ character_id string
  var createNewCharacter = function(ee){
    var game_type = $(ee.target).attr('id'); // Game type from link id
    var new_char_template = gameMeta(game_type).default_character; // Get default from meta
    new_char_template.type = game_type; // Set game type on new character

    // Push new character to /characters
    var oo = fb.child("characters").push(new_char_template);
    // Add to /users node to draw referance
    var character_id = oo.path.u[1];
    fb.child("users")
      .child(window.auth.uid).child("characters").child(character_id)
      .update( {character_id: (new Date).toString()} )

    window.location.href = "/character?id=" + character_id; // Redirect to character view
  };


};
