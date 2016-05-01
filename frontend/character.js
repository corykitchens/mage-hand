var Vue = require('vue');
var fb = require('./fb');
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports.characterPage = function characterPage(){

  var character_id = window.location.search.replace("?id=", "");
  var default_weapon = {name: 'New Weapon', price: '$1'};

  // Generate a vue directly from the firebase character object
  // All fb object properties will be avilable and bindable in the view
  fb.child("characters").child(character_id).on("value", function(snap){
    var character_data = snap.val();

    if (!window.character){ // If we don't have character, make vue
      window.character = new Vue({
        el: '#vue-character',
        data: {
          character: character_data,
          gameMeta: gameMeta( character_data.type )
        },
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

};
