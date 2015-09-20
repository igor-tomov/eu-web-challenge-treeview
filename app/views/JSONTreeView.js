import Backbone from 'backbone';
import utils from '../utils';



export default Backbone.View.extend({
  el: '#json-tree-view',

  events: {
    'input': 'onInputChange'
  },

  TEXT_INPUT_SELECTOR: '.json-placeholder',
  INVALID_CONTENT_CLASS: 'panel-danger',



  initialize: function( options ){
    if ( options.bootJSON ){
      this.$el
          .find( this.TEXT_INPUT_SELECTOR )
          .val( JSON.stringify( options.bootJSON ) )
          .trigger("input");
    }
  },



  onInputChange: function( event ){
    this.updateTree( event.target.value );
  },


  /**
   * Update model state according to updated input data
   *
   * @param {String} content
   */
  updateTree: function( content ){
    this.$el.removeClass( this.INVALID_CONTENT_CLASS );

    if ( ! content ){
      this.model.reset();
      return;
    }

    utils.parseJSON( content )
         .then(
            json   => this.model.reset( json, { validate: true } ),
            reason => {
              this.$el.addClass( this.INVALID_CONTENT_CLASS );
              this.model.reset();
            }
          );
  }
});