import Backbone from 'backbone';

/**
 * Represents data of single tree node
 */
let TreeNodeModel = Backbone.Model.extend({

  defaults: {
    name: 'Untitled',
    left: 0,
    right: 0
  },


  validate: function( attrs ){
    if ( ! attrs.left || ! attrs.right ){
      return "Required fields aren't provided";
    }

    if ( attrs.left > attrs.right ){
      return "'right' cannot be less than 'left'";
    }
  }
});

export default Backbone.Collection.extend({
  model: TreeNodeModel
});