var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta; //TODO do we need this? (see below)


module.exports.campaignPage = function campaignPage(){
  var campaign_id = window.location.search.replace("?id=", "");
  var campaignPath = "campaigns/" + campaign_id;

  // Generate a vue directly from the firebase campaign object
  fb_data.ref(campaignPath).on("value", function(snap){
    var campaign_data = snap.val();

    if (!window.campaign){ // If we don't have campaign, make vue

      window.campaign = new Vue({
        el: '#vue-campaign',
        data: {
          campaign: campaign_data, // Stores campaign data and character references
          characters: {}, // Stores expanded character data
          gameMeta: gameMeta( campaign_data.type ) //TODO do we need gamemeta here?
        },
        methods: {
          updateStore: function(){
            fb_data.ref(campaignPath).update(this.campaign);
          },
        }
      });

      attachClickHandlers();
      revealPage();

    } else { // Otherwise, set existing window reference to the vue object
      window.campaign.$set("campaign", campaign_data);
    };

    observeCharacterChanges();

  });
};


// Go through our character references stored in our campaign, and set up
// listeners for those individual character lookups. On chanve from firebase,
// they will change their character on the campaign object, thus re-rendering
// the vue. On subsiquent polls, it will simply add characters, etc.
// TODO will not remove characters in real time
var observeCharacterChanges = function(){
  var characterIds = Object.keys(window.campaign.campaign.characters);
  characterIds.forEach(function(character_id){
    fb_data.ref("characters/" + character_id).on("value", function(character_snap){
      Vue.set(window.campaign.characters, character_id, character_snap.val());
    });
  });
};


var attachClickHandlers = function(){

  // Invite/code drawer at bottom of page
  $(".invite-info").on("click", function(ee){
    $inviteInfo = $(ee.currentTarget);
    $inviteInfo.toggleClass("shrink");
  });

};
