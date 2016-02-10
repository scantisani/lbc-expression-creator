QUnit.module("Block -> tree", function(hooks) {
  hooks.beforeEach(function() {
    this.workspace = new Blockly.Workspace();
  });

  hooks.afterEach(function(assert) {
    tree = blockToObject(this.block);
    assert.deepEqual(tree, this.expectedTree);
  });

  QUnit.test("Concentration block generates correct tree", function() {
    // make a new Concentration block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_concentration');

    // set the block's SPECIES input field value to 'A'
    this.block.setFieldValue('A', 'SPECIES');

    this.expectedTree = {tag: 'Concentration', value: 'A'};
  });

  QUnit.test("Real block generates correct tree", function(assert) {
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set the block's NUM input field value to '15'
    this.block.setFieldValue('15', 'NUM');

    this.expectedTree = {tag: 'Real', value: '15'};
  });

  QUnit.test("Global block generates correct tree", function(assert) {
    // make a new Global block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_global');
    // make a new Comparison block
    var comp = Blockly.Block.obtain(this.workspace, 'lbc_compare');
    // make a new Real block
    var real = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set the Comparison block's fields to reasonable values
    // A for Species, Greater Than for Operator
    comp.setFieldValue('A', 'SPECIES');
    comp.setFieldValue('GT', 'OP');
    // set the Real block's Num field to 5
    real.setFieldValue('5', 'NUM');

    connectBlocks(this.block, comp, 'COMPARISON');
    connectBlocks(comp, real, 'VALUE');

    this.expectedTree = {
      tag: 'Expr1',
      children: [
        {
          tag: 'Global'
        },
        {
          tag: 'Comparison',
          children: [
            {
              tag: 'Concentration',
              value: 'A'
            },
            {
              tag: 'ComparisonOp',
              value: '>'
            },
            {
              tag: 'Real',
              value: '5'
            }
          ]
        }
      ]
    };
  });

  QUnit.test("Future block generates correct tree", function(assert) {
    // make a new Future block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_future');
    // make a new Comparison block
    var comp = Blockly.Block.obtain(this.workspace, 'lbc_compare');
    // make a new Real block
    var real = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set the Comparison block's fields to reasonable values
    // A for Species, Greater Than for Operator
    comp.setFieldValue('A', 'SPECIES');
    comp.setFieldValue('GT', 'OP');
    // set the Real block's Num field to 5
    real.setFieldValue('5', 'NUM');

    connectBlocks(this.block, comp, 'COMPARISON');
    connectBlocks(comp, real, 'VALUE');

    this.expectedTree = {
      tag: 'Expr1',
      children: [
        {
          tag: 'Future'
        },
        {
          tag: 'Comparison',
          children: [
            {
              tag: 'Concentration',
              value: 'A'
            },
            {
              tag: 'ComparisonOp',
              value: '>'
            },
            {
              tag: 'Real',
              value: '5'
            }
          ]
        }
      ]
    };
  });

  QUnit.test("Comparison block generates correct tree", function(assert) {
    // make a new Comparison block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_compare');
    // make a new Real block
    var real = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set the Comparison block's fields to reasonable values
    // GreaterThan for operator, 'P' for species
    this.block.setFieldValue('GT', 'OP');
    this.block.setFieldValue('P', 'SPECIES');

    // set the Real block's NUM input field value to '15'
    real.setFieldValue('5', 'NUM');

    connectBlocks(this.block, real, 'VALUE');

    this.expectedTree = {
      tag: 'Comparison',
      children: [
        {
          tag: 'Concentration',
          value: 'P'
        },
        {
          tag: 'ComparisonOp',
          value: '>'
        },
        {
          tag: 'Real',
          value: '5'
        }
      ]
    };
  });

  QUnit.test("Comparison block with inbuilt 'always/eventually' menu generates correct tree", function(assert) {
    // make a new Comparison with Inbuilt Temporal block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_compare_inbuilt_temporal');
    // make a new Real block
    var real = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set the Comparison block's fields to reasonable values
    // GreaterThan for Operator, Future for Temporal, 'A' for Species
    this.block.setFieldValue('GT', 'OP');
    this.block.setFieldValue('F', 'TEMP');
    this.block.setFieldValue('A', 'SPECIES');

    // set the Real block's NUM input field value to '5'
    real.setFieldValue('5', 'NUM');

    connectBlocks(this.block, real, 'VALUE');

    this.expectedTree = {
      tag: 'Expr2',
      children: [
        {
          tag: 'Future'
        },
        {
          tag: 'Comparison',
          children: [
            {
              tag: 'Concentration',
              value: 'A'
            },
            {
              tag: 'ComparisonOp',
              value: '>'
            },
            {
              tag: 'Real',
              value: '5'
            }
          ]
        }
      ]
    };
  });

  QUnit.test("Comparison block with inbuilt 'drops/rises to and stays below/above' menu generates correct tree", function(assert) {
    // make a new Expr3 block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_compare_inbuilt_stays');
    // make a new Real block
    var real = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set Expr3 block's fields to reasonable values
    // 'X' for species, LessThan for operator
    this.block.setFieldValue('X', 'SPECIES');
    this.block.setFieldValue('LT', 'OP');
    // set Real block's Num field to 16
    real.setFieldValue('16', 'NUM');

    connectBlocks(this.block, real, 'VALUE');

    this.expectedTree = {
      tag: 'Expr3',
      children: [
        {
          tag: 'Concentration',
          value: 'X'
        },
        {
          tag: 'ComparisonOp',
          value: '<'
        },
        {
          tag: 'Real',
          value: '16'
        }
      ]
    };
  });

  QUnit.test("TemporalInterval block generates correct tree", function(assert) {
    // make a new TemporalInterval block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval');
    // make a new Comparison block
    var comp = Blockly.Block.obtain(this.workspace, 'lbc_compare');
    // make a new Real block
    var real = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set the TemporalInterval block's interval fields to reasonable start and end values
    this.block.setFieldValue('10', 'START');
    this.block.setFieldValue('15', 'END');
    // set the TemporalInterval block's temporal modality field to 'Global'
    this.block.setFieldValue('G', 'TEMP');
    // set the Comparison block's fields to reasonable values
    // P for Species, Equal To for Operator
    comp.setFieldValue('P', 'SPECIES');
    comp.setFieldValue('EQ', 'OP');
    // set the Real block's Num field to 8
    real.setFieldValue('8', 'NUM');

    connectBlocks(this.block, comp, 'COMPARISON');
    connectBlocks(comp, real, 'VALUE');

    this.expectedTree = {
      tag: 'Expr4',
      children: [
        {
          tag: 'TemporalInterval',
          children: [
            {
              tag: 'Global',
            },
            {
              tag: 'IntervalStart',
              value: '10'
            },
            {
              tag: 'IntervalEnd',
              value: '15'
            }
          ]
        },
        {
          tag: 'Comparison',
          children: [
            {
              tag: 'Concentration',
              value: 'P'
            },
            {
              tag: 'ComparisonOp',
              value: '='
            },
            {
              tag: 'Real',
              value: '8'
            }
          ]
        }
      ]
    };
  });

  QUnit.test("Comment block with output generates correct tree", function(assert) {
    // make a new Comment block
    this.block = Blockly.Block.obtain(this.workspace, 'lbc_comment_with_output');

    // set the block's TEXT input field value to 'some arbitrary words'
    this.block.setFieldValue('some arbitrary words', 'TEXT');

    this.expectedTree = {tag: 'Comment', value: 'some arbitrary words'};
  });

  QUnit.module("Arithmetic blocks", function(hooks) {
    hooks.beforeEach(function() {
      // make a new Arithmetic block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_arithmetic');

      // set the Arithmetic block's operator field to 'minus'
      this.block.setFieldValue('Q', 'SPECIES');
      this.block.setFieldValue('SUBTRACT', 'OP');
    });

    QUnit.test("Arithmetic block with Real", function() {
      // make a new Real block
      var real = Blockly.Block.obtain(this.workspace, 'lbc_real');

      // set the Real block's NUM input to 5
      real.setFieldValue('5', 'NUM');

      connectBlocks(this.block, real, 'ARGUMENT');

      this.expectedTree = {
        tag: 'Arithmetic',
        children: [
          {
            tag: 'Concentration',
            value: 'Q'
          },
          {
            tag: 'ArithOperator',
            value: '-'
          },
          {
            tag: 'Real',
            value: '5'
          }
        ]
      };
    });

    QUnit.test("Arithmetic block and concentration", function() {
      // make a new Concentration block
      var concentration = Blockly.Block.obtain(this.workspace, 'lbc_concentration');
      concentration.setFieldValue('A', 'SPECIES');

      connectBlocks(this.block, concentration, 'ARGUMENT');

      this.expectedTree = {
        tag: 'Arithmetic',
        children: [
          {
            tag: 'Concentration',
            value: 'Q'
          },
          {
            tag: 'ArithOperator',
            value: '-'
          },
          {
            tag: 'Concentration',
            value: 'A'
          }
        ]
      };
    });
  });
});
