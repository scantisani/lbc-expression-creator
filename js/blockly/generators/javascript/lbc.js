/**
 * @fileoverview Generating JavaScript for LBC blocks.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.JavaScript.lbc');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['lbc_concentration'] = function(block) {
  var species = block.getFieldValue('SPECIES');
  var code = JSON.stringify({
    tag: 'Concentration',
    value: species
  });
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_future'] = function(block) {
  var expression = Blockly.JavaScript.valueToCode(block, 'EXPRESSION', Blockly.JavaScript.ORDER_NONE);
  var code = '{' +
    '"tag": "TempComp",' +
    '"children": [' +
      '{"tag": "Future"},' +
      expression +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_global'] = function(block) {
  var expression = Blockly.JavaScript.valueToCode(block, 'EXPRESSION', Blockly.JavaScript.ORDER_NONE);
  var code = '{' +
    '"tag": "TempComp",' +
    '"children": [' +
      '{"tag": "Global"},' +
      expression +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '=',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };

  var species = block.getFieldValue('SPECIES');
  var operator = block.getFieldValue('OP');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '';

  var comparison = OPERATORS[operator];

  var code = '{' +
    '"tag": "Comparison",' +
    '"children": [' +
      '{"tag": "Concentration", "value": "' + species + '"},' +
      '{"tag": "ComparisonOp", "value": "' + comparison + '"},' +
      value +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_temporal_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '=',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };

  var TEMP_MODALITIES = {
    'F': 'Future',
    'G': 'Global'
  };

  var species = block.getFieldValue('SPECIES');
  var operator = block.getFieldValue('OP');
  var temporal = block.getFieldValue('TEMP');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '';

  operator = OPERATORS[operator];
  temporal = TEMP_MODALITIES[temporal];

  var code = '{' +
    '"tag": "TempMidComp",' +
    '"children": [' +
      '{"tag": "' + temporal + '"},' +
      '{"tag": "Comparison",' +
        '"children": [' +
          '{"tag": "Concentration", "value": "' + species + '"},' +
          '{"tag": "ComparisonOp", "value": "' + operator + '"},' +
          value +
      ']}' +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_real'] = function(block) {
  var num = block.getFieldValue('NUM');
  var code = '{"tag": "Real", "value": "' + num + '"}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_fg_compare'] = function(block) {
  var OPERATORS = {
    'LT': '<',
    'GT': '>',
  };

  var operator = block.getFieldValue('OP');
  operator = OPERATORS[operator];
  var species = block.getFieldValue('SPECIES');

  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '';

  var code = '{' +
    '"tag": "FGComp",' +
    '"children": [' +
      '{"tag": "Concentration",' +
      '"value": "' + species + '"},' +
      '{"tag": "ComparisonOp",' +
      '"value": "' + operator + '"},' +
      value +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
