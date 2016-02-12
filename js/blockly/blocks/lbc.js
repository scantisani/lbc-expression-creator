/**
 * @fileoverview LBC blocks for Blockly.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.Blocks.lbc');

goog.require('Blockly.Blocks');

// Custom saturation and value--brighter than Blockly defaults
Blockly.HSV_SATURATION = 0.7;
Blockly.HSV_VALUE = 0.7;


Blockly.Blocks['lbc_concentration'] = {
  /**
   * Block for concentration of a species.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(327);
    this.appendDummyInput()
        .appendField('the concentration of')
        .appendField(new Blockly.FieldTextInput('P'), 'SPECIES');
    this.setOutput(true, 'Concentration');
  }
};

Blockly.Blocks['lbc_future'] = {
  /**
   * Block for future temporal modality.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(56);
    this.appendValueInput('COMPARISON')
        .setCheck(['Comparison', 'Comment'])
        .appendField('Eventually,');
  }
};

Blockly.Blocks['lbc_global'] = {
  /**
   * Block for global temporal modality.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(56);
    this.appendValueInput('COMPARISON')
        .setCheck(['Comparison', 'Comment'])
        .appendField('It is always the case that');
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

    this.setColour(56);
    this.appendDummyInput()
        .appendField('At')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP')
        .appendField('between');
    this.appendValueInput('COMPARISON')
        .setCheck(['Comparison', 'Comment'])
        .appendField('times')
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'START')
        .appendField('and')
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'END');
  }
};

Blockly.Blocks['lbc_temporal_interval_upto'] = {
  /**
   * Block for global or future temporal modality with interval.
   * @this Blockly.Block
   */
  init: function() {
    var TEMP_MODALITIES = [
          ['some point', 'F'],
          ['all points', 'G']
        ];

    this.setColour(56);
    this.appendDummyInput()
        .appendField('At')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP')
        .appendField('before');
    this.appendValueInput('COMPARISON')
        .setCheck(['Comparison', 'Comment'])
        .appendField('time')
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
          ['is greater than', 'GT']
        ];

    this.setColour(202);
    this.setOutput(true, 'Comparison');
    this.appendDummyInput()
        .appendField('the concentration of')
        .appendField(new Blockly.FieldTextInput('P'), 'SPECIES');
    this.appendValueInput('VALUE')
        .setCheck(['Real', 'Concentration', 'Value', 'Comment'])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
  }
};

Blockly.Blocks['lbc_compare_inbuilt_temporal'] = {
  /**
   * Block for comparison with temporal drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
          ['equal to', 'EQ'],
          ['not equal to', 'NEQ'],
          ['less than', 'LT'],
          ['greater than', 'GT']
        ];

    var TEMP_MODALITIES = [
          ['eventually', 'F'],
          ['always', 'G']
        ];

    this.setColour(202);
    this.setOutput(false);
    this.appendDummyInput()
        .appendField('The concentration of')
        .appendField(new Blockly.FieldTextInput('P'), 'SPECIES');
    this.appendDummyInput()
        .appendField('is')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP');
    this.appendValueInput('VALUE')
        .setCheck(['Concentration', 'Real', 'Value', 'Comment'])
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
    this.setColour(327);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'NUM');
    this.setOutput(true, 'Real');
  }
};

Blockly.Blocks['lbc_compare_inbuilt_stays'] = {
  /**
   * Block for F(G())-style expressions.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
          ['rises to and stays above', 'GT'],
          ['drops to and stays below', 'LT']
        ];

    this.setColour(202);
    this.appendDummyInput()
        .appendField('The concentration of')
        .appendField(new Blockly.FieldTextInput('P'), 'SPECIES');
    this.appendValueInput('VALUE')
        .setCheck(['Concentration', 'Real', 'Value', 'Comment'])
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
         [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'SUBTRACT'],
         [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
         [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE']];

    this.setColour(327);
    this.setOutput(true, 'Value');
    this.appendDummyInput()
        .appendField('the concentration of')
        .appendField(new Blockly.FieldTextInput('P'), 'SPECIES')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.appendValueInput('ARGUMENT')
        .setCheck(['Concentration', 'Real', 'Value', 'Comment']);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['lbc_comment_with_output'] = {
  /**
   * Block for writing comments within an LBC formula.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(26);
    this.setOutput(true, 'Comment');
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('Put a comment here!'), 'TEXT');
  }
};

Blockly.Blocks['lbc_comment_with_input'] = {
  /**
   * Block for writing comments within an LBC formula.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(26);
    this.appendValueInput('ARGUMENT')
        .appendField(new Blockly.FieldTextInput('Put a comment here!'), 'TEXT');
  }
};
