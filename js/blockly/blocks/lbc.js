/**
 * @fileoverview LBC blocks for Blockly.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.Blocks.lbc');

goog.require('Blockly.Blocks');


Blockly.Blocks['lbc_concentration'] = {
  /**
   * Block for concentration of a species.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(30);
    this.appendDummyInput()
        .appendField('the concentration of')
        .appendField(new Blockly.FieldTextInput(''), 'SPECIES');
    this.setTooltip('The concentration of a species.');
    this.setOutput(true, 'Value');
  }
};

Blockly.Blocks['lbc_future'] = {
  /**
   * Block for global temporal modality.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(10);
    this.appendValueInput('EXPRESSION')
        .setCheck('Boolean')
        .appendField('Eventually,');
    this.setTooltip('');
  }
};

Blockly.Blocks['lbc_compare'] = {
  /**
   * Block for comparison operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
          ['is equal to', 'EQ'],
          ['is not equal to', 'NEQ'],
          ['is less than', 'LT'],
          ['is less than or equal to', 'LTE'],
          ['is greater than', 'GT'],
          ['is greater than or equal to', 'GTE']
        ];
    this.setColour(60);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
        .setCheck('Value');
    this.appendValueInput('B')
        .setCheck('Value')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
  }
};
