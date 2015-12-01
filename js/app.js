requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    treehugger: 'treehugger/lib/treehugger'
  }
});

require(['treehugger/tree', 'treehugger/traverse']);

function translateToLBC(AST) {
  var transformedTree = AST.traverseTopDown(
      "Concentration(species)", function(node) {
        // remove surrounding quotation marks
        species = node.species.toString().slice(1, -1);
        return "[" + species + "]";
      },
      "Future(subTree)", function(node) {
        return "F(" + translateToLBC(node.subTree) + ")";
      },
      "Conditional(subTree)", function(node) {
        return node.subTree.traverseTopDown(
          "Equals(value1, value2)", function(node) {
            return translateToLBC(node.value1) + " = " + translateToLBC(node.value2);
          },
          "NotEquals(value1, value2)", function(node) {
            return translateToLBC(node.value1) + " != " + translateToLBC(node.value2);
          },
          "LessThan(value1, value2)", function(node) {
            return translateToLBC(node.value1) + " < " + translateToLBC(node.value2);
          },
          "LessThanEquals(value1, value2)", function(node) {
            return translateToLBC(node.value1) + " <= " + translateToLBC(node.value2);
          },
          "GreaterThan(value1, value2)", function(node) {
            return translateToLBC(node.value1) + " > " + translateToLBC(node.value2);
          },
          "GreaterThanEquals(value1, value2)", function(node) {
            return translateToLBC(node.value1) + " >= " + translateToLBC(node.value2);
          });
        }
      );

  return transformedTree.toString();
}
