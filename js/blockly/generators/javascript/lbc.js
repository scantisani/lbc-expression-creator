/**
 * @fileoverview Generating JavaScript for LBC blocks.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.JavaScript.lbc');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['lbc_concentration'] = function(block) {
  var species = block.getFieldValue('SPECIES');
  var code = '{' +
    '"tag": "Concentration",' +
    '"value": "' + species + '"' +
  '}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_future'] = function(block) {
  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  var code = '{' +
    '"tag": "Expr1",' +
    '"children": [' +
      '{"tag": "Future"},' +
      comparison +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_global'] = function(block) {
  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  var code = '{' +
    '"tag": "Expr1",' +
    '"children": [' +
      '{"tag": "Global"},' +
      comparison +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_temporal_interval'] = function(block) {
  var TEMP_MODALITIES = {
    'F': 'Future',
    'G': 'Global'
  };

  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  var temporal = block.getFieldValue('TEMP');
  var start = block.getFieldValue('START');
  var end = block.getFieldValue('END');

  temporal = TEMP_MODALITIES[temporal];

  var code = '{' +
    '"tag": "Expr4",' +
    '"children": [' +
      '{"tag": "TemporalInterval", "children": [' +
        '{"tag": "' + temporal + '"},' +
        '{"tag": "IntervalStart", "value": "' + start + '"},' +
        '{"tag": "IntervalEnd", "value": "' + end + '"}' +
      ']},' +
      comparison +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_temporal_interval_upto'] = function(block) {
  var TEMP_MODALITIES = {
    'F': 'Future',
    'G': 'Global'
  };

  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  var temporal = block.getFieldValue('TEMP');
  var end = block.getFieldValue('END');

  temporal = TEMP_MODALITIES[temporal];

  var code = '{' +
    '"tag": "Expr5",' +
    '"children": [' +
      '{"tag": "TemporalInterval", "children": [' +
        '{"tag": "' + temporal + '"},' +
        '{"tag": "IntervalStart", "value": "0"},' +
        '{"tag": "IntervalEnd", "value": "' + end + '"}' +
      ']},' +
      comparison +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '=',
    'NEQ': '!=',
    'LT': '<',
    'GT': '>'
  };

  var species = block.getFieldValue('SPECIES');
  var operator = block.getFieldValue('OP');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '{}';

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

Blockly.JavaScript['lbc_compare_inbuilt_temporal'] = function(block) {
  var OPERATORS = {
    'EQ': '=',
    'NEQ': '!=',
    'LT': '<',
    'GT': '>'
  };

  var TEMP_MODALITIES = {
    'F': 'Future',
    'G': 'Global'
  };

  var species = block.getFieldValue('SPECIES');
  var operator = block.getFieldValue('OP');
  var temporal = block.getFieldValue('TEMP');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '{}';

  operator = OPERATORS[operator];
  temporal = TEMP_MODALITIES[temporal];

  var code = '{' +
    '"tag": "Expr2",' +
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

Blockly.JavaScript['lbc_compare_inbuilt_stays'] = function(block) {
  var OPERATORS = {
    'LT': '<',
    'GT': '>'
  };

  var operator = block.getFieldValue('OP');
  operator = OPERATORS[operator];
  var species = block.getFieldValue('SPECIES');

  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '{}';

  var code = '{' +
    '"tag": "Expr3",' +
    '"children": [' +
      '{"tag": "Concentration", "value": "' + species + '"},' +
      '{"tag": "ComparisonOp", "value": "' + operator + '"},' +
      value +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_arithmetic'] = function(block) {
  var OPERATORS = {
    'ADD': '+',
    'SUBTRACT': '-',
    'MULTIPLY': '*',
    'DIVIDE': '/'
  };

  var operator = block.getFieldValue('OP');
  operator = OPERATORS[operator];

  var species = block.getFieldValue('SPECIES');
  var argument = Blockly.JavaScript.valueToCode(block, 'ARGUMENT', Blockly.JavaScript.ORDER_NONE) || '{}';

  var code = '{' +
    '"tag": "Arithmetic",' +
    '"children": [' +
      '{"tag": "Concentration", "value": "' + species + '"},' +
      '{"tag": "ArithOperator", "value": "' + operator + '"},' +
      argument +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_comment_with_output'] = function(block) {
  var text = block.getFieldValue('TEXT');
  var code = '{' +
    '"tag": "Comment",' +
    '"value": "' + text + '"' +
  '}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_comment_with_input'] = function(block) {
  var text = block.getFieldValue('TEXT');
  var argument = Blockly.JavaScript.valueToCode(block, 'ARGUMENT', Blockly.JavaScript.ORDER_NONE) || '{}';

  var code = '{' +
    '"tag": "Expr6",' +
    '"children": [' +
      '{"tag": "Comment", "value": "' + text + '"},' +
      argument +
    ']}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
