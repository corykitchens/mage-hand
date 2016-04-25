
// Define the Campaigns constructor
const Campaigns = function Campaigns(key) {
  // Set/override instance specific properties before we call BaseModel
  // eg. this.path = 'campaigns';
  // eg. this.customThing = 'omglol';

  this.characters_rendered = [];

  this.afterOnce = function afterOnce(){
    var _this = this;
    console.log(this.characters);

    this.characters.forEach(function(character){
      if (_this.characters_rendered.includes(character) === false) {

        const $template = $(".campaign-character.js-template");
        var $node = $template.first().clone();
        $node.removeClass("js-template");
        $node.find(".character-name").text(character.name);

        $(".campaign-characters").append($node);
        _this.characters_rendered.push(character);
      };

    });



    // $(".character-new").remove();
    //
    // var $lol = $(".campaign-character.js-template").clone();
    // $lol.removeClass("js-template")
    // $lol.addClass("character-new");
    //
    // this.characters.forEach(function(character){
    //   debugger;
    //   $lol.find(".character-name").text(character.name);
    // });
    //
    // $(".campaign-characters").append($lol);

  };

  BaseModel.call(this, key);
};

Campaigns.prototype = Object.create(BaseModel.prototype);
Campaigns.prototype.constructor = Campaigns;
console.log('Campaigns model loaded');
