QUnit.module("Block -> LBC, English", function(hooks) {
  hooks.beforeEach(function() {
    this.workspace = new Blockly.Workspace();
  });

  QUnit.module("Single-block tests");

  QUnit.test("Concentration block generates correct translations", function(assert) {
    // make a new Concentration block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_concentration');

    // set the block's SPECIES input field value to 'A'
    block.setFieldValue('A', 'SPECIES');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '[A]', '"the concentration of A" block translates to "[A]" in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A', '"the concentration of A" block translates to "the concentration of A" in English');
  });

  QUnit.test("Real block generates correct translations", function(assert) {
    // make a new Real block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_real');

    // set the block's NUM input field value to '15'
    block.setFieldValue('15', 'NUM');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '15', '"15" in Real block translates to "15" in LBC');
    assert.equal(treeToEnglish(tree), '15', '"15" in Real block translates to "15" in English');
  });

  QUnit.test("Global block generates correct translations", function(assert) {
    // make a new Global block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_global');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G()', '"It is always the case that" block translates to "G()" in LBC');
    assert.equal(treeToEnglish(tree), 'always', '"It is always the case that" block translates to "always" in English');
  });

  QUnit.test("Future block generates correct translations", function(assert) {
    // make a new Future block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_future');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F()', '"Eventually" block translates to "F()" in LBC');
    assert.equal(treeToEnglish(tree), 'eventually', '"Eventually" block translates to "eventually" in English');
  });

  QUnit.test("Arithmetic block generates correct translations", function(assert) {
    // make a new Arithmetic block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_arithmetic');

    // set the block's SPECIES input field value to 'A'
    block.setFieldValue('A', 'SPECIES');
    // set the block's OP input field value to 'ADD'
    block.setFieldValue('ADD', 'OP');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '([A] + )', 'Arithmetic block with + operator translates to "([A] + )" in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A plus ', 'Arithmetic block with + operator translates to "the concentration of A plus " in English');

    block.setFieldValue('SUBTRACT', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '([A] - )', 'Arithmetic block with - operator translates to "([A] - )" in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A minus ', 'Arithmetic block with - operator translates to "the concentration of A minus " in English');

    block.setFieldValue('MULTIPLY', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '([A] * )', 'Arithmetic block with * operator translates to "([A] * )" in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A multiplied by ', 'Arithmetic block with * operator translates to "the concentration of A multiplied by " in English');

    block.setFieldValue('DIVIDE', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '([A] / )', 'Arithmetic block with / operator translates to "([A] / )" in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A divided by ', 'Arithmetic block with / operator translates to "the concentration of A divided by " in English');
  });

  QUnit.test("Comment block with input generates correct translations", function(assert) {
    // make a new Comment block with input
    var block = Blockly.Block.obtain(this.workspace, 'lbc_comment_with_input');

    // set the block's TEXT input field value to 'this is a comment'
    block.setFieldValue('this is a comment', 'TEXT');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '"this is a comment" ', 'Comment block containing "this is a comment" translates to  "this is a comment" with trailing space in LBC');
    assert.equal(treeToEnglish(tree), '"this is a comment" .', 'Comment block containing "this is a comment" translates to "this is a comment" with trailing space in English');
  });

  QUnit.test("Comment block with output generates correct translations", function(assert) {
    // make a new Comment block with output
    var block = Blockly.Block.obtain(this.workspace, 'lbc_comment_with_output');

    // set the block's TEXT input field value to 'this is a comment'
    block.setFieldValue('this is a comment', 'TEXT');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '"this is a comment"', 'Comment block containing "this is a comment" translates to  "this is a comment" in LBC');
    assert.equal(treeToEnglish(tree), '"this is a comment"', 'Comment block containing "this is a comment" translates to  "this is a comment" in English');
  });

  QUnit.test("Comparison block generates correct translations", function(assert) {
    // make a new Comparison block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_compare');

    // set the block's SPECIES input field value to 'A'
    block.setFieldValue('A', 'SPECIES');
    // set the block's OPERATOR input field value to 'greater than'
    block.setFieldValue('GT', 'OP');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '[A] > ', 'Comparison block with A as species and "greater than" as operator translates to "[A] > " in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A is greater than ', 'Comparison block with A as species and "greater than" as operator translates to "the concentration of A is greater than " in English');

    block.setFieldValue('LT', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '[A] < ', 'Comparison block with A as species and "less than" as operator translates to "[A] < " in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A is less than ', 'Comparison block with A as species and "less than" as operator translates to "the concentration of A is less than " in English');

    block.setFieldValue('EQ', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '[A] = ', 'Comparison block with A as species and "equal to" as operator translates to "[A] = " in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A is equal to ', 'Comparison block with A as species and "equal to" as operator translates to "the concentration of A is equal to " in English');

    block.setFieldValue('NEQ', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), '[A] != ', 'Comparison block with A as species and "not equal to" as operator translates to "[A] != " in LBC');
    assert.equal(treeToEnglish(tree), 'the concentration of A is not equal to ', 'Comparison block with A as species and "not equal to" as operator translates to "the concentration of A is not equal to " in English');
  });

  QUnit.test("Comparison block with inbuilt temporal drop-down generates correct translations", function(assert) {
    // make a new Comparison block with inbuilt temporal
    var block = Blockly.Block.obtain(this.workspace, 'lbc_compare_inbuilt_temporal');

    // set the block's SPECIES input field value to 'A'
    block.setFieldValue('A', 'SPECIES');
    // set the block's OPERATOR input field value to 'greater than'
    block.setFieldValue('GT', 'OP');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F([A] > )', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and ">" as operator, translates to "F([A] > )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is eventually greater than .', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and ">" as operator, translates to "the concentration of A is eventually greater than " in English');

    // now test the rest of the possible operators
    block.setFieldValue('LT', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F([A] < )', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and "<" as operator, translates to "F([A] < )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is eventually less than .', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and "<" as operator, translates to "the concentration of A is eventually less than " in English');

    block.setFieldValue('EQ', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F([A] = )', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and "=" as operator, translates to "F([A] = )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is eventually equal to .', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and "=" as operator, translates to "the concentration of A is eventually equal to " in English');

    block.setFieldValue('NEQ', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F([A] != )', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and "!=" as operator, translates to "F([A] != )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is eventually not equal to .', 'Comparison block with inbuilt temporal, having "eventually" as temporal, "A" as species, and "!=" as operator, translates to "the concentration of A is eventually not equal to " in English');

    // do it all over again, but for 'always'
    block.setFieldValue('G', 'TEMP');
    block.setFieldValue('GT', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G([A] > )', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and ">" as operator, translates to "G([A] > )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is always greater than .', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and ">" as operator, translates to "the concentration of A is always greater than " in English');

    block.setFieldValue('LT', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G([A] < )', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and "<" as operator, translates to "G([A] < )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is always less than .', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and "<" as operator, translates to "the concentration of A is always less than " in English');

    block.setFieldValue('EQ', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G([A] = )', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and "=" as operator, translates to "G([A] = )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is always equal to .', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and "=" as operator, translates to "the concentration of A is always equal to " in English');

    block.setFieldValue('NEQ', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G([A] != )', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and "!=" as operator, translates to "G([A] != )" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A is always not equal to .', 'Comparison block with inbuilt temporal, having "always" as temporal, "A" as species, and "!=" as operator, translates to "the concentration of A is always not equal to " in English');
  });

  QUnit.test("Comparison block with inbuilt 'drops/rises to and stays below/above' menu generates correct translations", function(assert) {
    // make a new Comparison block with inbuilt 'drops/rises to and stays below/above' menu
    var block = Blockly.Block.obtain(this.workspace, 'lbc_compare_inbuilt_stays');

    // set the block's SPECIES input field value to 'A'
    block.setFieldValue('A', 'SPECIES');
    // set the block's OPERATOR input field value to 'greater than' (rises to and stays above)
    block.setFieldValue('GT', 'OP');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F(G([A] > ))', 'F(G())-style block, having "rises to and stays above" as temporal, "A" as species, translates to "F(G([A] > ))" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A eventually rises to and stays above .', 'F(G())-style block, having "rises to and stays above" as temporal, "A" as species, translates to "The concentration of A eventually rises to and stays above ." in English');

    block.setFieldValue('LT', 'OP'); // 'less than' = drops to and stays below
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F(G([A] < ))', 'F(G())-style block, having "drops to and stays below" as temporal, "A" as species, translates to "F(G([A] < ))" in LBC');
    assert.equal(treeToEnglish(tree), 'The concentration of A eventually drops to and stays below .', 'F(G())-style block, having "drops to and stays below" as temporal, "A" as species, translates to "The concentration of A eventually drops to and stays below ." in English');
  });

  QUnit.test("Temporal interval block generates correct translations", function(assert) {
    // make a new Temporal Interval block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval');

    // set the block's TEMP input field value to 'F' ('some point')
    block.setFieldValue('F', 'TEMP');
    // set the block's START input field value to '5'
    block.setFieldValue('5', 'START');
    // set the block's END input field value to '15'
    block.setFieldValue('15', 'END');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F{5, 15}()', 'Temporal interval block, with start at 5, end at 15, and "some point" selected, translates to "F{5, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'At some point between times 5 and 15, .', 'Temporal interval block, with start at 5, end at 15, and "some point" selected, translates to "At some point between times 5 and 15, ." in English');

    block.setFieldValue('G', 'TEMP'); // 'all points'
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G{5, 15}()', 'Temporal interval block, with start at 5, end at 15, and "all points" selected, translates to "G{5, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'Between times 5 and 15, always .', 'Temporal interval block, with start at 5, end at 15, and "all points" selected, translates to "Between times 5 and 15, always ." in English');
  });

  QUnit.test("Temporal interval block with only end modifiable generates correct translations", function(assert) {
    // make a new Temporal Interval 'up to' block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval_upto');

    // set the block's TEMP input field value to 'F' ('some point')
    block.setFieldValue('F', 'TEMP');
    // set the block's END input field value to '15'
    block.setFieldValue('15', 'END');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F{0, 15}()', 'Temporal interval "up to" block, with end at 15, and "some point" selected, translates to "F{0, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'At some point up to time 15, .', 'Temporal interval "up to" block, with end at 15, and "some point" selected, translates to "At some point up to time 15, ." in English');

    block.setFieldValue('G', 'TEMP'); // 'all points'
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G{0, 15}()', 'Temporal interval "up to" block, end at 15, and "all points" selected, translates to "G{0, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'Before time 15, always .', 'Temporal interval block, with start at 5, end at 15, and "all points" selected, translates to "Before time 15, always ." in English');
  });
});
