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
    value: '!='
  };
  assert.equal(treeToEnglish(tree), 'not equal to');

});

QUnit.test("Non-recursive arithmetic is translated correctly", function(assert) {
  tree = {
    tag: 'Arithmetic',
    children: [
      {
        tag: 'Concentration',
        value: 'A'
      },
      {
        tag: 'ArithOperator',
        value: '+'
      },
      {
        tag: 'Real',
        value: '15'
      }
    ]
  };
  assert.equal(treeToEnglish(tree), 'the concentration of A plus 15');

  tree.children[1].value = '-';
  assert.equal(treeToEnglish(tree), 'the concentration of A minus 15');
  tree.children[1].value = '*';
  assert.equal(treeToEnglish(tree), 'the concentration of A multiplied by 15');
  tree.children[1].value = '/';
  assert.equal(treeToEnglish(tree), 'the concentration of A divided by 15');

  tree = {
    tag: 'Arithmetic',
    children: [
      {
        tag: 'Concentration',
        value: 'V'
      },
      {
        tag: 'ArithOperator',
        value: '+'
      },
      {
        tag: 'Concentration',
        value: 'T'
      }
    ]
  };
  assert.equal(treeToEnglish(tree), 'the concentration of V plus the concentration of T');

  tree.children[1].value = '-';
  assert.equal(treeToEnglish(tree), 'the concentration of V minus the concentration of T');
  tree.children[1].value = '*';
  assert.equal(treeToEnglish(tree), 'the concentration of V multiplied by the concentration of T');
  tree.children[1].value = '/';
  assert.equal(treeToEnglish(tree), 'the concentration of V divided by the concentration of T');
});

QUnit.test("Recursive arithmetic is translated correctly", function(assert) {
  tree = {
    tag: 'Arithmetic',
    children: [
      {
        tag: 'Concentration',
        value: 'A'
      },
      {
        tag: 'ArithOperator',
        value: '+'
      },
      {
        tag: 'Arithmetic',
        children: [
          {
            tag: 'Concentration',
            value: 'B'
          },
          {
            tag: 'ArithOperator',
            value: '+'
          },
          {
            tag: 'Real',
            value: '15'
          }
        ]
      }
    ]
  };
assert.equal(treeToEnglish(tree), 'the concentration of A, plus the concentration of B plus 15');

tree.children[1].value = '-';
assert.equal(treeToEnglish(tree), 'the concentration of A, minus the concentration of B plus 15');
  tree.children[1].value = '*';
  assert.equal(treeToEnglish(tree), 'the concentration of A, multiplied by the concentration of B plus 15');
  tree.children[1].value = '/';
  assert.equal(treeToEnglish(tree), 'the concentration of A, divided by the concentration of B plus 15');

  tree = {
    tag: 'Arithmetic',
    children: [
      {
        tag: 'Concentration',
        value: 'X'
      },
      {
        tag: 'ArithOperator',
        value: '+'
      },
      {
        tag: 'Arithmetic',
        children: [
          {
            tag: 'Concentration',
            value: 'Y'
          },
          {
            tag: 'ArithOperator',
            value: '+'
          },
          {
            tag: 'Concentration',
            value: 'Z'
          }
        ]
      }
    ]
  };
  assert.equal(treeToEnglish(tree), 'the concentration of X, plus the concentration of Y plus the concentration of Z');

  tree.children[1].value = '-';
  assert.equal(treeToEnglish(tree), 'the concentration of X, minus the concentration of Y plus the concentration of Z');
  tree.children[1].value = '*';
  assert.equal(treeToEnglish(tree), 'the concentration of X, multiplied by the concentration of Y plus the concentration of Z');
  tree.children[1].value = '/';
  assert.equal(treeToEnglish(tree), 'the concentration of X, divided by the concentration of Y plus the concentration of Z');
});
