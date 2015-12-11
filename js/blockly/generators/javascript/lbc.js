/**
 * @fileoverview Generating JavaScript for LBC blocks.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.JavaScript.lbc');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['lbc_concentration'] = function(block) {
  var species = block.getFieldValue('SPECIES');
  var code = 'Concentration ' + species;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lbc_future'] = function(block) {
  var expression = Blockly.JavaScript.valueToCode(block, 'EXPRESSION', Blockly.JavaScript.ORDER_NONE);
  var code = 'Future ' + expression;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
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

  var operator = block.getFieldValue('OP');
  var order = (operator == 'EQ' || operator == 'NEQ') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

  var comparison = OPERATORS[operator];

  var code = argument0 + ' ' + comparison + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript['lbc_real'] = function(block) {
  var num = block.getFieldValue('NUM');
  return [num, Blockly.JavaScript.ORDER_ATOMIC];
};
