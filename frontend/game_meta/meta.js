
// The game meta documents are design to define character and game structure for drawing and
// maniuplating views related to a character of that 'game type' - This contains the
// appropriate functions to fetch game meta for use in view.

// -- Adding Game Meta --
// You'll need to create a new file for each 'game type' which should correspond with it's key
// used to access it. Use dnd_5e as an example - it contains stat information, how characters
// should be structure, spells, etc.

// A view will not inherintly be smart enough to know what to do with a gameMeta object, but
// you can use them as an easy way to abstract view logic and allow for consinstent changes
// for a given game type.

// NOTE: Game meta information for each game are stored in seperate files in this folder, and can
// be disabled by setting the 'active' flag to false before a game type is active/live.





// Retrieve full 'game meta' information based on the key passed in
// Arguments(game_key) [String] - eg. 'dnd_5e'
// Returns gameMeta Object
module.exports.gameMeta = function(game_key){
  var game_meta = require('./' + game_key).gameMeta();
  return game_meta;
};



// returns [Object]
// Returns and array of objects containing a pruned subset of information about a given game type
// (key, long_name, short_name) - This can be expanded later if needed
module.exports.gameTypes = function(){
  var gameMeta = require('./meta').gameMeta;
  var game_list = ['dnd_5e']; // Harded coded list of string matching meta filename
  var game_type_data = {};

  game_list.forEach(function(game_key){
    var full_game_data = gameMeta(game_key); // Entire game meta

    if (full_game_data.active != false){
      game_type_data[game_key] = {
        key: game_key,
        short_name: full_game_data.short_name,
        long_name: full_game_data.long_name,
      };
    };
  });
  return game_type_data; // Just return the subset
};
