var fb_data = require('firebase').database();

// Generates a random campaign key for other users to join to campaigns
module.exports.campaignKeyGenerator = function campaignKeyGenerator(){
  var words = [ "acid", "blade", "lights", "fire", "bolt", "light", "mending", "poison",
    "trap", "minor", "ray", "sacred", "flame", "pooky", "duck", "vicious", "mockery", "lime",
    "green", "blue", "black", "yellow", "purple", "maroon", "pink", "orange", "red", "white",
    "knight", "king", "queen", "squire", "charming", "hex", "magic", "missile", "spider", "owlbear",
    "deathly", "hallowed", "web", "beam", "power", "weird", "sheep", "monkey", "cow", "moose",
    "bear", "dragon", "serpent", "goblin", "naga", "orc", "elf", "dwarf", "halfing", "astral",
    "feeble", "druid", "ranger", "wizard", "cleric", "dreaming", "squirrel", "gnome", "badger",
    "dungeon", "priest", "skull", "mage", "cult", "bugbear", "evil", "noble", "team", "helm",
    "potion", "alchemy", "boots", "sword", "flying", "wand", "spark", "musical", "bard", "treasure",
    "dark", "ghoul", "undead", "war", "ruffian", "ambush", "pit", "tree", "forest", "cake", "ale",
    "bat", "wolf", "cat", "throbbing", "saucy", "lemon", "tomato", "mask"
  ];

  var w1 = words[Math.floor(Math.random()*words.length)];
  var w2 = words[Math.floor(Math.random()*words.length)];
  return (w1 + "-" + w2 + Math.floor(Math.random()*999)).toString();
};
