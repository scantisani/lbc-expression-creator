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
      var concentration = tree.children[0];
      var op = tree.children[1];
      var value = tree.children[2];
      return  'F(G(' + treeToLBC(concentration) + ' ' +
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

var treeToEnglish = function(tree) {
  switch (tree.tag) {
    case 'TempComp':
      var temp = tree.children[0];
      var comp = tree.children[1];

      var concentration = comp.children[0];
      var operator = comp.children[1];
      var value = comp.children[2];

      var sentence =  treeToEnglish(concentration) + ' is ' +
                      treeToEnglish(temp) + ' ' + treeToEnglish(operator) +
                      ' ' + treeToEnglish(value);

      return format(sentence);
    case 'TempMidComp':
      var temp = tree.children[0];
      var comp = tree.children[1];

      var concentration = comp.children[0];
      var operator = comp.children[1];
      var value = comp.children[2];

      var sentence =  treeToEnglish(concentration) + ' is ' +
                      treeToEnglish(temp) + ' ' + treeToEnglish(operator) +
                      ' ' + treeToEnglish(value);

      return format(sentence);
    case 'FGComp':
      var concentration = tree.children[0];
      var op = tree.children[1];
      var value = tree.children[2];

      var opString = (op.value === '>') ? 'rises to and stays above' : 'drops to and stays below';
      var sentence =  treeToEnglish(concentration) + ' eventually ' +
                      opString + ' ' + treeToEnglish(value);

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
    case 'Comparison_Op':
      switch (tree.value) {
        case '>':
          return 'greater than';
        case '>=':
          return 'greater than or equal to';
        case '<':
          return 'less than';
        case '<=':
          return 'less than or equal to';
        case '=':
          return 'equal to';
        case '!=':
          return 'not equal to';
        default:
          return '';
      }
      break;
    case 'Real':
      return tree.value;
    default:
      return '';
  }
};

var format = function(sentence) {
  // Capitalize the first letter of the sentence
  formattedSentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  // Add a full stop at the end of the sentence
  formattedSentence = formattedSentence + '.';

  return formattedSentence;
};
