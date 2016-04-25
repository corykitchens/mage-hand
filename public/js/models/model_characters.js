
// Characters belong to users which make accessing them directly problematic
// Ends up we just set path and pass in user_id?

const Characters = function Characters(key, user_id) {
  BaseModel.call(this, key); // Call the parent constructor
};

Characters.prototype = Object.create(BaseModel.prototype);
Characters.prototype.constructor = Characters;
console.log('Characters model loaded');
