/**
 * @fileoverview Generating JavaScript for LBC blocks.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.JavaScript.lbc');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['lbc_concentration'] = function(block) {
  var species = block.getFieldValue('SPECIES');
  var code = 'Concentration("' + species + '")';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lbc_future'] = function(block) {
  var expression = Blockly.JavaScript.valueToCode(block, 'EXPRESSION', Blockly.JavaScript.ORDER_NONE);
  var code = 'Future(' + expression + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lbc_compare'] = function(block) {
  var OPERATORS = {
    'EQ': 'Equals',
    'NEQ': 'NotEquals',
    'LT': 'LessThan',
    'LTE': 'LessThanEquals',
    'GT': 'GreaterThan',
    'GTE': 'GreaterThanEquals'
  };

  var operator = block.getFieldValue('OP');
  var order = (operator == 'EQ' || operator == 'NEQ') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

  var comparison = OPERATORS[operator];

  var code = 'Conditional(' + comparison + '(' + argument0 + ', ' + argument1 + '))';
  return [code, order];
};

