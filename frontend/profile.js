var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;


var removeUser = function(){
  var uid = window.currentUser.uid;
  var userPath = "users/" + uid;
  var userData;

  fb_data.ref(userPath).once("value", function(snap){
    userData = snap.val();
  }).then(function(){

    // Remove all user campaigns
    if (userData.campaigns){
      Object.keys(userData.campaigns).forEach(function(campaign_key){
        // Note: At this point not all references to this campaign has been removed
        // Instead, when a user is pulling up their campaign data, if it's not present,
        // the referebce will be removed.
        fb_data.ref("/campaigns/" + campaign_key).remove();
      });
    };

    if (userData.characters){
      // Remove all user characters
      Object.keys(userData.characters).forEach(function(character_key){
        fb_data.ref("/characters/" + character_key).remove();
      });
    };

    // Remove the user data in database
    fb_data.ref(userPath).remove();

  }).then(function(){
    firebase.auth().currentUser.delete().then(function() {
      window.location.replace("/");
    }, function(error) {
      console.log(error);
      alert(error.message);
    });
  });
};


module.exports.profilePage = function profilePage(){
  var uid = window.currentUser.uid;
  var userPath = "users/" + uid;
  var userData;

  fb_data.ref(userPath).once("value", function(snap){
    userData = snap.val();
    var authData = window.currentUser.providerData[0];

    if (snap.val() == undefined || snap.val() == null){
      fb_data.ref(userPath).update({
        provider: authData.providerId,
        displayName: authData.displayName
      }).then(function(){
        profilePage(); // Recall
      });
    } else {
      window.profileData = new Vue({
        el: '#vue-user',
        data: {
          user: userData, // Stores campaign data and character references
        },
        methods: {
          updateStore: function(){
            fb_data.ref(userPath).update(this.user);
          },
          deleteUser: function(){
            var c = confirm("Delete your account, including all your characters and campaigns?");
            if (c == true) {
              console.log('You will be remembered...');
              removeUser();
            } else {
              console.log('Great choice');
            }
          },
        }
      });

      revealPage();
    };
  });
};
