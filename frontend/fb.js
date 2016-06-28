var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAUsSroV5NV89p9H-Qm9_LazNxCtrw374c",
  authDomain: "magicmissile.firebaseapp.com",
  databaseURL: "https://magicmissile.firebaseio.com",
  storageBucket: "project-7942438947355521096.appspot.com",
};

firebase.initializeApp(config);
module.exports = firebase;
