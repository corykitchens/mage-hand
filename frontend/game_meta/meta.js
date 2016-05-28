// The meta documents are design to define character and game structure for drawing and
// maniuplating views related to a character of that 'game_type' - This contains the
// appropriate functions to fetch the appropriate game data depending on type

// Game meta information are stored in seperate files in this folder, and can be disabled
// by setting the 'active' flag to false before a rollout


// Returns and array of objects containing a pruned subset of information about the game
// (key, long_name, short_name) - This can be expanded later if needed
module.exports.gameTypes = function(name_type){
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


// Retrieve game meta based on game meta key/failname
module.exports.gameMeta = function(game_key){
  var game_meta = require('./' + game_key).gameMeta();
  return game_meta;
};
