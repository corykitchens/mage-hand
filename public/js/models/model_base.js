"use strict";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

var fb = new Firebase("https://magicmissile.firebaseio.com/"); console.log("Firebase loaded!");


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

  // Sets a selector to modify dom
  // Will use class/filename  eg. 'model_user' or 'model_post' by default
  this.selector = this.selector || "model_" + this.constructor.name.toLowerCase();

  // Set to true if object should start with view build
  this.shouldRefresh = true;

  // Properties to build in dom. This will get populated from
  // init() based on the firebase object
  this.fbProps = [];

  this.init(); // Let's get this party started
};


BaseModel.prototype.init = function(){
  if (this.path === undefined) console.log('NO PATH IS SET!')
  const _this = this;

  // Build path to object reference eg. blog/posts/post12345
  const fullpath = this.path + "/" + this.key;

  // Listen for changes on this firebase object
  fb.child(fullpath).on("value", function(snap) {
    const snapshot = snap.val();
    _this.latestSnap = snapshot; // Store the latest update/snapshot

    // Synchronize object properties (fbProps) with that of the update/snapshot
    Object.keys(snapshot).forEach(function(snap_key){

      // If we find a collection, we want to bring in any relational
      if (snapshot[snap_key].meta_type === "collection"){
        Object.keys(snapshot[snap_key]).forEach(function(collection_key){
          if (collection_key.split("_")[0] == "meta") { return; } // Skip meta stuff
          var collection_object = snapshot[snap_key][collection_key];

          // Look up by key name eg. character_id or post_id
          // NOTE: The object it's referencing needs to be a root object
          // To improve this, there could be another property we look for in the databse
          // that provides details of the path or something?
          var lookup = Object.keys(collection_object)[0] // e.g. user_id
          var path_name = lookup.split("_id")[0]; // e.g. user

          // Look up by pathname and key (collection_object[lookup]) in firebase
          fb.child(path_name + "/" + collection_object[lookup]).once('value', function (lookup_snap) {
            // Then, sync the retreived data with the object data
            if ( Array.isArray(this.instance[this.snap_key]) ){
              this.instance[this.snap_key].push(lookup_snap.val());
            } else {
              this.instance[this.snap_key] = [].concat( lookup_snap.val() );
            };
            if (_this.afterOnce){ _this.afterOnce() }; // Call this function when fetch is done
          }, function (err) {
            console.log("Error when looking up " + this.path_name)
          }, {instance: _this, snap_key: snap_key}); // Preserves _this, etc.
        });
      } else {
        // Else just update the basic property and should directly
        // update the instance with the same key name
        _this[snap_key] = snapshot[snap_key];
      };
      _this.fbProps.push(snap_key);
    });

    if (_this.shouldRefresh){ _this.refresh(); }
  });
};




BaseModel.prototype.refresh = function(){
  const _this = this;
  console.log('refreshing!');

  // If a dom element exists with the object key as the ID, we'll use that
  if ($( '.' + _this.selector + '#' + _this.key ).length > 0){
    var $node = $( '.' + _this.selector + '#' + _this.key ); // Select by ID
  } else { // else, let's build a new one
    var $template_node = $('.' + _this.selector + '.js-template'); // Find the template for this obj
    var $node = $template_node.clone(); // Clone for manipulation
    $node.attr('id', _this.key); // Set ID so we can find it on next update
    $node.removeClass('js-template'); // Remove .js-template from clone
  };

  if ($node.length === 0) { console.log("No node with ." + _this.selector); return; };

  this.fbProps.forEach(function(prop){
    // If the value of the object is an updatable type, just set the text/value
    // If the prop is an object then it's likely waiting on firebase for the response at this point
    if (typeof _this[prop] === "string" || typeof _this[prop] === "number"){
      const $prop_node = $node.find( '.js-' + prop );
      if ($prop_node.is("input")){ // Use value if input
        $prop_node.val(_this[prop])
      } else { // Else, set text
        $prop_node.text( _this[prop] );
      };
    };
  });

  if ($template_node) { $template_node.parent().append($node) }; // Add updated node to dom
  if (_this.afterRefresh){_this.afterRefresh(_this)};
};



console.log("Base model loaded!")
