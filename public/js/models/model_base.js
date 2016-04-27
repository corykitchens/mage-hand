"use strict";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Setup (TODO this should be moved out probably)
var fb = new Firebase("https://magicmissile.firebaseio.com/"); console.log("Firebase loaded!");

window.mage = {};

// BaseModel - Parent class for all firebase listeners
const BaseModel = function(key){

  // Latest snapshot received on update from firebase
  this.latestSnap;

  // Path to the object source this model will reference
  // Init will attach to the firebase location using this path
  // eg. 'blog/posts'
  this.path = this.path || this.constructor.name.toLowerCase();

  // Key used to select an instance of an object
  // Init will also use this key if it's present
  // eg. 'post1235'
  this.key = key;

  // Sets a selector which is used to identify model in dom w/ 'data-model' attrribute
  // Will use classname by defualt  eg. data-model="campaign" or data-model="character"
  this.selector = this.selector || this.constructor.name.toLowerCase();


  // Properties to build in dom. This will get populated from
  // init() based on the firebase object
  //this.fbProps = []; //TODO remove

  // A function to be run after an update is received from Firebase
  this.onUpdate;

  this.init(); // Let's get this party started
};


BaseModel.prototype.init = function(){
  var _this;
  if (this.path === undefined) console.log('NO PATH IS SET!');

  // Setup window storage
  if (window.mage[this.path] == undefined) { window.mage[this.path] = {} };


  // If it exists in window, set that as reference
  if (window.mage[this.path][this.key] == undefined){
    window.mage[this.path][this.key] = this
  }
  _this = window.mage[this.path][this.key];

  // Build path to object reference eg. blog/posts/post12345
  const fullpath = _this.path + "/" + _this.key;

  // Listen for changes on the cooresponding Firebase object
  fb.child(fullpath).on("value", function(object_snapshot) {
    _this.latestSnap = object_snapshot.val(); // Store the latest update/snapshot
    if (_this.onUpdate){ _this.onUpdate() }; // Call onUpdate if it's being defined
  });
};







  //   // Synchronize object properties (fbProps) with that of the update/snapshot
  //   Object.keys(snapshot).forEach(function(snap_key){
  //
  //     // If we find a collection, we want to bring in any relational
  //     if (snapshot[snap_key].meta_type === "collection"){
  //       Object.keys(snapshot[snap_key]).forEach(function(collection_key){
  //         if (collection_key.split("_")[0] == "meta") { return; } // Skip meta stuff
  //         var collection_object = snapshot[snap_key][collection_key];
  //
  //         var lookup = Object.keys(collection_object)[0] // e.g. user_id
  //         var path_name = lookup.split("_id")[0]; // e.g. user
  //
  //         debugger;
  //       });
  //
  //       _this[snap_key] = snapshot[snap_key];
  //       _this.fbProps.push(snap_key);
  //     });
  //   });
  // });





// BaseModel.prototype.refresh = function(){
//   const _this = this;
//   console.log('refreshing!');
//
//   debugger;
//   // If a dom element exists with the object key as the ID, we'll use that
//   if ($( '.' + _this.selector + '#' + _this.key ).length > 0){
//     var $node = $( '.' + _this.selector + '#' + _this.key ); // Select by ID
//   } else { // else, let's build a new one
//     var $template_node = $('.' + _this.selector + '.js-template'); // Find the template for this obj
//     var $node = $template_node.clone(); // Clone for manipulation
//     $node.attr('id', _this.key); // Set ID so we can find it on next update
//     $node.removeClass('js-template'); // Remove .js-template from clone
//   };
//
//   if ($node.length === 0) { console.log("No node with ." + _this.selector); return; };
//
//   this.fbProps.forEach(function(prop){
//     // If the value of the object is an updatable type, just set the text/value
//     // If the prop is an object then it's likely waiting on firebase for the response at this point
//     if (typeof _this[prop] === "string" || typeof _this[prop] === "number"){
//       const $prop_node = $node.find( '.js-' + prop );
//       if ($prop_node.is("input")){ // Use value if input
//         $prop_node.val(_this[prop])
//       } else { // Else, set text
//         $prop_node.text( _this[prop] );
//       };
//     };
//   });
//
//   if ($template_node) { $template_node.parent().append($node) }; // Add updated node to dom
//   if (_this.afterRefresh){_this.afterRefresh(_this)};
// };



console.log("Base model loaded!")
