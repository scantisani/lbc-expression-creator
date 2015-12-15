QUnit.module("Tree-to-English tests");
QUnit.test("Full tree for 'Future Concentration A > 0' is translated correctly", function(assert) {
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

  assert.equal(treeToEnglish(tree), 'The concentration of A is eventually greater than 0.');
});
