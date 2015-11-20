/**
 * @fileoverview Generating JavaScript for LBC blocks.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.JavaScript.lbc');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['lbc_concentration'] = function(block) {
  var species = Blockly.JavaScript.valueToCode(block, 'SPECIES', Blockly.JavaScript.ORDER_NONE);
  var code = '[' + species + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
