// Defines functions applicable to the /campaigns list page

var Vue = require('vue');
var fb_data = require('firebase').database();
var revealPage = require('./globals').revealPage;
var gameTypes = require('./game_meta/meta').gameTypes;
var gameMeta = require('./game_meta/meta').gameMeta;
var campaignKeyGenerator = require('./generators.js').campaignKeyGenerator;

module.exports.campaignsPage = function campaignsPage(){
  var userUid = window.currentUser.uid;
  var campaignsPath = "users/" + userUid + "/campaigns";
  var campaigns = []; // Used to render all characters on page through vue

  fb_data.ref(campaignsPath).once('value').then(function(snap){
    if (snap.val() == null){ // If no characters exist yet

      $(".button-add").addClass("button-huge-middle");
      revealPage(); // TODO Show a tooltip or something on how to make new

    } else { // Else, display each campaign a user has

      Object.keys(snap.val()).forEach(function(campaign_id){
        fb_data.ref("campaigns/" + campaign_id).once('value', function(campaign_snap){
          // IF we encounter a campaign that doesn't exist
          if (campaign_snap.val() == null){
            fb_data.ref(campaignsPath + "/" + campaign_id).remove();
          } else { // Else, transform & show data
            // Push each campaign to the campaigns array so that vue can draw them afterwards
            var cc = campaign_snap.val();
            cc.game_type = gameMeta(cc.game_type).short_name; // Transform game type to readable format
            cc.key = campaign_id;
            campaigns.push(cc);
          };
        });
      });

    };
  }).then(function(){

    new Vue({ // Draw all the characters pulled from firebase above
      el: '#vue-campaigns',
      data: {
        campaigns: campaigns,
        game_types: gameTypes(),
      }
    });

    new Vue({ // Draw all the characters pulled from firebase above
      el: '#vue-campaigns-modal',
      data: {
        game_types: gameTypes(),
      },
      methods: {
        createCampaign: function(ee){
          var game_type = $(ee.target).attr('id');
          createNewCampaign(game_type);
        }
      }
    });

    revealPage();
    attachClickHandlers();
  });
};


var attachClickHandlers = function(){
  $(document).on("click", "#new-campaign", function(ee){ // New campaign triggers confirmation modal
    showConfirmationModal();
  });

  // TODO these modal things are sort of duplicated in global - need to refactor
  // Things which hide modal
  $(document).on("click touchstart", ".overlay" , function(ee){ hideModal(); });
  $(document).keyup(function(e){  if (e.keyCode === 27) hideModal(); });

  // Clicking on a campaign sends you to a character page
  $(document).on("click", ".campaign", function(ee){
    window.location.href = "/campaign?id=" + $(ee.currentTarget).attr("id");
  });

};


var hideModal = function(){
  $(".modal").hide();
  $(".overlay").hide();
};

var showConfirmationModal = function(){
  $(".modal").show();
  $(".overlay").show();
};


var createNewCampaign = function(game_type){

  // Set user as the owner for the campaign
  var owners = {};
  owners[window.currentUser.uid] = Date.now();
  var campaignKey = campaignKeyGenerator();

  // Default campaign object
  var defaultCampaign = {
    name: 'New Campaign',
    owners: owners,
    campaign_key: campaignKey,
    game_type: game_type,
  };

  // Push default campaign object as new campaign
  var campaignPush = fb_data.ref("campaigns").push(defaultCampaign);

  // Then, reference it in user info
  fb_data.ref("users/" + window.currentUser.uid + "/campaigns/" + campaignPush.key).set({
    created_on: Date.now(),
    campaign_key: campaignKey,
  }).then(function(){
    console.log('Campaign created!');
    window.location.href = "/campaign?id=" + campaignPush.key;
  });

  var campaignReference = fb_data.ref("campaigns/" + campaignPush.key);
  campaignReference.setPriority(campaignKey);

};
