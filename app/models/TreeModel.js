import Backbone from 'backbone';


let TreeNodeModel = Backbone.Model.extend({

  defaults: {
    name: 'Untitled',
    left: 0,
    right: 0
  }
});


export default Backbone.Collection.extend({
  model: TreeNodeModel
});