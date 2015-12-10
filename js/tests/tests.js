require.config({
  baseUrl: 'js/lib',
  paths: {
    parsing: '../parsing',
    'app': '../app'
  }
});

require(['parsing/lbc-parser', 'app']);

QUnit.test( "parse test", function( assert ) {
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
                    "tag": [
                      "X"
                    ],
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
                "tag": [
                  "5"
                ],
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
