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
        .setCheck('Comparison')
        .appendField('Eventually,');
    this.setTooltip('');
  }
};

Blockly.Blocks['lbc_global'] = {
  /**
   * Block for global temporal modality.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(10);
    this.appendValueInput('EXPRESSION')
        .setCheck('Comparison')
        .appendField('It is always the case that');
    this.setTooltip('');
  }
};

Blockly.Blocks['lbc_temporal_interval'] = {
  /**
   * Block for global or future temporal modality with interval.
   * @this Blockly.Block
   */
  init: function() {
    var TEMP_MODALITIES = [
          ['some point', 'F'],
          ['all points', 'G']
        ];

    this.setColour(10);
    this.appendDummyInput()
        .appendField('At')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP')
        .appendField('between');
    this.appendValueInput('COMPARISON')
        .setCheck('Comparison')

        .appendField('times')
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'START')
        .appendField('and')
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'END');
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
    this.setOutput(true, 'Comparison');
    this.appendDummyInput()
        .appendField('the concentration of')
        .appendField(new Blockly.FieldTextInput(''), 'SPECIES');
    this.appendValueInput('VALUE')
        .setCheck(['Real', 'Concentration', 'Value'])
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
    this.appendDummyInput()
        .appendField('The concentration of')
        .appendField(new Blockly.FieldTextInput(''), 'SPECIES');
    this.appendDummyInput()
        .appendField('is')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP');
    this.appendValueInput('VALUE')
        .setCheck(['Concentration', 'Real', 'Value'])
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
    this.appendValueInput('VALUE')
        .setCheck(['Concentration', 'Real', 'Value'])
        .appendField('eventually')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    // this.setInputsInline(true);
  }
};

Blockly.Blocks['lbc_arithmetic'] = {
  /**
   * Block for arithmetic operations in LBC.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
         [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
         [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
         [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE']];

    this.setColour(80);
    this.setOutput(true, 'Value');
    this.appendValueInput('ARGUMENT1')
        .setCheck(['Concentration', 'Real', 'Value']);
    this.appendValueInput('ARGUMENT2')
        .setCheck(['Concentration', 'Real', 'Value'])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
  }
};

