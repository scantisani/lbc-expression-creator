QUnit.module("Tree -> English");
QUnit.test("Expr1 is translated correctly", function(assert) {
  var tree = {
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
            value: '0'
          }
        ]
      }
    ]
  };

  assert.equal(treeToEnglish(tree), 'The concentration of A is eventually greater than 0.');
});

QUnit.test("Expr2 is translated correctly", function(assert) {
  var tree = {
    tag: 'Expr2',
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

  assert.equal(treeToEnglish(tree), 'The concentration of A is eventually greater than 5.');
});

QUnit.test("Expr3 is translated correctly", function(assert) {
  var tree = {
    tag: 'Expr3',
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

  assert.equal(treeToEnglish(tree), 'The concentration of A eventually drops to and stays below 5.');

  // set the operator in the tree to '>'
  tree.children[1].value = '>';

  assert.equal(treeToEnglish(tree), 'The concentration of A eventually rises to and stays above 5.');
});

QUnit.test("Expr4 is translated correctly", function(assert) {
  var tree = {
    tag: 'Expr4',
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

  assert.equal(treeToEnglish(tree), 'Between times 5 and 15, the concentration of B is always equal to 0.75.');

  tree.children[0].children[0].tag = 'Future';
  assert.equal(treeToEnglish(tree), 'At some point between times 5 and 15, the concentration of B is equal to 0.75.');
});

QUnit.test("Real values are translated correctly", function(assert) {
  var tree = {
    tag: 'Real',
    value: '5'
  };

  assert.equal(treeToEnglish(tree), '5');
});

QUnit.test("Concentrations are translated correctly", function(assert) {
  var tree = {
    tag: 'Concentration',
    value: 'A'
  };
  assert.equal(treeToEnglish(tree), 'the concentration of A');

  tree = {
    tag: 'Concentration',
    value: 'phos'
  };
  assert.equal(treeToEnglish(tree), 'the concentration of phos');
});

QUnit.test("Global is translated correctly", function(assert) {
  var tree = {
    tag: 'Global'
  };

  assert.equal(treeToEnglish(tree), 'always');
});

QUnit.test("Future is translated correctly", function(assert) {
  var tree = {
    tag: 'Future'
  };

  assert.equal(treeToEnglish(tree), 'eventually');
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

  assert.equal(treeToEnglish(tree), 'the concentration of X is greater than 5');
});

QUnit.test("Comparison operators are translated correctly", function(assert) {
  var tree = {
    tag: 'ComparisonOp',
    value: '>'
  };
  assert.equal(treeToEnglish(tree), 'greater than');

  tree = {
    tag: 'ComparisonOp',
    value: '<'
  };
  assert.equal(treeToEnglish(tree), 'less than');

  tree = {
    tag: 'ComparisonOp',
    value: '='
  };
  assert.equal(treeToEnglish(tree), 'equal to');

  tree = {
    tag: 'ComparisonOp',
    value: '>='
  };
  assert.equal(treeToEnglish(tree), 'greater than or equal to');

  tree = {
    tag: 'ComparisonOp',
    value: '<='
  };
  assert.equal(treeToEnglish(tree), 'less than or equal to');

  tree = {
    tag: 'ComparisonOp',
    value: '!='
  };
  assert.equal(treeToEnglish(tree), 'not equal to');

});
