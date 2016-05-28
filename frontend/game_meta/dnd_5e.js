// DND 5E Game meta information
// This structure is used to determine field types and skill/spell/attribute
// data when creating and viewing a character of this game type

module.exports.gameMeta = function gameMeta(){
  var game_meta = {
    active: true,
    long_name: 'Dungeons and Dragons: 5th Edition',
    short_name: 'D&D 5E',
    rules_url: 'http://dnd.wizards.com/products/tabletop/players-basic-rules',

    character_structure: {
      name: 'text',
      age: 'text',
      experience: 'number',
      height: 'text',
      current_hp: 'number',
      temporary_hp: 'number',
      max_hp: 'number',
      sex: 'text',
      languages: 'text',

      stats: {
        str: 'number',
        dex: 'number',
        con: 'number',
        int: 'number',
        wis: 'number',
        cha: 'number',
      },

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
            Armor: 'All armor, shields',
            Weapons: 'Simple weapons and martial weapons',
            Tools: 'None',
            Saving_Throws: 'Strength, Constitution',
          },
          skill_count: 2,
          skills: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Perception', 'Survival']
        },
        rogue: {
          hit_die: "1d18 per rogue level",
          hit_points_starting: "8+con",
          hit_points_after: "1d8 (or 5) + your Constitution modifier per rogue level after 1st",
          proficiencies: {
            Armor: 'Light armor',
            Weapons: 'Simple weapons, hand crossbows, longswords, rapiers, shortswords',
            Tools: 'Thieves’ tools',
            Saving_Throws: 'Dexterity, Intelligence',
          },
          skill_count: 4,
          skills: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation',
                   'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth']
        },
        cleric: {
          hit_die: "1d8 per cleric level",
          hit_points_starting: "8+con",
          hit_points_after: "1d8 (or 5) + your Constitution modifier per cleric level after 1st",
          proficiencies: {
            Armor: 'Light armor, medium armor, shields',
            Weapons: 'All simple weapons',
            Tools: 'None',
            Saving_Throws: 'Wisdom, Charisma',
          },
          skill_count: 2,
          skills: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
          spell_casting: true,
        },
        wizard: {
          hit_die: "1d6 per wizard level",
          hit_points_starting: "6+con",
          hit_points_after: "1d6 (or 4) + your Constitution modifier per wizard level after 1st",
          proficiencies: {
            Armor: 'None',
            Weapons: 'Daggers, darts, slings, quarterstaffs, light crossbows',
            Tools: 'None',
            Saving_Throws: 'Wisdom, Intelligence',
          },
          skill_count: 2,
          skills: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
          spell_casting: true,
        },
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
            {label: "Speed", description: "Your speed is not reduced by heavy armor."},
            {label: "Language", description: "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak."}
          ],
          facts: [
            {label: "Age", description: "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years."},
            {label: "Alignment", description: "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order."},
            {label: "Size", description: "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium."},
          ]
        },
        human: {
          description: "Humans are boring",
          traits: [
            {label: "Ability Score Increase", description: "Your ability scores each increase by 1."},
            {label: "Language", description: "Languages: You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on."}
          ],
          facts: [
            {label: "Age", description: "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50."},
            {label: "Alignment", description: "Humans tend toward no particular alignment. The best and the worst are found among them."},
            {label: "Size", description: "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium."},
            {label: "Speed", description: "Your base walking speed is 30 feet."},
          ]
        },
        elf: {
          description: "Elves",
          traits: [
            {label: "Ability Score Increase", description: "Your Dexterity score increases by 2."},
            {label: "Darkvision", description: "You can see in dim light. Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray."},
            {label: "Keen Senses", description: "You have proficiency in the Perception skill."},
            {label: "Fey Ancestry", description: "You have advantage on saving throws against being charmed, and magic can’t put you to sleep."},
            {label: "Trance", description: "Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. While meditating (in trance), you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep."},
            {label: "Language", description: "You can speak, read, and write Common and Elvish."},
          ],
          facts: [
            {label: "Age", description: "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old."},
            {label: "Alignment", description: "Elves love freedom, variety, and self- expression, so they lean bly toward the gentler aspects of chaos. They value and protect others’ freedom as well as their own, and they are more often good than not."},
            {label: "Size", description: "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium."},
          ]
        },
        halfling: {
          description: "Halflings",
          traits: [
            {label: "Ability Score Increase", description: "Your Dexterity score increases by 2."},
            {label: "Halfling Nimbleness", description: "You can move through the space of any creature that is of a size larger than yours."},
            {label: "Brave", description: "You have advantage on saving throws against being frightened."},
            {label: "Lucky", description: "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll."},
            {label: "Language", description: "You can speak, read, and write Common and Halfling. The Halfling language isn’t secret, but halflings are loath to share it with others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling."},
          ],
          facts: [
            {label: "Age", description: "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century."},
            {label: "Alignment", description: "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways."},
            {label: "Size", description: "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small."},
            {label: "Speed", description: "Your base walking speed is 25 feet."},
          ]
        },
      },


      skills: {
        acrobatics: {
          name: 'Acrobatics',
          stat: 'dex'
        },
        animal_handling: {
          name: 'Animal Handling',
          stat: 'wis'
        },
        arcana: {
          name: 'Arcana',
          stat: 'int'
        },
        athletics: {
          name: 'Athletics',
          stat: 'str'
        },
        deception: {
          name: 'Deception',
          stat: 'cha'
        },
        history: {
          name: 'History',
          stat: 'int'
        },
        insight: {
          name: 'Insight',
          stat: 'wis'
        },
        intimidation: {
          name: 'Intimidation',
          stat: 'chr'
        },
        investigation: {
          name: 'Investigation',
          stat: 'int'
        },
        medicine: {
          name: 'Medicine',
          stat: 'wis'
        },
        nature: {
          name: 'Nature',
          stat: 'int'
        },
        perception: {
          name: 'Perception',
          stat: 'wis'
        },
        performance: {
          name: 'Performance',
          stat: 'cha'
        },
        persuasion: {
          name: 'Persuasion',
          stat: 'wis'
        },
        religion: {
          name: 'Religion',
          stat: 'int'
        },
        sleight_of_hand: {
          name: 'Sleight of Hand',
          stat: 'dex'
        },
        stealth: {
          name: 'Stealth',
          stat: 'dex'
        },
        survival: {
          name: 'Survival',
          stat: 'wis'
        }
      },

      ability_modifiers: {
        1: "-5",
        2: "-4",
        3: "-4",
        4: "-3",
        5: "-3",
        6: "-2",
        7: "-2",
        8: "-1",
        9: "-1",
        10: "+0",
        11: "+0",
        12: "-1",
        13: "-1",
        14: "-2",
        15: "-2",
        16: "-3",
        17: "-3",
        18: "-4",
        19: "-4",
        20: "-5",
        21: "-5",
        22: "-6",
        23: "-6",
        24: "-7",
        25: "-7",
        26: "-8",
        27: "-8",
        28: "-9",
        29: "-9",
        30: '+10'
      }

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
      level: 1,
      race: 'dwarf',
      class: 'fighter',
      alignment: 'Neutral',
      proficiency_bonus: 2,
      background: {
        languages: 'Common',
      },
      stats: {
        str: 15,
        dex: 14,
        con: 13,
        int: 12,
        wis: 10,
        cha: 8,
      }
    },


    spells: {
      acid_splash: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "conjuration",
        components: "V, S",
        description: "",
        range: "60 feet",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. " +
        "A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
        subtext: "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
      },
      dancing_lights: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "evocation",
        components: "V, S, M (a bit of phosphorus or wychwood, or a glowworm)",
        description: "",
        range: "120 feet",
        casting_time: "1 action",
        duration: "Concentration, up to 1 minute",
        description: "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air " +
        "for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light " +
        "sheds dim light in a 10-foot radius.",
        subtext: "As a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another " +
        "light created by this spell, and a light winks out if it exceeds the spell’s range.",
      },
      fire_bolt: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "evocation",
        components: "V, S",
        description: "",
        range: "120 feet",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target " +
        "takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn’t being worn or carried.",
        subtext: "This spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
      },
      guidance: {
        level: 0,
        eligible_classes: ['cleric'],
        school: "divination",
        components: "V, S",
        range: "Touch",
        casting_time: "1 action",
        duration: "Concentration, up to 1 minute",
        description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check " +
        "of its choice. It can roll the die before or after making the ability check. The spell then ends.",
      },
      light: {
        level: 0,
        eligible_classes: ['cleric', 'wizard'],
        school: "evocation",
        components: "V, M (a firefly or phosphorescent moss)",
        range: "120 feet",
        casting_time: "1 action",
        duration: "1 hour",
        description:  "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot " +
        "radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the " +
        "light. The spell ends if you cast it again or dismiss it as an action.",
        subtext: "If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.",
      },
      mage_hand: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "conjuration",
        components: "V, S",
        range: "30 feet",
        casting_time: "1 action",
        duration: "1 minute",
        description: "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. " +
        "The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
        subtext:  "You can use your action to control the hand.You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve " +
        "an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it. The hand can’t attack, " +
        "activate magic items, or carry more than 10 pounds.",
      },
      minor_illusion: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "illusion",
        components: "S, M (a bit of fleece)",
        range: "30 feet",
        casting_time: "1 action",
        duration: "1 minute",
        description:  "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss " +
        "it as an action or cast this spell again. If you create a sound, its volume can range from a whisper to a scream. It can be your voice, " +
        "someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, " +
        "or you can make discrete sounds at different times before the spell ends.",
        subtext:  "If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5-foot cube. " +
        "The image can’t create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, " +
        "because things can pass through it. If a creature uses its action to examine the sound or image, the creature can determine that it is an " +
        "illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, " +
        "the illusion becomes faint to the creature.",
      },
      poison_spray: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "conjuration",
        components: "V, S",
        range: "10 feet",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. " +
        "The creature must succeed on a Constitution saving throw or take 1d12 poison damage.",
        subtext: "This spell’s damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
      },
      prestidigitation: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "conjuration",
        components: "V, S",
        range: "10 feet",
        casting_time: "1 action",
        duration: "Up to 1 hour",
        description:  "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:" +
        "You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor." +
        "You instantaneously light or snuff out a candle, a torch, or a small campfire." +
        "You instantaneously clean or soil an object no larger than 1 cubic foot." +
        "You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour." +
        "You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour." +
        "You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.",
        subtext: "If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
      },
      ray_of_frost: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "conjuration",
        components: "V, S",
        range: "60 feet",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, " +
        "and its speed is reduced by 10 feet until the start of your next turn.",
        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
      },
      resistance: {
        level: 0,
        eligible_classes: ['cleric'],
        school: "conjuration",
        components: "V, S, M (a miniature cloak)",
        range: "Touch",
        casting_time: "1 action",
        duration: "Concentration, up to 1 minute",
        description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll " +
        "the die before or after making the saving throw. The spell then ends.",
        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
      },
      sacred_flame: {
        level: 0,
        eligible_classes: ['cleric'],
        school: "evocation",
        components: "V, S",
        range: "60 feet",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The " +
        "target gains no benefit from cover for this saving throw.",
        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
      },
      shocking_grasp: {
        level: 0,
        eligible_classes: ['wizard'],
        school: "evocation",
        components: "V, S",
        range: "Touch",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack " +
        " roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.",
        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
      },
      spare_the_dying: {
        level: 0,
        eligible_classes: ['cleric'],
        school: "necromancy",
        components: "V, S",
        range: "Touch",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.",
      },
      thaumaturgy: {
        level: 0,
        eligible_classes: ['cleric'],
        school: "transmutation",
        components: "V",
        range: "30 feet",
        casting_time: "1 action",
        duration: "Up to 1 minute",
        description: "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range:" +
        "Your voice booms up to three times as loud as normal for 1 minute." +
        "You cause flames to flicker, brighten, dim, or change color for 1 minute." +
        "You cause harmless tremors in the ground for 1 minute." +
        "You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers." +
        "You instantaneously cause an unlocked door or window to fly open or slam shut." +
        "You alter the appearance of your eyes for 1 minute.",
        subtext: "If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time, and you can dismiss such an effect as an action.",
      },
      bless: {
        level: 1,
        eligible_classes: ['cleric'],
        school: "enchantment",
        components: "V, S, M (a sprinkling of holy water)",
        range: "30 ft",
        casting_time: "1 action",
        duration: "Concentration, up to 1 minute",
        description: "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.",
        subtext: "At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
      },
      burning_hands: {
        level: 1,
        eligible_classes: ['wizard'],
        school: "evocation",
        components: "V, S",
        range: "Self (15-foot cone)",
        casting_time: "1 action",
        duration: "Instantaneous",
        description: "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone " +
        "must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one." +
        "The fire ignites any flammable objects in the area that aren’t being worn or carried.",
        subtext: "At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
      },

    }
  };

  return game_meta;
};
