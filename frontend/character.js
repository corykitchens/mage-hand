var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;
var gameMeta = require('./game_meta/meta').gameMeta;
var getUrlParam = require('./globals').getUrlParam;

var showOverlay = require('./globals').showOverlay;
var hideOverlay = require('./globals').hideOverlay;
var showDetailPane = require('./globals').showDetailPane;
var hideDetailPane = require('./globals').hideDetailPane;



module.exports.characterPage = function characterPage(){
  window.locked = false; // Lock ability to edit fields
  var character_id = getUrlParam("id");
  var characterPath = "characters/" + character_id;
  var trigger = getUrlParam("trigger");
  var default_equipment = { name: 'New Equipment' };
  var default_ability = { name: 'New Ability', bonus: 'Bonus', type: 'Type' };

  // Generate a vue directly from the firebase character object
  // All fb object properties will be avilable and bindable in the view
  // for the vue templating to manipulate/show/iterate on
  fb_data.ref("characters/" + character_id).on("value", function(snap){
    var character_data = snap.val();

    if (!window.character){ // If we don't have character, make vue
      console.log(gameMeta('dnd_5e'))
      window.character = new Vue({
        el: '#vue-character',
        data: {
          trigger: trigger,
          character: character_data,
          gameMeta: gameMeta( character_data.game_type ),
          campaigns: {},
        },
        methods: {
          updateStore: function(){
            fb_data.ref(characterPath).update(this.character);
          },
          addEquipment: function(){ // Push a new equipment
            if (window.locked === true) return; // Ignore if locked
            fb_data.ref(characterPath + "/equipment").push(default_equipment);
          },
          deleteEquipment: function(ee){ // Destroy equipment
            if (window.locked === true) return; // Ignore if locked
            var equipment_id = $(ee.target).data("equipment-id");
            fb_data.ref(characterPath + "/equipment/" + equipment_id).remove();
          },
          addAbility: function(){ // Push a new equipment
            if (window.locked === true) return; // Ignore if locked
            fb_data.ref(characterPath + "/abilities").push(default_ability);
          },
          deleteAbility: function(ee){ // Destroy equipment
            if (window.locked === true) return; // Ignore if locked
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
            if (window.locked === true) return; // Ignore if locked
            showSpellPane();
          },
          addSpell: function(ee){
            ee.preventDefault();
            var spellName = $(ee.currentTarget).data('spell');
            var spellData = this.gameMeta.spells[spellName];

            var serializedSpell = {
              name: spellName.replace("_", " "),
              description: spellData.casting_time + " : " +
                spellData.duration + " : " +
                spellData.components + " : " +
                spellData.range,
              long_description: spellData.description +
                spellData.casting_time + " : " +
                spellData.duration + " : " +
                spellData.components + " : " +
                spellData.range
            };

            fb_data.ref(characterPath + "/abilities").push(serializedSpell).then(function(){
              hideDetailPane();
            });
          },
          toggleInfo: function(ee){   // Toggle long information for abilities and spells
            $(ee.currentTarget).closest(".ability-item").find(".long-description").toggle();
          },
        }
      });

      attachClickHandlers();
      revealPage();

    } else { // If we do have a vue object, update it when fb sends us stuff
      window.character.$set("character", character_data);
    };

    getCampaigns(snap.val()); // Go fetch campaign data whether it's init or update
  });
};


// Fetch campaign data from character snap and push it into our character vue object to render
var getCampaigns = function(character_snap){
  // Reset campaign data to {} (for updates)
  // ^ If this isn't done deletes won't update because we're just setting existing keys
  window.character.$set("campaigns", {});

  if (character_snap.campaigns){ // If any campaigns exist
    var campaignIds = Object.keys(character_snap.campaigns);
    campaignIds.forEach(function(campaignId){
      // Set listener off before we do anything to ensure ther aren't multiple listers attached
      // A better way to do this is prob listen to child_added on the campaign reference list on
      // character, and then set on and off based on that
      fb_data.ref("campaigns/" + campaignId).off();
      fb_data.ref("campaigns/" + campaignId).on("value", function(campaign_snap){
        Vue.set(window.character.campaigns, campaignId, campaign_snap.val());
        $("#campaign-join-warning").hide(); // Hide join campaign prompt
        $(".join-campaign-home").hide(); // Hide join campaign button on main page
      });
    });
  } else {
    window.character.$set("campaigns", {});
    $("#campaign-join-warning").show();
  };
};

var attachClickHandlers = function(){
  $(".button-disabled").on('click', function(e){
    e.preventDefault();
  });

  $("body").on("click", ".leave-campaign", function(e){
    var character_id = getUrlParam("id");
    var characterPath = "characters/" + character_id;
    var campaign_id = $(e.currentTarget).data('campaign-id');
    // Remove character reference from campaign
    fb_data.ref("campaigns/" + campaign_id + "/characters/" + character_id).remove();
    // Remove campaign reference from character
    fb_data.ref(characterPath + "/campaigns/" + campaign_id).remove();
  });

  // Prevent form submission
  $("#character-form-primary, #character-form-secondary").submit(function(e){
    e.preventDefault(); // TODO Can maybe put a modal up that explains realtime?
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


  // Join campaign button
  $(".join-campaign").on("click", function(){
    $(".join-overlay").show();
    $(".join-modal").show();
  })
  // Close join campaign overlay by clicking outside of modal
  $(".join-overlay").on("click", function(){
    $(".join-overlay").hide();
    $(".join-modal").hide();
  });

  $(".add-character-to-campaign").on("click", function(e){
    var campaignCode = $(e.currentTarget)
    .closest(".join-modal-content")
    .find(".campaign-code-input")
    .val();
    addCharacterToCampaign(campaignCode);
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

};


// Shake the campaign modal and clear it's value to tell the user what they did was wrong
var shakeAndClearCampaignModal = function(){
  $(".campaign-code-input").val(""); // Clear field
  $(".join-modal").addClass("animated shake");
  setTimeout(function(){
    $(".join-modal").removeClass("animated shake");
  }, 400);
  console.log("No campaign found with that code.")
};

var addCharacterToCampaign = function(campaignCode){
  var characterKey = getUrlParam("id");

  fb_data.ref("campaigns")
    .orderByChild('campaign_key') // Using index (set in rules)
    .startAt(campaignCode)
    .limitToFirst(1)
    .once("value", function(snap){

    // If no reference exists, exit
    if (snap.val() === null) { shakeAndClearCampaignModal(); return; }

    // Check if campaign code matches thing, else return not found
    if (snap.val()[Object.keys(snap.val())[0]].campaign_key == campaignCode){
      var campaignId = Object.keys(snap.val())[0];

      // Add character reference to campaign
      fb_data.ref("campaigns/" + campaignId + "/characters/" + characterKey).set(Date.now());
      // Add campaign reference to characeter
      fb_data.ref("characters/" + characterKey + "/campaigns/" + campaignId).set(Date.now());
      hideOverlay();
    } else {
      // Note: at this point something WAS returned, but priority lookups will
      // find the closest match if the beginning letters match
      shakeAndClearCampaignModal();
    }
  });
};


var showSpellPane = function(){
  $("#spell-pane").removeClass("off-screen");
  showOverlay();
};
