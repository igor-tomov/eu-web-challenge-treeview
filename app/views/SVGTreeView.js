import Backbone from 'backbone';
import SVG from 'svg.js'
import utils from '../utils';



export default Backbone.View.extend({

  el: '#svg-tree-view',



  initialize: function(){
    this.listenTo( this.model, "reset", this.onModelUpdate );
  },



  onModelUpdate: function(){
    this.render();
  },



  render: function(){
    let data = this.model.toJSON();

    // remove previous view state
    this.reset();

    if ( data && data.length ) {
      // render tree view according to current model data
      this.renderTree( data );
    }
  },



  renderTree: function( input ){
    // initialize SVG document
    var svg = SVG( this.el ).size( '100%', input.length * 30 );

    svg.addClass( 'svg-container' );

    // stack of right values
    var rightStack = [];

    // sort input data according to 'left' property
    input = input.sort( ( a, b ) => {
      if ( a.left < b.left ) return -1;
      if ( a.left > b.left ) return 1;
      return 0;
    });

    input.forEach( ( item, i ) => {
      if (rightStack.length) {
        while (rightStack[rightStack.length - 1] < item.right) {
          rightStack.pop();
        }
      }

      this.renderSVGRow( svg, item.name, rightStack.length, i );

      rightStack.push(item.right);
    });
  },


  renderSVGRow: function( doc, title, offsetCount, index ){
    let height = 25,
      offset = 25;

    if ( offsetCount ){
      let i = offsetCount;

      do{
        let x = i * offset - offset / 2,
            y = index * height;

        let path = doc.polyline( [[x, y], [x, y + height]] );

        if ( i === offsetCount ){
          doc.line( x, y + height / 2, Math.ceil( x + offset / 2 ), y + height / 2 )
             .addClass( "tree-view-branch" );
        }

        path.addClass( "tree-view-branch" );
      }while( --i );
    }

    doc.text( title )
       .addClass('tree-view-title')
       .dx( offset * offsetCount + 3 )
       .dy( index * height - 4 )
  },


  /**
   * Clear inner content of view
   */
  reset: function(){
    this.$el.empty();
  }
});