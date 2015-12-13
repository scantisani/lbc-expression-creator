require.config({
  baseUrl: 'js/lib',
  paths: {
    parsing: '../parsing',
    'app': '../app'
  }
});

require(['parsing/lbc-parser', 'app']);

QUnit.module("Operator parsing tests");
QUnit.test("Greater Than operator parses as expected", function(assert) {
  var tree = {
    "tag": "Expression",
    "children": [
      {
        "tag": "Future",
        "children": []
      },
      {
        "tag": "Comparison",
        "children": [
          {
            "tag": "Concentration",
            "value": "X"
          },
          {
            "tag": 'Comparison_Op',
            "value": ">"
          },
          {
            "tag": "Real",
            "value": "5"
          }
        ]
      }
    ]
  };

  // increase max depth so the diff is visible in case of error
  QUnit.dump.maxDepth = 20;
  assert.deepEqual(parseExpression('Future Concentration X > 5'), tree, "Expression 'Future Concentration X > 5' parses correctly");
});

QUnit.test( "Less Than operator functions as expected", function(assert) {
  var tree = {
    "tag": "Expression",
    "children": [
      {
        "tag": "Future",
        "children": []
      },
      {
        "tag": "Comparison",
        "children": [
          {
            "tag": "Concentration",
            "value": "X"
          },
          {
            "tag": 'Comparison_Op',
            "value": "<"
          },
          {
            "tag": "Real",
            "value": "5"
          }
        ]
      }
    ]
  };

  // increase max depth so the diff is visible in case of error
  QUnit.dump.maxDepth = 20;
  assert.deepEqual(parseExpression('Future Concentration X < 5'), tree, "Expression 'Future Concentration X < 5' parses correctly");
});

