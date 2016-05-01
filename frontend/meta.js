// Define character structure for different formats here

// Returns array of supported game types
module.exports.gameTypes = function(name_type){
  // var game_types = ['dnd_5e', 'dungeon_world'];
  var game_types = Object.keys(game_meta);

  var gt = game_types.map(function(game_type){
    return {
      key_name: game_type,
      short_name: game_meta[game_type].short_name,
      long_name: game_meta[game_type].long_name
    }
  });
  return gt;
};


module.exports.gameMeta = function(game_key){
  return game_meta[game_key];
};


var game_meta = {
  dnd_5e: {
    long_name: 'Dungeons and Dragons: 5th Edition',
    short_name: 'D&D 5E',

    character_structure: {
      name: 'text',
      age: 'text',
      experience: 'number',
      height: 'text',
      hit_points: 'number',
      sex: 'text',

      alignment: [
        'Lawful Good',
        'Neutral Good',
        'Chaotic Good',
        'Lawful Neutral',
        'Neutral',
        'Chaotic Neutral',
        'Lawful Evil',
        'Neutral Evil',
        'Chaotic Evil'
      ],

      str: 'number',
      dex: 'number',
      con: 'number',
      int: 'number',
      wis: 'number',
      cha: 'number',


      classes: {
        fighter: {
          hit_die: "1d10",
          hit_points_starting: "10+con",
          hit_points_after: "1d10 (or 6) + your Constitution modifier per fighter level after 1st",
          proficiencies: {
            armor: 'All armor, shields',
            weapons: 'Simple weapons and martial weapons',
            tools: 'None',
            saving_throws: 'Strength, Constitution',
          },
          skills: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Perception', 'Survival']
        }
      },

      races: {
        dwarf: {
          description: "Dwarfs are small",
          traits: ["Dwarfs get +1 on a thing.", "Another trait"],
        },
        human: {
          description: "Humans are boring",
          traits: ["Human traits go here.", "another trait"],
        },
      },
    },

    default_character: {
      name: 'New Character',
      experience: 0,
      str: 15,
      dex: 14,
      con: 13,
      int: 12,
      wis: 10,
      cha: 8,
    }
  },



  // dungeon_world: {
  //   long_name: 'Dungeon World',
  //   short_name: 'Dungeon World',
  // }

};
