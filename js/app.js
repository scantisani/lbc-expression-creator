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

    case 'Connective':
      if (tree.argument.length === 0) {
        return '';
      } else if (tree.argument.length === 1) {
        return treeToLBC(tree.argument[0]);
      } else {
        var sentence = treeToLBC(tree.argument[0]);
        var symbol = (tree.operator.symbol === 'AND') ? '\u2227' : '\u2228';

        for (var i = 1; i < tree.argument.length; i++) {
          if (tree.argument[i].tag === 'Connective') {
            sentence += ' ' + symbol + ' (' + treeToLBC(tree.argument[i]) + ')';
          } else {
            sentence += ' ' + symbol + ' ' + treeToLBC(tree.argument[i]);
          }
        }

        return sentence;
      }
      break;

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
  return format(englishHelper(tree));
};

var englishHelper = function(tree) {
  switch (tree.tag) {
    case 'Expr1':
      if (isEmpty(tree.comparison)) {
        return (tree.temporal.modality === 'FUTURE') ? 'eventually,' : 'it is always the case that';
      } else {
        var species = tree.comparison.species;
        var temporal = englishHelper(tree.temporal);
        var operator = englishHelper(tree.comparison.operator);
        var argument = englishHelper(tree.comparison.argument);

        var sentence =  'the concentration of ' + species + ' is ' +
                        temporal + ' ' + operator + ' ' + argument;

        return sentence;
      }
      break;
      
    case 'Expr2':
      var species = tree.comparison.species;
      var temporal = englishHelper(tree.temporal);
      var operator = englishHelper(tree.comparison.operator);
      var argument = englishHelper(tree.comparison.argument);

      var sentence =  'the concentration of ' + species + ' is ' +
                      temporal + ' ' + operator + ' ' + argument;

      return sentence;

    case 'Expr3':
      var opString = (tree.operator.symbol === 'GT') ? 'rises to and stays above' : 'drops to and stays below';
      var sentence =  'the concentration of ' + tree.species + ' eventually ' +
                      opString + ' ' + englishHelper(tree.argument);

      return sentence;

    case 'Expr4':
      var start = tree.temporal.start;
      var end = tree.temporal.end;

      if (isEmpty(tree.comparison)) {
        var point = (tree.temporal.modality === 'FUTURE') ? 'some point' : 'all points';
        var inTime = (start === 0) ? ('before time ' + end) : ('between times ' + start + ' and ' + end);

        return 'At ' + point + ' ' + inTime + ',';

      } else {
        var species = tree.comparison.species;
        var operator = englishHelper(tree.comparison.operator);
        var argument = englishHelper(tree.comparison.argument);

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

        return sentence;
      }
      break;
      
    case 'Expr5':
      var sentence = '"' + tree.text + '" ' + englishHelper(tree.argument);

      return sentence;

    case 'Temporal':
      return (tree.modality === 'FUTURE') ? 'eventually' : 'always';

    case 'Concentration':
      return 'the concentration of ' + tree.species;

    case 'Comparison':
      return  'the concentration of ' + tree.species + ' is ' + englishHelper(tree.operator) +
              ' ' + englishHelper(tree.argument);

    case 'Arithmetic':
      // if we're chaining arithmetic blocks, add a comma in the translation
      if (tree.argument.tag === 'Arithmetic') {
        return  'the concentration of ' + tree.species + ', ' + englishHelper(tree.operator) +
                ' ' + englishHelper(tree.argument);
      } else {
        return  'the concentration of ' + tree.species + ' ' + englishHelper(tree.operator) +
                ' ' + englishHelper(tree.argument);
      }
      break;

    case 'Connective':
      var conjunction = (tree.operator.symbol === 'AND') ? 'and' : 'or';

      if (tree.argument.length === 0) {
        return '';
      } else if (tree.argument.length === 1) {
        return englishHelper(tree.argument[0]);
      } else if (tree.argument.length === 2) {
        return englishHelper(tree.argument[0]) + ' ' + conjunction + ' ' + englishHelper(tree.argument[1]);
      } else {
        var sentence = englishHelper(tree.argument[0]);

        for (var i = 1; i < tree.argument.length - 1; i++) {
          if (tree.argument[i].tag === 'Connective') {
            sentence += ', ' + conjunction + ' ' + englishHelper(tree.argument[i]);
          } else {
            sentence += ', ' + englishHelper(tree.argument[i]);
          }
        }

        sentence += ', ' + conjunction + ' ' + englishHelper(tree.argument[tree.argument.length - 1]);

        return sentence;
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
  // formattedSentence = formattedSentence + '.';

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

// takes two Blockly blocks and stacks them (block1 on top of block2)
var stackBlocks = function(block1, block2) {
  var connection1 = block1.nextConnection;
  var connection2 = block2.previousConnection;

  connection1.connect(connection2);
};

// takes two Blockly blocks, block1 (a C-shaped block) and block2 (a statement block)
// and connects block2's previousConnection to block1 via the connection specified in 'input'
var connectStatement = function(block1, block2, input) {
  var connection1 = block1.getInput(input).connection;
  var connection2 = block2.previousConnection;

  connection1.connect(connection2);
};

var isEmpty = function(tree) {
  return (Object.keys(tree).length === 0);
};
