var Vue = require('vue');
var fb = require('./fb');
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta;

String.prototype.capitalize = function() { // TODO move this out if we need it other places?
  return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports.characterPage = function characterPage(){

  var character_id = window.location.search.replace("?id=", "");
  var default_equipment = {name: 'New Thing', price: '$1'};

  // Generate a vue directly from the firebase character object
  // All fb object properties will be avilable and bindable in the view
  // for the vue templating to manipulate/show/iterate on
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
          addEquipment: function(){ // Push a new equipment
            fb.child("characters").child(character_id).child("equipment").push(default_equipment);
          },
          deleteEquipment: function(ee){ // Destroy equipment
            var equipment_id = $(ee.target).data("equipment-id");
            fb.child("characters").child(character_id).child("equipment").child(equipment_id).remove();
          }
        }
      });
    } else { // If we do have a vue object, update it when fb sends us stuff
      window.character.$set("character", character_data);
    };

    revealPage();
  });


  $("#character-lock-fields").on("click", function(e){
    if ($(e.currentTarget).hasClass("ion-unlocked")){
      // Lock fields down
      $(e.currentTarget).addClass("ion-locked");
      $(e.currentTarget).removeClass("ion-unlocked");
      $("input").prop( "disabled", true );
    } else {
      // Unlock fields
      $(e.currentTarget).addClass("ion-unlocked");
      $(e.currentTarget).removeClass("ion-locked");
      $("input").prop( "disabled", false );
    };

  });

};
