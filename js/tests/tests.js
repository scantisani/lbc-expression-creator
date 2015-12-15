QUnit.module("Syntax tree to LBC translation tests");
QUnit.test("Tree for 'Future Concentration A > 0' is translated correctly", function(assert) {
  var tree = {
    tag: 'TempComp',
    children: [
      {
        tag: 'Future',
        children: []
      },
      {
        tag: 'Comparison',
        children: [
          {
            tag: 'Concentration',
            value: 'A'
          },
          {
            tag: 'Comparison_Op',
            value: '>'
          },
          {
            tag: 'Real',
            value: '0'
          }
        ]
      }
    ]
  };

  assert.equal(treeToLBC(tree), 'F([A] > 0)');
});

QUnit.test("Real values are translated correctly", function(assert) {
  var tree = {
    tag: 'Real',
    value: '5'
  };

  assert.equal(treeToLBC(tree), '5');
});

QUnit.test("Concentrations are translated correctly", function(assert) {
  var tree = {
    tag: 'Concentration',
    value: 'A'
  };
  assert.equal(treeToLBC(tree), '[A]');

  tree = {
    tag: 'Concentration',
    value: 'phos'
  };
  assert.equal(treeToLBC(tree), '[phos]');
});

QUnit.test("Comparison operators are translated correctly", function(assert) {
  var tree = {
    tag: 'Comparison_Op',
    value: '>'
  };
  assert.equal(treeToLBC(tree), '>');

  tree = {
    tag: 'Comparison_Op',
    value: '<'
  };
  assert.equal(treeToLBC(tree), '<');

  tree = {
    tag: 'Comparison_Op',
    value: '='
  };
  assert.equal(treeToLBC(tree), '=');

  tree = {
    tag: 'Comparison_Op',
    value: '>='
  };
  assert.equal(treeToLBC(tree), '>=');

  tree = {
    tag: 'Comparison_Op',
    value: '<='
  };
  assert.equal(treeToLBC(tree), '<=');

  tree = {
    tag: 'Comparison_Op',
    value: '!='
  };
  assert.equal(treeToLBC(tree), '!=');

});

QUnit.test("Global is translated correctly", function(assert) {
  var tree = {
    tag: 'Global'
  };

  assert.equal(treeToLBC(tree), 'G');
});

QUnit.test("Future is translated correctly", function(assert) {
  var tree = {
    tag: 'Future'
  };

  assert.equal(treeToLBC(tree), 'F');
});

QUnit.test("Temporal is translated correctly", function(assert) {
  var tree = {
    tag: 'Temporal',
    children: [{
      tag: 'Future'
    }]
  };
  assert.equal(treeToLBC(tree), 'F');

  tree = {
    tag: 'Temporal',
    children: [{
      tag: 'Global'
    }]
  };
  assert.equal(treeToLBC(tree), 'G');
});

QUnit.test("Comparison is translated correctly", function(assert) {
  var tree = {
    tag: 'Comparison',
    children: [
      {
        tag: 'Concentration',
        value: 'X'
      },
      {
        tag: 'Comparison_Op',
        value: '>'
      },
      {
        tag: 'Real',
        value: '5'
      }
    ]
  };

  assert.equal(treeToLBC(tree), '[X] > 5');
});

QUnit.test("TempMidComp is translated correctly", function(assert) {
  var tree = {
    tag: 'TempMidComp',
    children: [{
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
          tag: 'Comparison_Op',
          value: '>'
        },
        {
          tag: 'Real',
          value: '5'
        }
      ]
    }]
  };


  assert.equal(treeToLBC(tree), 'F([A] > 5)');
});


QUnit.test("FGComp is translated correctly", function(assert) {
  var tree = {
    tag: 'FGComp',
    children: [
      {
        tag: 'Species',
        value: 'A'
      },
      {
        tag: 'Comparison_Op',
        value: '<'
      },
      {
        tag: 'Real',
        value: '5'
      }
    ]
  };

  assert.equal(treeToLBC(tree), 'F(G([A] < 5))');
});


QUnit.module("Block-to-tree tests");
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

QUnit.test("Comparison block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new Comparison block
  var comp = Blockly.Block.obtain(workspace, 'lbc_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // connect the two blocks
  var comp_connection = comp.getInput('VALUE').connection;
  var real_connection = real.outputConnection;
  comp_connection.connect(real_connection);

  // set the Comparison block's OP dropdown to 'GT' (greater than)
  comp.setFieldValue('GT', 'OP');

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
        value: ''
      },
      {
        tag: 'Comparison_Op',
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
  var comp_connection = comp.getInput('VALUE').connection;
  var real_connection = real.outputConnection;
  comp_connection.connect(real_connection);

  // set the Comparison block's OP dropdown to 'GT' (greater than)
  comp.setFieldValue('GT', 'OP');
  // set the Comparison block's TEMP dropdown to 'F' (eventually/future)
  comp.setFieldValue('F', 'TEMP');

  // set the Real block's NUM input field value to '15'
  real.setFieldValue('5', 'NUM');

  // the second element of the blockToCode array is operator precedence,
  // which we can safely ignore
  var code = Blockly.JavaScript.blockToCode(comp)[0];
  // the code comes as a string, which we convert to a tree
  var tree = JSON.parse(code);

  var expectedTree = {
    tag: 'TempMidComp',
    children: [{
      tag: 'Future'
    },
    {
      tag: 'Comparison',
      children: [
        {
          tag: 'Concentration',
          value: ''
        },
        {
          tag: 'Comparison_Op',
          value: '>'
        },
        {
          tag: 'Real',
          value: '5'
        }
      ]
    }]
  };

  assert.deepEqual(tree, expectedTree);
});

QUnit.test("FGComp block generates correct tree", function(assert) {
  var workspace = new Blockly.Workspace();

  // make a new FGComp block
  var fgcomp = Blockly.Block.obtain(workspace, 'lbc_fg_compare');
  // make a new Real block
  var real = Blockly.Block.obtain(workspace, 'lbc_real');

  // connect the two blocks
  var fgcomp_connection = fgcomp.getInput('VALUE').connection;
  var real_connection = real.outputConnection;
  fgcomp_connection.connect(real_connection);

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
        value: ''
      },
      {
        tag: 'Comparison_Op',
        value: '>'
      },
      {
        tag: 'Real',
        value: '0'
      }
    ]
  };

  assert.deepEqual(tree, expectedTree);
});