QUnit.test("Equality operator parses as expected", function(assert) {
  var tree = {
    "tag": "Expression",
    "children": [
      {
        "tag": "Future",
        "children": []
      },
      {
        "tag": "Comparison",
        "children": [
          {
            "tag": "Concentration",
            "children": [
              {
                "tag": "Concentration_Op",
                "children": []
              },
              {
                "tag": "Species",
                "children": [
                  {
                    "tag": "X",
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "tag": 'Comparison_Op',
            "children": [{
              "tag": "=",
              "children": []
            }]
          },
          {
            "tag": "Real",
            "children": [
              {
                "tag": "5",
                "children": []
              }
            ]
          }
        ]
      }
    ]
  };

  // increase max depth so the diff is visible in case of error
  QUnit.dump.maxDepth = 20;
  assert.deepEqual(parseExpression('Future Concentration X = 5'), tree, "Expression 'Future Concentration X = 5' parses correctly");
});

QUnit.test( "Not Equal operator parses as expected", function(assert) {
  var tree = {
    "tag": "Expression",
    "children": [
      {
        "tag": "Future",
        "children": []
      },
      {
        "tag": "Comparison",
        "children": [
          {
            "tag": "Concentration",
            "value": "X"
          },
          {
            "tag": 'Comparison_Op',
            "value": "!="
          },
          {
            "tag": "Real",
            "value": "5"
          }
        ]
      }
    ]
  };

  // increase max depth so the diff is visible in case of error
  QUnit.dump.maxDepth = 20;
  assert.deepEqual(parseExpression('Future Concentration X != 5'), tree, "Expression 'Future Concentration X != 5' parses correctly");
});

QUnit.test("Greater Than or Equal To operator functions as expected", function(assert) {
  var tree = {
    "tag": "Expression",
    "children": [
      {
        "tag": "Future",
        "children": []
      },
      {
        "tag": "Comparison",
        "children": [
          {
            "tag": "Concentration",
            "children": [
              {
                "tag": "Concentration_Op",
                "children": []
              },
              {
                "tag": "Species",
                "children": [
                  {
                    "tag": "X",
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "tag": 'Comparison_Op',
            "children": [{
              "tag": ">=",
              "children": []
            }]
          },
          {
            "tag": "Real",
            "children": [
              {
                "tag": "5",
                "children": []
              }
            ]
          }
        ]
      }
    ]
  };

  // increase max depth so the diff is visible in case of error
  QUnit.dump.maxDepth = 20;
  assert.deepEqual(parseExpression('Future Concentration X >= 5'), tree, "Expression 'Future Concentration X >= 5' parses correctly");
});

QUnit.test("Less Than Or Equal operator parses as expected", function(assert) {
  var tree = {
    "tag": "Expression",
    "children": [
      {
        "tag": "Future",
        "children": []
      },
      {
        "tag": "Comparison",
        "children": [
          {
            "tag": "Concentration",
            "children": [
              {
                "tag": "Concentration_Op",
                "children": []
              },
              {
                "tag": "Species",
                "children": [
                  {
                    "tag": "X",
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "tag": 'Comparison_Op',
            "children": [{
              "tag": "<=",
              "children": []
            }]
          },
          {
            "tag": "Real",
            "children": [
              {
                "tag": "5",
                "children": []
              }
            ]
          }
        ]
      }
    ]
  };

  // increase max depth so the diff is visible in case of error
  QUnit.dump.maxDepth = 20;
  assert.deepEqual(parseExpression('Future Concentration X <= 5'), tree, "Expression 'Future Concentration X <= 5' parses correctly");
});

QUnit.module("Syntax tree to LBC translation tests");
QUnit.test("Tree for 'Future Concentration A > 0' is translated correctly", function(assert) {
  var tree = {
    "tag": "Expression",
    "children": [
      {
        "tag": "Future",
        "children": []
      },
      {
        "tag": "Comparison",
        "children": [
          {
            "tag": "Concentration",
            "children": [
              {
                "tag": "Concentration_Op",
                "children": []
              },
              {
                "tag": "Species",
                "value": "A"
              }
            ]
          },
          {
            "tag": "Comparison_Op",
            "children": [{
              "tag": ">",
              "children": []
            }]
          },
          {
            "tag": "Real",
            "value": "0"
          }
        ]
      }
    ]
  };

  assert.equal(treeToLBC(tree), 'F([A] > 0)');
});

QUnit.test("Real values are translated correctly", function(assert) {
  var tree = {
    "tag": "Real",
    "value": "5"
  };

  assert.equal(treeToLBC(tree), '5');
});

QUnit.test("Concentrations are translated correctly", function(assert) {
  var tree = {
    "tag": "Concentration",
    "value": "A"
  };
  assert.equal(treeToLBC(tree), '[A]');

  tree = {
    "tag": "Concentration",
    "value": "phos"
  };
  assert.equal(treeToLBC(tree), '[phos]');
});

QUnit.test("Values are translated correctly", function(assert) {
  var tree = {
    "tag": "Value",
    "children": [{
      "tag": "Concentration",
      "value": "A"
    }]
  };
  assert.equal(treeToLBC(tree), '[A]');

  tree = {
    "tag": "Value",
    "children": [{
      "tag": "Real",
      "value": "15"
    }]
  };
  assert.equal(treeToLBC(tree), '15');
});

QUnit.test("Comparison operators are translated correctly", function(assert) {
  var tree = {
    "tag": "Comparison_Op",
    "value": ">"
  };
  assert.equal(treeToLBC(tree), '>');

  tree = {
    "tag": "Comparison_Op",
    "value": "<"
  };
  assert.equal(treeToLBC(tree), '<');

  tree = {
    "tag": "Comparison_Op",
    "value": "="
  };
  assert.equal(treeToLBC(tree), '=');

  tree = {
    "tag": "Comparison_Op",
    "value": ">="
  };
  assert.equal(treeToLBC(tree), '>=');

  tree = {
    "tag": "Comparison_Op",
    "value": "<="
  };
  assert.equal(treeToLBC(tree), '<=');

  tree = {
    "tag": "Comparison_Op",
    "value": "!="
  };
  assert.equal(treeToLBC(tree), '!=');

});

QUnit.test("Global is translated correctly", function(assert) {
  var tree = {
    "tag": "Global"
  };

  assert.equal(treeToLBC(tree), 'G');
});

QUnit.test("Future is translated correctly", function(assert) {
  var tree = {
    "tag": "Future"
  };

  assert.equal(treeToLBC(tree), 'F');
});

QUnit.test("Temporal is translated correctly", function(assert) {
  var tree = {
    "tag": "Temporal",
    "children": [{
      "tag": "Future"
    }]
  };
  assert.equal(treeToLBC(tree), 'F');

  tree = {
    "tag": "Temporal",
    "children": [{
      "tag": "Global"
    }]
  };
  assert.equal(treeToLBC(tree), 'G');
});

QUnit.test("Comparison is translated correctly", function(assert) {
  var tree = {
    "tag": "Comparison",
    "children": [
      {
        "tag": "Concentration",
        "value": "X"
      },
      {
        "tag": 'Comparison_Op',
        "value": ">"
      },
      {
        "tag": "Real",
        "value": "5"
      }
    ]
  };

  assert.equal(treeToLBC(tree), '[X] > 5');
});
