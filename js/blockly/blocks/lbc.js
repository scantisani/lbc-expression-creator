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

var temporalColour = 56;
var valueColour = 327;
var comparisonColour = 202;
var commentColour = 26;
var connectiveColour = 260;

var allowedTemporalInputs = ['Comparison', 'Connective', 'Comment'];

Blockly.Blocks['lbc_concentration'] = {
  /**
   * Block for concentration of a species.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(valueColour);
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
    this.setColour(temporalColour);
    this.appendValueInput('COMPARISON')
        .setCheck(allowedTemporalInputs)
        .appendField('Eventually,');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['lbc_global'] = {
  /**
   * Block for global temporal modality.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(temporalColour);
    this.appendValueInput('COMPARISON')
        .setCheck(allowedTemporalInputs)
        .appendField('It is always the case that');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['lbc_temporal_interval'] = {
  /**
   * Block for global or future temporal modality with interval.
   * @this Blockly.Block
   */
  init: function() {
    var TEMP_MODALITIES = [
          ['some point', 'FUTURE'],
          ['all points', 'GLOBAL']
        ];

    this.setColour(temporalColour);
    this.appendDummyInput()
        .appendField('At')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP')
        .appendField('between');
    this.appendValueInput('COMPARISON')
        .setCheck(allowedTemporalInputs)
        .appendField('times')
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'START')
        .appendField('and')
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'END');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['lbc_temporal_interval_upto'] = {
  /**
   * Block for global or future temporal modality with interval.
   * @this Blockly.Block
   */
  init: function() {
    var TEMP_MODALITIES = [
          ['some point', 'FUTURE'],
          ['all points', 'GLOBAL']
        ];

    this.setColour(temporalColour);
    this.appendDummyInput()
        .appendField('At')
        .appendField(new Blockly.FieldDropdown(TEMP_MODALITIES), 'TEMP')
        .appendField('before');
    this.appendValueInput('COMPARISON')
        .setCheck(allowedTemporalInputs)
        .appendField('time')
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'END');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
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

    this.setColour(comparisonColour);
    this.setOutput(true, 'Comparison');
    this.appendDummyInput()
        .appendField('the concentration of')
        .appendField(new Blockly.FieldTextInput('P'), 'SPECIES');
    this.appendValueInput('ARGUMENT')
        .setCheck(['Real', 'Concentration', 'Value', 'Comment'])
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
    this.setColour(valueColour);
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

    this.setColour(comparisonColour);
    this.appendDummyInput()
        .appendField('The concentration of')
        .appendField(new Blockly.FieldTextInput('P'), 'SPECIES');
    this.appendValueInput('ARGUMENT')
        .setCheck(['Concentration', 'Real', 'Value', 'Comment'])
        .appendField('eventually')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
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

    this.setColour(valueColour);
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
    this.setColour(commentColour);
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
    this.setColour(commentColour);
    this.appendValueInput('ARGUMENT')
        .appendField(new Blockly.FieldTextInput('Put a comment here!'), 'TEXT');
  }
};

Blockly.Blocks['lbc_and_or'] = {
  /**
   * Block for chaining LBC expressions together with conjunction or disjunction.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(connectiveColour);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['All of the following are true:', 'AND'], ['At least one of the following is true:', 'OR']]), 'OP');
    this.appendStatementInput('ARGUMENT');
  }
};
