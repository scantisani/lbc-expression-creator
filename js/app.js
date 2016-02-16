var treeToLBC = function(tree) {
  switch (tree.tag) {
    case 'Expr1':
      return treeToLBC(tree.temporal) + '(' + treeToLBC(tree.comparison) + ')';

    case 'Expr2':
      return treeToLBC(tree.temporal) + '(' + treeToLBC(tree.comparison) + ')';

    case 'Expr3':
      return  'F(G([' + tree.species + '] ' +
              treeToLBC(tree.operator) + ' ' + treeToLBC(tree.argument) + '))';

    case 'Expr4':
      return treeToLBC(tree.temporal) + '(' + treeToLBC(tree.comparison) + ')';

    case 'Expr5':
      return '"' + tree.text + '" ' + treeToLBC(tree.argument);

    case 'Temporal':
      return (tree.modality === 'FUTURE') ? 'F' : 'G';

    case 'TemporalInterval':
      var modality = (tree.modality === 'FUTURE') ? 'F' : 'G';

      return modality + '{' + tree.start  + ', ' + tree.end + '}';

    case 'Comparison':
      return '[' + tree.species + ']' + ' ' + treeToLBC(tree.operator) + ' ' + treeToLBC(tree.argument);

    case 'Arithmetic':
      return '([' + tree.species + ']' + ' ' + treeToLBC(tree.operator) + ' ' + treeToLBC(tree.argument) + ')';

    case 'Comment':
      return '"' + tree.text + '"';

    case 'Real':
      return tree.number;

    case 'Concentration':
      return '[' + tree.species + ']';

    case 'ComparisonOp':
      switch(tree.symbol) {
        case 'GT':
          return '>';
        case 'LT':
          return '<';
        case 'EQ':
          return '=';
        case 'NEQ':
          return '!=';
      }
      break;

    case 'ArithOp':
      switch(tree.symbol) {
        case 'ADD':
          return '+';
        case 'SUBTRACT':
          return '-';
        case 'MULTIPLY':
          return '*';
        case 'DIVIDE':
          return '/';
      }
      break;

    default:
      return '';
  }
};

var treeToEnglish = function(tree) {
  switch (tree.tag) {
    case 'Expr1':
      if (isEmpty(tree.comparison)) {
        return (tree.temporal.modality === 'FUTURE') ? 'Eventually,' : 'It is always the case that';
      } else {
        var species = tree.comparison.species;
        var temporal = treeToEnglish(tree.temporal);
        var operator = treeToEnglish(tree.comparison.operator);
        var argument = treeToEnglish(tree.comparison.argument);

        var sentence =  'the concentration of ' + species + ' is ' +
                        temporal + ' ' + operator + ' ' + argument;

        return format(sentence);
      }
      break;
      
    case 'Expr2':
      var species = tree.comparison.species;
      var temporal = treeToEnglish(tree.temporal);
      var operator = treeToEnglish(tree.comparison.operator);
      var argument = treeToEnglish(tree.comparison.argument);

      var sentence =  'the concentration of ' + species + ' is ' +
                      temporal + ' ' + operator + ' ' + argument;

      return format(sentence);

    case 'Expr3':
      var opString = (tree.operator.symbol === 'GT') ? 'rises to and stays above' : 'drops to and stays below';
      var sentence =  'the concentration of ' + tree.species + ' eventually ' +
                      opString + ' ' + treeToEnglish(tree.argument);

      return format(sentence);

    case 'Expr4':
      var start = tree.temporal.start;
      var end = tree.temporal.end;

      if (isEmpty(tree.comparison)) {
        var point = (tree.temporal.modality === 'FUTURE') ? 'some point' : 'all points';
        var inTime = (start === 0) ? ('before time ' + end) : ('between times ' + start + ' and ' + end);

        return 'At ' + point + ' ' + inTime + ',';

      } else {
        var species = tree.comparison.species;
        var operator = treeToEnglish(tree.comparison.operator);
        var argument = treeToEnglish(tree.comparison.argument);

        var inTime = (start === 0) ? ('before time ' + end) : ('between times ' + start + ' and ' + end);

        if (tree.temporal.modality === 'FUTURE') {
          var sentence =  'at some point ' + inTime +
                          ', the concentration of ' + species + ' is ' +
                          operator + ' ' + argument;
        } else {
          var sentence =  inTime +
                          ', the concentration of ' + species + ' is always ' +
                          operator + ' ' + argument;
        }

        return format(sentence);
      }
      break;
      
    case 'Expr5':
      var sentence = '"' + tree.text + '" ' + treeToEnglish(tree.argument);

      return format(sentence);

    case 'Temporal':
      return (tree.modality === 'FUTURE') ? 'eventually' : 'always';

    case 'Concentration':
      return 'the concentration of ' + tree.species;

    case 'Comparison':
      return  'the concentration of ' + tree.species + ' is ' + treeToEnglish(tree.operator) +
              ' ' + treeToEnglish(tree.argument);

    case 'Arithmetic':
      // if we're chaining arithmetic blocks, add a comma in the translation
      if (tree.argument.tag === 'Arithmetic') {
        return  'the concentration of ' + tree.species + ', ' + treeToEnglish(tree.operator) +
                ' ' + treeToEnglish(tree.argument);
      } else {
        return  'the concentration of ' + tree.species + ' ' + treeToEnglish(tree.operator) +
                ' ' + treeToEnglish(tree.argument);
      }
      break;

    case 'Real':
      return tree.number;

    case 'Comment':
      return '"' + tree.text + '"';

    case 'ComparisonOp':
      switch(tree.symbol) {
        case 'GT':
          return 'greater than';
        case 'LT':
          return 'less than';
        case 'EQ':
          return 'equal to';
        case 'NEQ':
          return 'not equal to';
      }
      break;

    case 'ArithOp':
      switch(tree.symbol) {
        case 'ADD':
          return 'plus';
        case 'SUBTRACT':
          return 'minus';
        case 'MULTIPLY':
          return 'multiplied by';
        case 'DIVIDE':
          return 'divided by';
      }
      break;

    default:
      return '';
  }
};

var format = function(sentence) {
  // Capitalize the first letter of the sentence
  var formattedSentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  // Add a full stop at the end of the sentence
  formattedSentence = formattedSentence + '.';

  return formattedSentence;
};

// takes the Blockly workspace, extracts the code string it generates from the blocks,
// removes trailing semicolon (if present), and returns it as a JSON object
var workspaceToObject = function(workspace) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);

  // remove any trailing whitespace
  code = code.trim();
  // if the code string has a semicolon appended, we need to remove it
  // before we parse it as JSON
  if (code.endsWith(';')) {
    code = code.slice(0, code.length - 1);
  }

  return JSON.parse(code);
};

// takes a Blockly block, extracts the code string it generates,
// and returns it as a JSON object
var blockToObject = function(block) {
  var code;

  if (block.nextConnection !== null && block.previousConnection !== null) {
    // if the block is a statement block (i.e. it has top and bottom connectors)
    // blockToCode returns a single element
    code = Blockly.JavaScript.blockToCode(block);
  } else {
    // if the block is a regular block, blockToCode returns two elements,
    // the second of which (operator precedence) we ignore 
    code = Blockly.JavaScript.blockToCode(block)[0];
  }

  return JSON.parse(code);
};

// takes two Blockly blocks and connects them via the connection specified in 'input'
var connectBlocks = function(block1, block2, input) {
  var connection1 = block1.getInput(input).connection;
  var connection2 = block2.outputConnection;

  connection1.connect(connection2);
};

var isEmpty = function(tree) {
  return (Object.keys(tree).length === 0);
};
