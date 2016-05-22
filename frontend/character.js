var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta;

module.exports.characterPage = function characterPage(){
  window.locked = false;
  var character_id = window.location.search.replace("?id=", "");
  var default_equipment = {name: 'New Thing', price: '$1'}; // TODO
  var characterPath = "characters/" + character_id;

  // Generate a vue directly from the firebase character object
  // All fb object properties will be avilable and bindable in the view
  // for the vue templating to manipulate/show/iterate on
  fb_data.ref("characters/" + character_id).on("value", function(snap){
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
            fb_data.ref(characterPath).update(this.character);
          },
          addEquipment: function(){ // Push a new equipment
            fb_data.ref(characterPath + "/equipment").push(default_equipment);
          },
          deleteEquipment: function(ee){ // Destroy equipment
            var equipment_id = $(ee.target).data("equipment-id");
            fb_data.ref(characterPath + "/equipment/" + equipment_id).remove();
          }
        }
      });
    } else { // If we do have a vue object, update it when fb sends us stuff
      window.character.$set("character", character_data);
    };

    attachClickHandlers();
    revealPage();
  });

};

var attachClickHandlers = function(){
  $(".button-disabled").on('click', function(e){
    e.preventDefault();
    console.log('asdf');
  })

  // Prevent form submission
  $("#character-form").submit(function(e){
    e.preventDefault();
    // Can maybe put a modal up that explains realtime?
  });

  // Class & Race selection
  // When the race or class form is clicked, opn up detail pane
  $(".detail-change-click").on("click", function(e){
    if (window.locked == false){
      var fieldName = $(e.currentTarget).data('field'); // 'race' or 'class'
      var $inputVal = $("#character-" + fieldName).val();
      showDetailPane(fieldName, $inputVal);
    };
  });

  // Tabs inside detail panes (rogue, human, etc.)
  $("body").on("click", ".character-detail-tab", function(e){
    var _this = $(e.currentTarget) // this tab
    var selectorType = _this.closest("[data-selector]").data('selector'); // 'race' or 'class' from parent selector
    showDetailPane(selectorType, _this.data("lookup") );
  });

  // When they choose a race or class
  $("[data-detail-select]").on("click", function(e){
    var _this = $(e.currentTarget);
    var detailSelect = $(e.currentTarget).data('detail-select');

    if (_this.data('lookup') === 'race'){
      $("#character-race").val(detailSelect); // Set input
      $("#character-race").change(); // Trigger change so vue diffing knows it's different?
    } else {
      $("#character-class").val(detailSelect); // Set input
      $("#character-class").change(); // Trigger change so vue diffing knows it's different?
    }
    window.character.updateStore(); // Now call updateStore directly since change doesn't trigger it
    hideDetailPane(); // Hide pane
  });

  // Overlay clickity clicker
  $(".overlay").on("click", function(){
    hideDetailPane();
  });

  $("#character-lock-fields").on("click", function(e){
    if ($(e.currentTarget).hasClass("ion-unlocked")){
      // Lock fields down
      $(e.currentTarget).addClass("ion-locked");
      $(e.currentTarget).removeClass("ion-unlocked");
      $("input").prop( "disabled", true );
      window.locked = true;
    } else {
      // Unlock fields
      $(e.currentTarget).addClass("ion-unlocked");
      $(e.currentTarget).removeClass("ion-locked");
      $("input").prop( "disabled", false );
      window.locked = false;
    };
  });

  $("#toggle-skills").on("click", function(){

  });
};

var showDetailPane = function(selector, fieldValue){
  var $detailTab = $("[data-selector="+ selector +"]");
  var $detailPane = $("#" + fieldValue + "-info");

  // Show overlay
  var $overlay = $(".overlay");
  $overlay.css('z-index', '1');
  $overlay.show();

  $(".character-detail-panes").addClass("off-screen"); // Hide all detail panes
  $(".character-detail-tab").removeClass("selected"); // Remove selected highlight style

  $detailTab.removeClass("off-screen"); // Show race tabs
  $detailTab.find($("#"+ fieldValue +"-tab")).addClass("selected");
  $detailPane.removeClass("off-screen"); // Show the selected race pane
};

var hideDetailPane = function(){
  $(".overlay").hide();
  $(".character-detail-tabs").addClass("off-screen");
  $(".character-detail-panes").addClass("off-screen"); // Hide detail panes
};


String.prototype.capitalize = function() { // TODO move this out if we need it other places?
  return this.charAt(0).toUpperCase() + this.slice(1);
};
