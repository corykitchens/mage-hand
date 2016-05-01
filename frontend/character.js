var Vue = require('vue');
var fb = require('./fb');
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports.characterPage = function characterPage(){

  window.formBuilt = false;

  var character_id = window.location.search.replace("?id=", "");
  var default_weapon = {name: 'New Weapon', price: '$1'};


  // Generate a vue directly from the firebase character object
  // All fb object properties will be avilable and bindable in the view
  fb.child("characters").child(character_id).on("value", function(snap){

    var character_data = snap.val();

    if (!window.formBuilt){ // If we don't have character, make vue
      generateForm(character_data);
      window.character = new Vue({
        el: '#vue-character',
        data: {character: character_data, gameMeta: gameMeta()},
        methods: {
          updateStore: function(){
            fb.child("characters").child(character_id).update(this.character);
          },
          addWeapon: function(){ // Push a new weapon to fb
            fb.child("characters").child(character_id).child("weapons").push(default_weapon);
          },
          deleteWeapon: function(ee){
            var weapon_id = $(ee.target).data("weapon-id");
            fb.child("characters").child(character_id).child("weapons").child(weapon_id).remove();
          }
        }
      });
    } else { // If we do have a vue object, update it when fb sends us stuff
      window.character.$set("character", character_data);
    };

    revealPage();
  });



  var generateForm = function(character_data){
    var game_meta = gameMeta(character_data.type);

    Object.keys(game_meta.character_structure).forEach(function(char_key){
      // If value is string, it's either text or number
      var $label = $('<label for='+ char_key +'/>').text(char_key.capitalize());
      var $input = $('<input/>').attr({ id:char_key});

      if (typeof game_meta.character_structure[char_key] == "string"){
        $input.attr("type", game_meta.character_structure[char_key])
      }

      // Add change handlers to input so it can sync with vue/firebase
      $input.attr({"v-on:keyup":"updateStore", "v-on:change":"updateStore", "v-model":"character."+char_key})
      $label.appendTo("#character-form")
      $input.appendTo("#character-form")
    });

    window.formBuilt = true;
  };


};
