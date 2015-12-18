QUnit.module("Block -> tree");
QUnit.test("Concentration block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();
  // make a new Concentration block
  var block = Blockly.Block.obtain(workspace, 'lbc_concentration');

  // set the block's SPECIES input field value to 'A'
  block.setFieldValue('A', 'SPECIES');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(block)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  assert.deepEqual(tree, {tag: 'Concentration', value: 'A'});
});

QUnit.test("Real block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();
  // make a new Real block
  var block = Blockly.Block.obtain(workspace, 'lbc_real');

  // set the block's NUM input field value to '15'
  block.setFieldValue('15', 'NUM');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(block)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  assert.deepEqual(tree, {tag: 'Real', value: '15'});
});

QUnit.test("Global block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new Global block
  var global = Blockly.Block.obtain(workspace, 'lbc_global');
  // make a new Comparison block
  var comp = Blockly.Block.obtain(workspace, 'lbc_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // connect the Global and Comparison blocks
  var globalInput = global.getInput('EXPRESSION').connection;
  var compOutput = comp.outputConnection;
  globalInput.connect(compOutput);

  // connect the Comparison and Real blocks
  var compInput = comp.getInput('VALUE').connection;
  var realOutput = real.outputConnection;
  compInput.connect(realOutput);

  // set the Comparison block's fields to reasonable values
  // A for Species, Greater Than for Operator
  comp.setFieldValue('A', 'SPECIES');
  comp.setFieldValue('GT', 'OP');
  // set the Real block's Num field to 5
  real.setFieldValue('5', 'NUM');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(global)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  var expectedTree = {
    tag: 'TempComp',
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

  assert.deepEqual(tree, expectedTree);
});

QUnit.test("Future block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new Future block
  var future = Blockly.Block.obtain(workspace, 'lbc_future');
  // make a new Comparison block
  var comp = Blockly.Block.obtain(workspace, 'lbc_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // connect the Future and Comparison blocks
  var futureInput = future.getInput('EXPRESSION').connection;
  var compOutput = comp.outputConnection;
  futureInput.connect(compOutput);

  // connect the Comparison and Real blocks
  var compInput = comp.getInput('VALUE').connection;
  var realOutput = real.outputConnection;
  compInput.connect(realOutput);

  // set the Comparison block's fields to reasonable values
  // A for Species, Greater Than for Operator
  comp.setFieldValue('A', 'SPECIES');
  comp.setFieldValue('GT', 'OP');
  // set the Real block's Num field to 5
  real.setFieldValue('5', 'NUM');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(future)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  var expectedTree = {
    tag: 'TempComp',
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

  assert.deepEqual(tree, expectedTree);
});


QUnit.test("Comparison block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new Comparison block
  var comp = Blockly.Block.obtain(workspace, 'lbc_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // connect the two blocks
  var compConnection = comp.getInput('VALUE').connection;
  var realConnection = real.outputConnection;
  compConnection.connect(realConnection);

  // set the Comparison block's fields to reasonable values
  // GreaterThan for operator, 'P' for species
  comp.setFieldValue('GT', 'OP');
  comp.setFieldValue('P', 'SPECIES');

  // set the Real block's NUM input field value to '15'
  real.setFieldValue('5', 'NUM');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(comp)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  var expectedTree = {
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

  assert.deepEqual(tree, expectedTree);
});

QUnit.test("TempMidComp block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new TempMidComp block
  var comp = Blockly.Block.obtain(workspace, 'lbc_temporal_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // connect the two blocks
  var compConnection = comp.getInput('VALUE').connection;
  var realConnection = real.outputConnection;
  compConnection.connect(realConnection);

  // set the Comparison block's fields to reasonable values
  // GreaterThan for Operator, Future for Temporal, 'A' for Species
  comp.setFieldValue('GT', 'OP');
  comp.setFieldValue('F', 'TEMP');
  comp.setFieldValue('A', 'SPECIES');

  // set the Real block's NUM input field value to '5'
  real.setFieldValue('5', 'NUM');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(comp)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  var expectedTree = {
    tag: 'TempMidComp',
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

  assert.deepEqual(tree, expectedTree);
});

QUnit.test("FGComp block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new FGComp block
  var fgcomp = Blockly.Block.obtain(workspace, 'lbc_fg_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // set FGComp block's fields to reasonable values
  // 'X' for species, LessThan for operator
  fgcomp.setFieldValue('X', 'SPECIES');
  fgcomp.setFieldValue('LT', 'OP');
  // set Real block's Num field to 16
  real.setFieldValue('16', 'NUM');

  // connect the two blocks
  var fgcompConnection = fgcomp.getInput('VALUE').connection;
  var realConnection = real.outputConnection;
  fgcompConnection.connect(realConnection);

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(fgcomp)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  var expectedTree = {
    tag: 'FGComp',
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

  assert.deepEqual(tree, expectedTree);
});

QUnit.test("TemporalInterval block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new TemporalInterval block
  var temporalInterval = Blockly.Block.obtain(workspace, 'lbc_temporal_interval');
  // make a new Comparison block
  var comp = Blockly.Block.obtain(workspace, 'lbc_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // connect the TemporalInterval and Comparison blocks
  var temporalIntervalInput = temporalInterval.getInput('COMPARISON').connection;
  var compOutput = comp.outputConnection;
  temporalIntervalInput.connect(compOutput);

  // connect the Comparison and Real blocks
  var compInput = comp.getInput('VALUE').connection;
  var realOutput = real.outputConnection;
  compInput.connect(realOutput);

  // set the TemporalInterval block's interval fields to reasonable start and end values
  temporalInterval.setFieldValue('10', 'START');
  temporalInterval.setFieldValue('15', 'END');
  // set the TemporalInterval block's temporal modality field to 'Global'
  temporalInterval.setFieldValue('G', 'TEMP');
  // set the Comparison block's fields to reasonable values
  // A for Species, Greater Than for Operator
  comp.setFieldValue('P', 'SPECIES');
  comp.setFieldValue('GTE', 'OP');
  // set the Real block's Num field to 5
  real.setFieldValue('8', 'NUM');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(temporalInterval)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  var expectedTree = {
    tag: 'TempCompInterval',
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
            value: '>='
          },
          {
            tag: 'Real',
            value: '8'
          }
        ]
      }
    ]
  };

  assert.deepEqual(tree, expectedTree);
});
