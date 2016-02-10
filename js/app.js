var treeToLBC = function(tree) {
  switch (tree.tag) {
    case 'Expr1':
      var temp = tree.children[0];
      var comp = tree.children[1];
      return treeToLBC(temp) + '(' + treeToLBC(comp) + ')';
    case 'Expr2':
      var temp = tree.children[0];
      var comp = tree.children[1];
      return treeToLBC(temp) + '(' + treeToLBC(comp) + ')';
    case 'Expr3':
      var concentration = tree.children[0];
      var operator = tree.children[1];
      var value = tree.children[2];
      return  'F(G(' + treeToLBC(concentration) + ' ' +
              operator.value + ' ' + treeToLBC(value) + '))';
    case 'Expr4':
      var temp = tree.children[0];
      var comp = tree.children[1];
      return treeToLBC(temp) + '(' + treeToLBC(comp) + ')';
    case 'Expr5':
      var temp = tree.children[0];
      var comp = tree.children[1];
      return treeToLBC(temp) + '(' + treeToLBC(comp) + ')';
    case 'Expr6':
      var comment = tree.children[0];
      var subExpression = tree.children[1];
      return treeToLBC(comment) + ' ' + treeToLBC(subExpression);
    case 'Temporal':
      return treeToLBC(tree.children[0]);
    case 'TemporalInterval':
      var modality = tree.children[0];
      var start = tree.children[1];
      var end = tree.children[2];

      return treeToLBC(modality) + '{' + start.value  + ', ' + end.value + '}';
    case 'Global':
      return 'G';
    case 'Future':
      return 'F';
    case 'ComparisonOp':
      return tree.value;
    case 'ArithOperator':
      return tree.value;
    case 'Comparison':
      var value1 = tree.children[0];
      var operator = tree.children[1];
      var value2 = tree.children[2];
      return treeToLBC(value1) + ' ' + treeToLBC(operator) + ' ' + treeToLBC(value2);
    case 'Arithmetic':
      var value1 = tree.children[0];
      var operator = tree.children[1];
      var value2 = tree.children[2];

      return '(' + treeToLBC(value1) + ' ' + treeToLBC(operator) + ' ' + treeToLBC(value2) + ')';
    case 'Concentration':
      return '[' + tree.value + ']';
    case 'Real':
      return tree.value;
    case 'Comment':
      return '"' + tree.value + '"';
    default:
      return '';
  }
};

var treeToEnglish = function(tree) {
  switch (tree.tag) {
    case 'Expr1':
      var temp = tree.children[0];
      var comp = tree.children[1];

      var concentration = comp.children[0];
      var operator = comp.children[1];
      var value = comp.children[2];

      var sentence =  treeToEnglish(concentration) + ' is ' +
                      treeToEnglish(temp) + ' ' + treeToEnglish(operator) +
                      ' ' + treeToEnglish(value);

      return format(sentence);
    case 'Expr2':
      var temp = tree.children[0];
      var comp = tree.children[1];

      var concentration = comp.children[0];
      var operator = comp.children[1];
      var value = comp.children[2];

      var sentence =  treeToEnglish(concentration) + ' is ' +
                      treeToEnglish(temp) + ' ' + treeToEnglish(operator) +
                      ' ' + treeToEnglish(value);

      return format(sentence);
    case 'Expr3':
      var concentration = tree.children[0];
      var operator = tree.children[1];
      var value = tree.children[2];

      var opString = (operator.value === '>') ? 'rises to and stays above' : 'drops to and stays below';
      var sentence =  treeToEnglish(concentration) + ' eventually ' +
                      opString + ' ' + treeToEnglish(value);

      return format(sentence);
    case 'Expr4':
      var temp = tree.children[0];
      var comp = tree.children[1];

      var modality = temp.children[0];
      var start = temp.children[1];
      var end = temp.children[2];
      var concentration = comp.children[0];
      var operator = comp.children[1];
      var value = comp.children[2];

      if (modality.tag === 'Future') {
        var sentence =  'At some point between times ' + start.value + ' and ' + end.value +
                        ', ' + treeToEnglish(concentration) + ' is ' +
                        treeToEnglish(operator) + ' ' + treeToEnglish(value);
      } else {
        var sentence =  'Between times ' + start.value + ' and ' + end.value +
                        ', ' + treeToEnglish(concentration) + ' is always ' +
                        treeToEnglish(operator) + ' ' + treeToEnglish(value);
      }

      return format(sentence);
    case 'Expr5':
      var temp = tree.children[0];
      var comp = tree.children[1];

      var modality = temp.children[0];
      var end = temp.children[2];
      var concentration = comp.children[0];
      var operator = comp.children[1];
      var value = comp.children[2];

      if (modality.tag === 'Future') {
        var sentence =  'At some point before time ' + end.value +
                        ', ' + treeToEnglish(concentration) + ' is ' +
                        treeToEnglish(operator) + ' ' + treeToEnglish(value);
      } else {
        var sentence =  'Before time ' + end.value +
                        ', ' + treeToEnglish(concentration) + ' is always ' +
                        treeToEnglish(operator) + ' ' + treeToEnglish(value);
      }

      return format(sentence);
    case 'Expr6':
      var comment = tree.children[0];
      var subExpression = tree.children[1];

      var sentence = treeToEnglish(comment) + ' ' + treeToEnglish(subExpression);

      return format(sentence);
    case 'Future':
      return 'eventually';
    case 'Global':
      return 'always';
    case 'Concentration':
      return 'the concentration of ' + tree.value;
    case 'Comparison':
      var concentration = tree.children[0];
      var operator = tree.children[1];
      var value = tree.children[2];

      return  treeToEnglish(concentration) + ' is ' + treeToEnglish(operator) +
              ' ' + treeToEnglish(value);
    case 'ComparisonOp':
      switch (tree.value) {
        case '>':
          return 'greater than';
        case '<':
          return 'less than';
        case '=':
          return 'equal to';
        case '!=':
          return 'not equal to';
        default:
          return '';
      }
      break;
    case 'Arithmetic':
      var concentration = tree.children[0];
      var operator = tree.children[1];
      var value = tree.children[2];

      if (value.tag === 'Arithmetic') {
        return treeToEnglish(concentration) + ', ' + treeToEnglish(operator) + ' ' + treeToEnglish(value);
      } else {
        return treeToEnglish(concentration) + ' ' + treeToEnglish(operator) + ' ' + treeToEnglish(value);
      }
      break;
    case 'ArithOperator':
      switch (tree.value) {
        case '+':
          return 'plus';
        case '-':
          return 'minus';
        case '*':
          return 'multiplied by';
        case '/':
          return 'divided by';
        default:
          return '';
      }
      break;
    case 'Real':
      return tree.value;
    case 'Comment':
      return '"' + tree.value + '"';
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
  var code = Blockly.JavaScript.blockToCode(block)[0];

  return JSON.parse(code);
};

// takes two Blockly blocks and connects them via the connection specified in 'input'
var connectBlocks = function(block1, block2, input) {
  var connection1 = block1.getInput(input).connection;
  var connection2 = block2.outputConnection;

  connection1.connect(connection2);
};
