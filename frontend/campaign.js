// Defines functions applicable to an individual /campaign page

var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;
var gameMeta = require('./game_meta/meta').gameMeta; //TODO do we need this? (see below)
var showOverlay = require('./globals').showOverlay;

module.exports.campaignPage = function campaignPage(){
  var campaign_id = window.location.search.replace("?id=", "");
  var campaignPath = "campaigns/" + campaign_id;
  var npcsPath = campaignPath + '/npcs'

  var defaultNpc = gameMeta('dnd_5e').default_npc; // TODO make this pull from meta?

  // Generate a vue directly from the firebase campaign object
  fb_data.ref(campaignPath).on("value", function(snap){
    var campaign_data = snap.val();

    if (!window.campaign){ // If we don't have campaign, make vue

      window.campaign = new Vue({
        el: '#vue-campaign',
        data: {
          campaign: campaign_data, // Stores campaign data and character references
          characters: {}, // Stores expanded character data
          gameMeta: gameMeta(campaign_data.game_type),
        },
        methods: {
          updateStore: function(){
            fb_data.ref(campaignPath).update(this.campaign);
          },
          toggleInfo: function(ee){ // Toggle long information for abilities and spells
            $(ee.currentTarget).closest(".ability-item").find(".long-description").toggle();
          },
          addNpc: function(){
            fb_data.ref(npcsPath).push(defaultNpc);
          },
          deleteNpc: function(ee){
            var npc_id = $(ee.currentTarget).data('npc-id');
            console.log(npc_id, npcsPath + '/npc_id')
            fb_data.ref(npcsPath + '/' + npc_id).remove();
          },
          deleteCampaign: function(ee){
            // Deletes campaigns from campaign owner and global store
            // This doesn't delete campaigns from character profiles - instead
            // when a campaign list is polled by a character, it will be removed from their
            // list if no data is found
            if (window.confirm("Permanently delete this campaign?")) { 
              fb_data.ref(campaignPath).remove().then(function(){ // Remove from global campaigns
                fb_data.ref('users/' + window.currentUser.uid + '/campaigns/' + campaign_id).remove().then(function(){
                  window.location.replace('/campaigns');
                })
              });
            };
          }
        }
      });

      attachClickHandlers();
      revealPage();

    } else { // Otherwise, set existing window reference to the vue object
      window.campaign.$set("campaign", campaign_data);
    };

    updateCharacters(campaign_id);
  });
};


// Go through our character references stored in our campaign, and set up
// listeners for those individual character lookups. On change from firebase,
// they will change their character on the campaign object, thus re-rendering
// the vue. On subsiquent polls, it will simply add characters, etc.
// TODO will not remove characters in real time
var updateCharacters = function(campaign_id){
  if (window.campaign.campaign.characters){
    var characterIds = Object.keys(window.campaign.campaign.characters);
    characterIds.forEach(function(character_id){
      fb_data.ref("characters/" + character_id).on("value", function(character_snap){

        if (character_snap.val() == null) { // If this character has been removed, remove the reference
          fb_data.ref("campaigns/" + campaign_id + "/characters/" + character_id).remove();
        } else {
          Vue.set(window.campaign.characters, character_id, character_snap.val());
          attachCharacterClickHandler(character_id);
        };

      });
    });
  };
};


var attachClickHandlers = function(){
  // Invite/code drawer at bottom of page
  $(".invite-info").on("click", function(ee){
    $inviteInfo = $(ee.currentTarget);
    $inviteInfo.toggleClass("shrink");
  });
};

var attachCharacterClickHandler = function(character_id){
  $(document).on("click", "[data-show-character="+ character_id +"]", function(e){
    showCharacterDetails(character_id);
  });
};

var showCharacterDetails = function(character_id){
  showOverlay();
  $("#detail-" + character_id).removeClass("off-screen");
};
