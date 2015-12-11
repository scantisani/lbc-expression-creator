requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    parsing: '../parsing'
  }
});

require(['parsing/lbc-parser']);

var parseExpression = function(expression) {
  return parser.parse(expression);
};

var treeToLBC = function(tree) {
  switch (tree.tag) {
    case 'Expression':
      var temp = tree.children[0];
      var cond = tree.children[1];
      return treeToLBC(temp) + '(' + treeToLBC(cond) + ')';
    case 'Temporal':
      return treeToLBC(tree.children[0]);
    case 'Global':
      return 'G';
    case 'Future':
      return 'F';
    case 'Comparison_Op':
      return tree.children[0].tag;
    case 'Comparison':
      var v1 = tree.children[0];
      var op = tree.children[1];
      var v2 = tree.children[2];
      return treeToLBC(v1) + ' ' + treeToLBC(op) + ' ' + treeToLBC(v2);
    case 'Value':
      return treeToLBC(tree.children[0]);
    case 'Concentration':
      var species = tree.children[1];
      return '[' + treeToLBC(species) + ']';
    case 'Species':
      return tree.children[0].tag;
    case 'Real':
      return tree.children[0].tag;
    default:
      return '';
  }
};
