requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    parsing: '../parsing'
  }
});

require(['parsing/lbc-parser', 'TreeModel']);

var parseExpression = function(expression) {
  return parser.parse(expression);
};

var expressionToAST = function(expression) {
  var TreeModel = require('TreeModel');

  var model = parser.parse(expression);
  var tree = new TreeModel();

  var root = tree.parse(model);
  return root;
};
