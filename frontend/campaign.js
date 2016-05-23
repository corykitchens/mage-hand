var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;
var gameMeta = require('./meta').gameMeta;

module.exports.campaignPage = function campaignPage(){
  console.log('lollerton');
  revealPage();
};
