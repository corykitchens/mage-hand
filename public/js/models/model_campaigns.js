
// Define the Campaigns constructor
const Campaigns = function Campaigns(key) {
  // Set/override instance specific properties before we call BaseModel
  // eg. this.path = 'campaigns';
  // eg. this.customThing = 'omglol';

  this.owners = [];
  this.characters = [];

  this.onUpdate = function onUpdate(){
    const _this = this;

    Object.keys(_this.latestSnap.characters).forEach(function(push_key){
      if (push_key.split("_")[0] == "meta") { return; } // Skip meta stuff
      const characters_id = _this.latestSnap.characters[push_key].characters_id;

      _this.characters.push(new Characters(characters_id))
    });

  };

  BaseModel.call(this, key);
};

Campaigns.prototype = Object.create(BaseModel.prototype);
Campaigns.prototype.constructor = Campaigns;
console.log('Campaigns model loaded');
