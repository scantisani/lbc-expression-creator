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
        "tag": "Conditional",
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
            "tag": ">",
            "children": []
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
        "tag": "Conditional",
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
            "tag": "<",
            "children": []
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
        "tag": "Conditional",
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
            "tag": "=",
            "children": []
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
        "tag": "Conditional",
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
            "tag": "!=",
            "children": []
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
        "tag": "Conditional",
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
            "tag": ">=",
            "children": []
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
        "tag": "Conditional",
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
            "tag": "<=",
            "children": []
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

// QUnit.module("Syntax tree to LBC translation tests");
// QUnit.test("", function(assert) {

// });
