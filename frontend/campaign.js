var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta;

module.exports.campaignPage = function campaignPage(){
  console.log('campaign js loaded');
  var campaign_id = window.location.search.replace("?id=", "");

  // Generate a vue directly from the firebase campaign object
  fb_data.ref("campaigns/" + campaign_id).on("value", function(snap){
    var campaign_data = snap.val();

    if (!window.campaign){ // If we don't have campaign, make vue

      window.campaign = new Vue({
        el: '#vue-campaign',
        data: {
          campaign: campaign_data,
          gameMeta: gameMeta( campaign_data.type )
        },
        methods: {
          updateStore: function(){
            fb_data.ref(campaignPath).update(this.campaign);
          },
          toggleInfo: function(ee){   // Toggle long information for abilities and spells
            $(ee.currentTarget).closest(".ability-item").find(".long-description").toggle();
          },
        }
      });

      attachClickHandlers();
      revealPage();

    } else { // If we do have a vue object, update it when fb sends us stuff
      window.campaign.$set("campaign", campaign_data);
    };
  });

};


var attachClickHandlers = function(){

  $(".invite-info").on("click", function(ee){
    $inviteInfo = $(ee.currentTarget);
    $inviteInfo.toggleClass("shrink");
  });

};
