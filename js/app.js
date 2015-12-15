var parseExpression = function(expression) {
  return parser.parse(expression);
};

var treeToLBC = function(tree) {
  switch (tree.tag) {
    case 'TempComp':
      var temp = tree.children[0];
      var comp = tree.children[1];
      return treeToLBC(temp) + '(' + treeToLBC(comp) + ')';
    case 'TempMidComp':
      var temp = tree.children[0];
      var comp = tree.children[1];
      return treeToLBC(temp) + '(' + treeToLBC(comp) + ')';
    case 'FGComp':
      var species = tree.children[0];
      var op = tree.children[1];
      var value = tree.children[2];
      return  'F(G([' + species.value + '] ' +
              op.value + ' ' + treeToLBC(value) + '))';
    case 'Temporal':
      return treeToLBC(tree.children[0]);
    case 'Global':
      return 'G';
    case 'Future':
      return 'F';
    case 'Comparison_Op':
      return tree.value;
    case 'Comparison':
      var v1 = tree.children[0];
      var op = tree.children[1];
      var v2 = tree.children[2];
      return treeToLBC(v1) + ' ' + treeToLBC(op) + ' ' + treeToLBC(v2);
    case 'Concentration':
      return '[' + tree.value + ']';
    case 'Real':
      return tree.value;
    default:
      return '';
  }
};

var expressionToLBC = function(expression) {
  var tree = parseExpression(expression);
  return treeToLBC(tree);
};
