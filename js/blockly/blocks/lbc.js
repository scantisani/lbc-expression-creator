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
    this.setTooltip('the concentration of a species.');
    this.setOutput(true, 'Concentration');
  }
};

Blockly.Blocks['lbc_future'] = {
  /**
   * Block for future temporal modality.
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

Blockly.Blocks['lbc_global'] = {
  /**
   * Block for future temporal modality.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(10);
    this.appendValueInput('EXPRESSION')
        .setCheck('Boolean')
        .appendField('It is always the case that');
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
    this.appendDummyInput()
        .appendField('the concentration of')
        .appendField(new Blockly.FieldTextInput(''), 'SPECIES');
    this.appendValueInput('VALUE')
        .setCheck(['Real', 'Concentration'])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
  }
};

Blockly.Blocks['lbc_temporal_compare'] = {
  /**
   * Block for comparison with temporal drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
          ['equal to', 'EQ'],
          ['not equal to', 'NEQ'],
          ['less than', 'LT'],
          ['less than or equal to', 'LTE'],
          ['greater than', 'GT'],
          ['greater than or equal to', 'GTE']
        ];

    var TEMP_MODALITIES = [
          ['eventually', 'F'],
          ['always', 'G']
        ];

    this.setColour(60);
    this.setOutput(false);
    this.appendValueInput('A')
        .setCheck(['Concentration', 'Real']);
    this.appendDummyInput()
        .appendField('is')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP');
    this.appendValueInput('B')
        .setCheck(['Concentration', 'Real'])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
  }
};

Blockly.Blocks['lbc_real'] = {
  /**
   * Block for real numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(80);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'NUM');
    this.setOutput(true, 'Real');
  }
};

Blockly.Blocks['lbc_fg_compare'] = {
  /**
   * Block for F(G())-style expressions.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
          ['rises to and stays above', 'GT'],
          ['drops to and stays below', 'LT']
        ];

    this.setColour(60);
    this.appendDummyInput()
        .appendField('The concentration of')
        .appendField(new Blockly.FieldTextInput(''), 'SPECIES');
    this.appendDummyInput()
        .appendField('eventually')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.appendValueInput('VALUE')
        .setCheck(['Concentration', 'Real']);
    // this.setInputsInline(true);
  }
};
