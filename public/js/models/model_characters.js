
// Characters belong to users which make accessing them directly problematic
// Ends up we just set path and pass in user_id?

const Characters = function Characters(key, user_id) {


  this.onUpdate = function onUpdate(){
    var _this = this;

    Object.keys(window.mage.characters).forEach(function(character_id){

      $("[data-sourcekey="+ character_id +"][data-model='characters']")
        .find("[data-source]")
        .each(function(ii, element){
          var $element = $(element);

          if ($element.is('input')){
            $element.val( _this.latestSnap[$element.data('source')] );
          } else {
            $element.text( _this.latestSnap[$element.data('source')] );
          };
        });
    });
    
  };

  BaseModel.call(this, key); // Call the parent constructor
};



Characters.prototype = Object.create(BaseModel.prototype);
Characters.prototype.constructor = Characters;
console.log('Characters model loaded');
