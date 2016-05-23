var Vue = require('vue');
var fb_data = require('firebase').database();
var revealPage = require('./globals').revealPage;
//var gameTypes = require('./meta').gameTypes;
var gameMeta = require('./meta').gameMeta;
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
          // Push each campaign to the characters array so that vue can draw them afterwards
          var cc = campaign_snap.val();
          cc.key = campaign_id;
          campaigns.push(cc);

          //TODO for each campaign, find the characters to display on campaigns listing page?

          revealPage();
        });
      });

    };
  }).then(function(){

    new Vue({ // Draw all the characters pulled from firebase above
      el: '#vue-campaigns',
      data: { campaigns: campaigns }
    });

    attachClickHandlers();
  });
};


var attachClickHandlers = function(){
  $(document).on("click", "#new-campaign", function(ee){ // New campaign triggers confirmation modal
    showConfirmationModal();
  });

  $(document).on("click", "#campaign-modal-yes", function(ee){ // Yes to campaign modal
    createNewCampaign();
  });

  // Things which hide modal
  $(document).on("click touchstart", ".overlay" , function(ee){ hideModal(); });
  $(document).keyup(function(e){  if (e.keyCode === 27) hideModal(); });
  $("#campaign-modal-no").on('click', function(){ hideModal(); })

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


var createNewCampaign = function(){

  // Set user as the owner for the campaign
  var owners = {};
  owners[window.currentUser.uid] = Date.now();
  var campaignKey = campaignKeyGenerator();

  // Default campaign object
  var defaultCampaign = {
    name: 'New Campaign',
    owners: owners,
    campaign_key: campaignKey,
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

};
