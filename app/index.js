/**
 * App entry point
 */
import TreeModel from './models/TreeModel';
import JSONTreeView from './views/JSONTreeView';
import SVGTreeView from './views/SVGTreeView';
import demo from './config/demo.json'



// init Tree model
var treeModel = new TreeModel;

// init views
new JSONTreeView({ model: treeModel, bootJSON: demo });
new SVGTreeView({ model: treeModel });
