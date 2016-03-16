/**
 * @fileoverview Generating JavaScript for LBC blocks.
 * @author scantisani@gmail.com (Scott Cantisani)
 */
'use strict';

goog.provide('Blockly.JavaScript.lbc');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['lbc_concentration'] = function(block) {
  var species = block.getFieldValue('SPECIES');
  var code = {
    tag: 'Concentration',
    species: species
  };

  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_future'] = function(block) {
  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  comparison = JSON.parse(comparison);

  var code = {
    tag: 'Expr1',
    temporal: {
      tag: 'Temporal',
      modality: 'FUTURE'
    },
    comparison: comparison
  };

  return JSON.stringify(code);
};

Blockly.JavaScript['lbc_global'] = function(block) {
  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  comparison = JSON.parse(comparison);

  var code = {
    tag: 'Expr1',
    temporal: {
      tag: 'Temporal',
      modality: 'GLOBAL'
    },
    comparison: comparison
  };

  return JSON.stringify(code);
};

Blockly.JavaScript['lbc_temporal_interval'] = function(block) {
  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  comparison = JSON.parse(comparison);

  var modality = block.getFieldValue('TEMP');
  var start = block.getFieldValue('START');
  var end = block.getFieldValue('END');

  var code = {
    tag: 'Expr4',
    temporal: {
      tag: 'TemporalInterval',
      modality: modality,
      start: start,
      end: end
    },
    comparison: comparison
  };

  return JSON.stringify(code);
};

Blockly.JavaScript['lbc_temporal_interval_upto'] = function(block) {
  var comparison = Blockly.JavaScript.valueToCode(block, 'COMPARISON', Blockly.JavaScript.ORDER_NONE) || '{}';
  comparison = JSON.parse(comparison);

  var modality = block.getFieldValue('TEMP');
  var end = block.getFieldValue('END');

  var code = {
    tag: 'Expr4',
    temporal: {
      tag: 'TemporalInterval',
      modality: modality,
      start: 0,
      end: end
    },
    comparison: comparison
  };

  return JSON.stringify(code);
};

Blockly.JavaScript['lbc_compare'] = function(block) {
  var species = block.getFieldValue('SPECIES');
  var operator = block.getFieldValue('OP');
  var argument = Blockly.JavaScript.valueToCode(block, 'ARGUMENT', Blockly.JavaScript.ORDER_NONE) || '{}';
  argument = JSON.parse(argument);

  var code = {
    tag: 'Comparison',
    species: species,
    operator: {
      tag: 'ComparisonOp',
      symbol: operator
    },
    argument: argument
  };

  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_real'] = function(block) {
  var number = block.getFieldValue('NUM');

  var code = {
    tag: 'Real',
    number: number
  };

  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_compare_inbuilt_stays'] = function(block) {
  var operator = block.getFieldValue('OP');
  var species = block.getFieldValue('SPECIES');
  var argument = Blockly.JavaScript.valueToCode(block, 'ARGUMENT', Blockly.JavaScript.ORDER_NONE) || '{}';
  argument = JSON.parse(argument);

  var code = {
    tag: 'Expr3',
    species: species,
    operator: {
      tag: 'ComparisonOp',
      symbol: operator
    },
    argument: argument
  };

  return JSON.stringify(code);
};

Blockly.JavaScript['lbc_arithmetic'] = function(block) {
  var operator = block.getFieldValue('OP');
  var species = block.getFieldValue('SPECIES');
  var argument = Blockly.JavaScript.valueToCode(block, 'ARGUMENT', Blockly.JavaScript.ORDER_NONE) || '{}';
  argument = JSON.parse(argument);

  var code = {
    tag: 'Arithmetic',
    species: species,
    operator: {
      tag: 'ArithOp',
      symbol: operator
    },
    argument: argument
  };

  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_comment_with_output'] = function(block) {
  var text = block.getFieldValue('TEXT');

  var code = {
    tag: 'Comment',
    text: text
  };
   
  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_comment_with_input'] = function(block) {
  var text = block.getFieldValue('TEXT');
  var argument = Blockly.JavaScript.valueToCode(block, 'ARGUMENT', Blockly.JavaScript.ORDER_NONE) || '{}';
  argument = JSON.parse(argument);

  var code = {
    tag: 'Expr5',
    text: text,
    argument: argument
  };
   
  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lbc_and_or'] = function(block) {
  var operator = block.getFieldValue('OP');
  var argument = Blockly.JavaScript.statementToCode(block, 'ARGUMENT');

  // the stack of sub-expressions will be stuck together as as a single, unbroken string
  // so add square brackets and commas in appropriate places to format as JSON array
  argument = '[' + argument.trim().replace(/}{/g, '},{') + ']';
  argument = JSON.parse(argument);

  var code = {
    tag: 'Connective',
    operator: {
      tag: 'LogicalOp',
      symbol: operator
    },
    argument: argument
  };
   
  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};
