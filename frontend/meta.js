// Define character structure for different formats here

// Returns array of supported game types
module.exports.gameTypes = function(name_type){
  var game_types = Object.keys(game_meta).map(function(key){
    if (game_meta[key].active == true){
      return {

        key_name: key,
        short_name: game_meta[key].short_name,
        long_name: game_meta[key].long_name
      }
    };
  });
  return game_types.filter(Boolean); // Remove empties - might be a way to use filter above?
};


module.exports.gameMeta = function(game_key){
  return game_meta[game_key];
};

// Character forms are built out using :below meta information
// To add a new game type, a meta structure will need to be built out, in addition
// to a view cooresponding wi:that structure.
var game_meta = {
  dnd_5e: {
    active: true,
    long_name: 'Dungeons and Dragons: 5th Edition',
    short_name: 'D&D 5E',

    character_structure: {
      name: 'text',
      age: 'text',
      experience: 'number',
      height: 'text',
      hit_points: 'number',
      sex: 'text',

      str: 'number',
      dex: 'number',
      con: 'number',
      int: 'number',
      wis: 'number',
      cha: 'number',

      alignment: {
        options: [
        'Lawful Good', 'Neutral Good', 'Chaotic Good',
        'Lawful Neutral', 'Neutral', 'Chaotic Neutral',
        'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
      ]},

      classes: {
        fighter: {
          hit_die: "1d10 per fighter level",
          hit_points_starting: "10+con",
          hit_points_after: "1d10 (or 6) + your Constitution modifier per fighter level after 1st",
          proficiencies: {
            armor: 'All armor, shields',
            weapons: 'Simple weapons and martial weapons',
            tools: 'None',
            saving_throws: 'Strength, Constitution',
          },
          skill_count: 2,
          skills: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Perception', 'Survival']
        },
        cleric: {
          hit_die: "1d8 per cleric level",
          hit_points_starting: "8+con",
          hit_points_after: "1d8 (or 4) + your Constitution modifier per cleric level after 1st",
          proficiencies: {
            armor: 'Light armor, medium armor, shields',
            weapons: 'All simple weapons',
            tools: 'None',
            saving_throws: 'Wisdom, Charisma',
          },
          skill_count: 2,
          skills: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion']
        }
      },

      races: {
        dwarf: {
          description: "Dwarfs are small",
          traits: [
            {label: "Ability Score Increase", description: "Your Constitution score increases by 2"},
            {label: "Darkvision", description: "You can see in dim light. Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray."},
            {label: "Dwarven Resilience", description: "You have advantage on saving throws against poison and resistance against poison damage."},
            {label: "Dwarven Combat Training", description: "You have proficiency with the battleaxe, handaxe, throwing hammer, and warhammer."},
            {label: "Stonecunning", description: "Double your proficiency bonus when making history skill checks related to the origin of stonework and you are considered proficient in history for such checks."},
            {label: "Speed", description: "Your speed is not reduced by heavy armor."}
          ],
          facts: [
            {label: "Age", description: "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years."},
            {label: "Alignment", description: "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order."},
            {label: "Size", description: "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium."},
          ]
        },
        human: {
          description: "Humans are boring",
          traits: ["Human traits go here.", "another trait"],
        },
      },

      skills: {
        acrobatics: {
          name: 'Acrobatics' ,
          stat: 'dex'
        },
        animal_hanling: {
          name: 'Animal Handling',
          stat: 'wis'
        },
        arcana: {
          name: 'Arcana',
          stat: 'wis'
        },
        athletics: {
          name: 'Athletics',
          stat: 'wis'
        },
        deception: {
          name: 'Deception',
          stat: 'wis'
        },
        history: {
          name: 'History',
          stat: 'wis'
        },
        insight: {
          name: 'Insight',
          stat: 'wis'
        },
        intimidation: {
          name: 'Intimidation',
          stat: 'wis'
        },
        investigation: {
          name: 'Investigation',
          stat: 'wis'
        },
        medicine: {
          name: 'Medicine',
          stat: 'wis'
        },
        nature: {
          name: 'Nature',
          stat: 'wis'
        },
        perception: {
          name: 'Perception',
          stat: 'wis'
        },
        performance: {
          name: 'Performance',
          stat: 'wis'
        },
        persuasion: {
          name: 'Persuasion',
          stat: 'wis'
        },
        religion: {
          name: 'Religion',
          stat: 'wis'
        },
        sleight_of_hand: {
          name: 'Sleight of Hand',
          stat: 'wis'
        },
        stealth: {
          name: 'Stealth',
          stat: 'wis'
        },
        survival: {
          name: 'Survival',
          stat: 'wis'
        }
      },

    },

    level_progression: { //TODO these numbers probably aren't right
      1: 300,
      2: 600,
      3: 1800,
      4: 3800,
      5: 7500,
      6: 9000,
      7: 11000,
      8: 14000,
      9: 16000,
      10: 21000,
      11: 15000,
      12: 20000,
      13: 20000,
      14: 25000,
      15: 30000,
      16: 30000,
      17: 40000,
      18: 40000,
      19: 50000,
    }, // http://www.enworld.org/forum/showthread.php?367079-5e-XP-Chart-Progression-Question&s=b74b6ad8f6216bc7f28c90cf06fcf862#ixzz47MrhUGYY

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



  dungeon_world: {
    long_name: 'Dungeon World',
    short_name: 'Dungeon World',
  }

};
