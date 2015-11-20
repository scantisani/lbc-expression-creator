/**
 * @fileoverview Generating JavaScript for LBC blocks.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.JavaScript.lbc');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['lbc_concentration'] = function(block) {
  var species = Blockly.JavaScript.valueToCode(block, 'SPECIES', Blockly.JavaScript.ORDER_NONE);
  var code = 'Concentration(' + species + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lbc_global'] = function(block) {
  var expression = Blockly.JavaScript.valueToCode(block, 'EXPRESSION', Blockly.JavaScript.ORDER_NONE);
  var code = 'Global(' + expression + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
