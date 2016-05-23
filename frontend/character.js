var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta;

module.exports.characterPage = function characterPage(){
  window.locked = false;
  var character_id = window.location.search.replace("?id=", "");
  var default_equipment = {name: 'New Equipment' }; // TODO
  var default_ability = {name: 'New Ability', bonus: 'Bonus', type: 'Type'}

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
          },
          addAbility: function(){ // Push a new equipment
            fb_data.ref(characterPath + "/abilities").push(default_ability);
          },
          deleteAbility: function(ee){ // Destroy equipment
            var ability_id = $(ee.target).data("ability-id");
            fb_data.ref(characterPath + "/abilities/" + ability_id).remove();
          },
          updateSkill: function(ee){
            var $closestBox = $(ee.currentTarget).closest(".box-skill")
            var selectedSkill = $closestBox.find("input").attr('id').replace("skill-", "");
            var skillPath = characterPath + "/skills/" + selectedSkill;

            if ($(ee.currentTarget).prop('checked')) { // If it's becoming checked (not currently)
              fb_data.ref(skillPath).set(1);
            } else {
              fb_data.ref(skillPath).remove();
            };
          },
          addAbilityPicker: function(){
            showSpellPane();
          },
          addSpell: function(ee){
            ee.preventDefault();
            var spellName = $(ee.currentTarget).data('spell');
            var spellData = this.gameMeta.spells[spellName];

            var serializedSpell = {
              name: spellName.replace("_", " "),
              description: spellData.casting_time + " : " + spellData.duration + " : " + spellData.components + " : " + spellData.range,
              long_description: spellData.description + spellData.casting_time + " : " + spellData.duration + " : " + spellData.components + " : " + spellData.range
            }

            fb_data.ref(characterPath + "/abilities").push(serializedSpell).then(function(){
              hideDetailPane();
            });
          },
          toggleInfo: function(ee){   // Toggle long information for abilities and spells
            $(ee.currentTarget).closest(".ability-item").find(".long-description").toggle();
          },
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
  $("#character-form-primary, #character-form-secondary").submit(function(e){
    e.preventDefault();
    // Can maybe put a modal up that explains realtime?
  });

  // Class & Race selection
  // When the race or class form is clicked, opn up detail pane
  $(".detail-change-click").on("click", function(e){
    if (window.locked == false){
      e.preventDefault();
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

  $(".character-lock-fields").on("click", function(e){
    if ($(e.currentTarget).hasClass("ion-unlocked")){
      // Lock fields down
      $lockIcons = $(".character-lock-fields");
      $lockIcons.addClass("ion-locked");
      $lockIcons.removeClass("ion-unlocked");
      $("input, textarea").prop( "disabled", true );
      window.locked = true;
    } else {
      // Unlock fields
      $lockIcons.addClass("ion-unlocked");
      $lockIcons.removeClass("ion-locked");
      $("input, textarea").prop( "disabled", false );
      window.locked = false;
    };
  });

  // Bottom fixed nav bar thing
  $(".nav-button").on("click", function(ee){
    var selector = $(ee.currentTarget).data('show');
    var $slidableForms = $(".slidable-form");

    $slidableForms.addClass("off-screen");
    $slidableForms.show();

    setTimeout(function(){
      $(window).scrollTop(0);
      $("#" + selector).removeClass("off-screen");
    }, 300)

    // After animation (0.3) hide non-visible screens to prevent excess scroll areas
    setTimeout(function(){
      $("form").each(function(ii, form){
        $form = $(form);
        if($form.hasClass('off-screen')) $form.hide();
      })
    }, 300)

  });

  $(document).keypress(function(e) { // Prevent enter from doing anything
    if(e.which == 13) return false;
    // ^ not technically a click handler but #yolo
  });

};


var showSpellPane = function(){
  $(".spell-pane").removeClass("off-screen");

  var $overlay = $(".overlay");
  $overlay.css('z-index', '1');
  $overlay.show();
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
