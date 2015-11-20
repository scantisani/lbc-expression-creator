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
    this.appendValueInput("SPECIES")
        .setCheck("String")
        .appendField("the concentration of");
    this.setTooltip("The concentration of a species.");
    this.setOutput(true, "Expr");
  }
};
