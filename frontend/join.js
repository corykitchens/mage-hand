var Vue = require('vue');
var fb_data = require('./fb').database();
var revealPage = require('./globals').revealPage;

module.exports.joinPage = function joinPage(){
  console.log('loller');
  revealPage();
};
