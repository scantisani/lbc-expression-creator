QUnit.module("Tree -> LBC");
QUnit.test("TempComp is translated correctly", function(assert) {
  var tree = {
    tag: 'TempComp',
    children: [
      {
        tag: 'Future',
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

QUnit.test("Comparison is translated correctly", function(assert) {
  var tree = {
    tag: 'Comparison',
    children: [
      {
        tag: 'Concentration',
        value: 'X'
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

  assert.equal(treeToLBC(tree), '[X] > 5');
});

QUnit.test("Comparison operators are translated correctly", function(assert) {
  var tree = {
    tag: 'ComparisonOp',
    value: '>'
  };
  assert.equal(treeToLBC(tree), '>');

  tree = {
    tag: 'ComparisonOp',
    value: '<'
  };
  assert.equal(treeToLBC(tree), '<');

  tree = {
    tag: 'ComparisonOp',
    value: '='
  };
  assert.equal(treeToLBC(tree), '=');

  tree = {
    tag: 'ComparisonOp',
    value: '>='
  };
  assert.equal(treeToLBC(tree), '>=');

  tree = {
    tag: 'ComparisonOp',
    value: '<='
  };
  assert.equal(treeToLBC(tree), '<=');

  tree = {
    tag: 'ComparisonOp',
    value: '!='
  };
  assert.equal(treeToLBC(tree), '!=');

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
          tag: 'ComparisonOp',
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
        tag: 'Concentration',
        value: 'A'
      },
      {
        tag: 'ComparisonOp',
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

QUnit.test("TempCompInterval is translated correctly", function(assert) {
  var tree = {
    tag: 'TempCompInterval',
    children: [
      {
        tag: 'TemporalInterval',
        children: [
          {
            tag: 'Global'
          },
          {
            tag: 'IntervalStart',
            value: '5'
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
            value: 'B'
          },
          {
            tag: 'ComparisonOp',
            value: '='
          },
          {
            tag: 'Real',
            value: '0.75'
          }
        ]
      }
    ]
  };

  assert.equal(treeToLBC(tree), 'G{5, 15}([B] = 0.75)');

  tree.children[0].children[0].tag = 'Future';
  assert.equal(treeToLBC(tree), 'F{5, 15}([B] = 0.75)');
});
