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
    assert.equal(treeToEnglish(tree), 'It is always the case that', '"It is always the case that" block translates to "It is always the case that" in English');
  });

  QUnit.test("Future block generates correct translations", function(assert) {
    // make a new Future block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_future');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F()', '"Eventually" block translates to "F()" in LBC');
    assert.equal(treeToEnglish(tree), 'Eventually,', '"Eventually" block translates to "Eventually," in English');
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
    // set the block's TEMP input field value to 'Future'
    block.setFieldValue('FUTURE', 'TEMP');

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
    block.setFieldValue('GLOBAL', 'TEMP');
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
    block.setFieldValue('FUTURE', 'TEMP');
    // set the block's START input field value to '5'
    block.setFieldValue('5', 'START');
    // set the block's END input field value to '15'
    block.setFieldValue('15', 'END');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F{5, 15}()', 'Temporal interval block, with start at 5, end at 15, and "some point" selected, translates to "F{5, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'At some point between times 5 and 15,', 'Temporal interval block, with start at 5, end at 15, and "some point" selected, translates to "At some point between times 5 and 15," in English');

    block.setFieldValue('GLOBAL', 'TEMP'); // 'all points'
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G{5, 15}()', 'Temporal interval block, with start at 5, end at 15, and "all points" selected, translates to "G{5, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'At all points between times 5 and 15,', 'Temporal interval block, with start at 5, end at 15, and "all points" selected, translates to "At all points between times 5 and 15," in English');
  });

  QUnit.test("Temporal interval block with only end modifiable generates correct translations", function(assert) {
    // make a new Temporal Interval 'up to' block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval_upto');

    // set the block's TEMP input field value to 'F' ('some point')
    block.setFieldValue('FUTURE', 'TEMP');
    // set the block's END input field value to '15'
    block.setFieldValue('15', 'END');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'F{0, 15}()', 'Temporal interval "up to" block, with end at 15, and "some point" selected, translates to "F{0, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'At some point before time 15,', 'Temporal interval "up to" block, with end at 15, and "some point" selected, translates to "At some point before time 15," in English');

    block.setFieldValue('GLOBAL', 'TEMP'); // 'all points'
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), 'G{0, 15}()', 'Temporal interval "up to" block, end at 15, and "all points" selected, translates to "G{0, 15}()" in LBC');
    assert.equal(treeToEnglish(tree), 'At all points before time 15,', 'Temporal interval block, with start at 5, end at 15, and "all points" selected, translates to "At all points before time 15," in English');
  });

  QUnit.test("Conjunction/disjunction block generates correct translations", function(assert) {
    // make a new Conjunction/disjunction block
    var block = Blockly.Block.obtain(this.workspace, 'lbc_and_or');

    // set the block's OPERATOR input field value to 'AND' ('all of the following are true')
    block.setFieldValue('AND', 'OP');

    var tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), ' \u2227 ', 'Conjunction/disjunction block, with conjunction selected, translates to " \u2227 " (logical and operator) in LBC');
    assert.equal(treeToEnglish(tree), ' and ', 'Conjunction/disjunction block, with conjunction selected, translates to " and " in English');

    block.setFieldValue('OR', 'OP');
    tree = workspaceToObject(this.workspace);

    assert.equal(treeToLBC(tree), ' \u2228 ', 'Conjunction/disjunction block, with disjunction selected, translates to " \u2228 " (logical or operator) in LBC');
    assert.equal(treeToEnglish(tree), ' or ', 'Conjunction/disjunction block, with disjunction selected, translates to " or " in English');
  });

  QUnit.module("Multiple-block tests for comparison blocks", function(hooks) {
    // set up all the blocks that can be connected to a Comparison-class block
    hooks.beforeEach(function() {
      this.real = Blockly.Block.obtain(this.workspace, 'lbc_real');
      this.real.setFieldValue('15', 'NUM');

      this.concentration = Blockly.Block.obtain(this.workspace, 'lbc_concentration');
      this.concentration.setFieldValue('B', 'SPECIES');

      this.arith = Blockly.Block.obtain(this.workspace, 'lbc_arithmetic');
      this.arith.setFieldValue('C', 'SPECIES');
      this.arith.setFieldValue('ADD', 'OP');
      this.arith_real = Blockly.Block.obtain(this.workspace, 'lbc_real');
      this.arith_real.setFieldValue('15', 'NUM');
      connectBlocks(this.arith, this.arith_real, 'ARGUMENT');

      this.comment = Blockly.Block.obtain(this.workspace, 'lbc_comment_with_output');
      this.comment.setFieldValue('some arbitrary words', 'TEXT');
    });

    // connect each block to the Comparison-class block in turn, testing the translation
    // against the (test-specific) expected values for that particular Comparison block
    hooks.afterEach(function(assert) {
      connectBlocks(this.block, this.real, 'ARGUMENT');
      var tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.real);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.real);

      this.real.unplug();
      connectBlocks(this.block, this.concentration, 'ARGUMENT');
      tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.concentration);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.concentration);

      this.concentration.unplug();
      connectBlocks(this.block, this.arith, 'ARGUMENT');
      tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.arith);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.arith);

      this.arith.unplug();
      connectBlocks(this.block, this.comment, 'ARGUMENT');
      tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.comment);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.comment);
    });

    QUnit.test("Comparison block generates correct translations", function() {
      // make a new Comparison block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_compare');

      // set the block's SPECIES input field value to 'A'
      this.block.setFieldValue('A', 'SPECIES');
      // set the block's OPERATOR input field value to 'greater than'
      this.block.setFieldValue('GT', 'OP');

      this.expectedLBC = {
        real: '[A] > 15',
        concentration: '[A] > [B]',
        arith: '[A] > ([C] + 15)',
        comment: '[A] > "some arbitrary words"'
      };

      // lowercase and missing full stop because this is an incomplete set of blocks
      this.expectedEnglish = {
        real: 'the concentration of A is greater than 15',
        concentration: 'the concentration of A is greater than the concentration of B',
        arith: 'the concentration of A is greater than the concentration of C plus 15',
        comment: 'the concentration of A is greater than "some arbitrary words"'
      };
    });

    QUnit.test("Comparison block with inbuilt 'always/eventually' generates correct translations", function() {
      // make a new Comparison block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_compare_inbuilt_temporal');

      // set the block's SPECIES input field value to 'A'
      this.block.setFieldValue('A', 'SPECIES');
      // set the block's TEMPORAL input field value to 'FUTURE'/'Eventually'
      this.block.setFieldValue('FUTURE', 'TEMP');
      // set the block's OPERATOR input field value to 'greater than'
      this.block.setFieldValue('GT', 'OP');

      this.expectedLBC = {
        real: 'F([A] > 15)',
        concentration: 'F([A] > [B])',
        arith: 'F([A] > ([C] + 15))',
        comment: 'F([A] > "some arbitrary words")'
      };

      this.expectedEnglish = {
        real: 'The concentration of A is eventually greater than 15.',
        concentration: 'The concentration of A is eventually greater than the concentration of B.',
        arith: 'The concentration of A is eventually greater than the concentration of C plus 15.',
        comment: 'The concentration of A is eventually greater than "some arbitrary words".'
      };
    });

    QUnit.test("Comparison block with inbuilt 'drops/rises to and stays below/above' generates correct translations", function() {
      // make a new Comparison block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_compare_inbuilt_stays');

      // set the block's SPECIES input field value to 'A'
      this.block.setFieldValue('A', 'SPECIES');
      // set the block's OPERATOR input field value to 'greater than' ('rises to and stays above')
      this.block.setFieldValue('GT', 'OP');

      this.expectedLBC = {
        real: 'F(G([A] > 15))',
        concentration: 'F(G([A] > [B]))',
        arith: 'F(G([A] > ([C] + 15)))',
        comment: 'F(G([A] > "some arbitrary words"))'
      };

      this.expectedEnglish = {
        real: 'The concentration of A eventually rises to and stays above 15.',
        concentration: 'The concentration of A eventually rises to and stays above the concentration of B.',
        arith: 'The concentration of A eventually rises to and stays above the concentration of C plus 15.',
        comment: 'The concentration of A eventually rises to and stays above "some arbitrary words".'
      };
    });
  });

  QUnit.module("Multiple-block tests for temporal blocks", function(hooks) {
    // set up all the blocks that can be connected to a Temporal-class (red) block
    hooks.beforeEach(function() {
      this.compare = Blockly.Block.obtain(this.workspace, 'lbc_compare');
      this.compare.setFieldValue('A', 'SPECIES');
      this.compare.setFieldValue('GT', 'OP');

      this.real = Blockly.Block.obtain(this.workspace, 'lbc_real');
      this.real.setFieldValue('15', 'NUM');

      this.concentration = Blockly.Block.obtain(this.workspace, 'lbc_concentration');
      this.concentration.setFieldValue('B', 'SPECIES');

      this.arith = Blockly.Block.obtain(this.workspace, 'lbc_arithmetic');
      this.arith.setFieldValue('C', 'SPECIES');
      this.arith.setFieldValue('ADD', 'OP');
      this.arith_real = Blockly.Block.obtain(this.workspace, 'lbc_real');
      this.arith_real.setFieldValue('15', 'NUM');
      connectBlocks(this.arith, this.arith_real, 'ARGUMENT');

      this.comment = Blockly.Block.obtain(this.workspace, 'lbc_comment_with_output');
      this.comment.setFieldValue('some arbitrary words', 'TEXT');
    });

    // connect the comparison block to our temporal block, then attach different blocks
    // to our comparison block; test the translation
    // against the (test-specific) expected values for that particular Temporal block
    hooks.afterEach(function(assert) {
      connectBlocks(this.block, this.compare, 'COMPARISON');

      connectBlocks(this.compare, this.real, 'ARGUMENT');
      var tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.real);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.real);

      this.real.unplug();
      connectBlocks(this.compare, this.concentration, 'ARGUMENT');
      tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.concentration);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.concentration);

      this.concentration.unplug();
      connectBlocks(this.compare, this.arith, 'ARGUMENT');
      tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.arith);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.arith);

      this.arith.unplug();
      connectBlocks(this.compare, this.comment, 'ARGUMENT');
      tree = blockToObject(this.block);
      assert.equal(treeToLBC(tree), this.expectedLBC.comment);
      assert.equal(treeToEnglish(tree), this.expectedEnglish.comment);
    });

    QUnit.test("Future block generates correct translations", function() {
      // make a new Future block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_future');

      this.expectedLBC = {
        real: 'F([A] > 15)',
        concentration: 'F([A] > [B])',
        arith: 'F([A] > ([C] + 15))',
        comment: 'F([A] > "some arbitrary words")'
      };

      // lowercase and missing full stop because this is an incomplete set of blocks
      this.expectedEnglish = {
        real: 'The concentration of A is eventually greater than 15.',
        concentration: 'The concentration of A is eventually greater than the concentration of B.',
        arith: 'The concentration of A is eventually greater than the concentration of C plus 15.',
        comment: 'The concentration of A is eventually greater than "some arbitrary words".'
      };
    });

    QUnit.test("Global block generates correct translations", function() {
      // make a new Global block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_global');

      this.expectedLBC = {
        real: 'G([A] > 15)',
        concentration: 'G([A] > [B])',
        arith: 'G([A] > ([C] + 15))',
        comment: 'G([A] > "some arbitrary words")'
      };

      this.expectedEnglish = {
        real: 'The concentration of A is always greater than 15.',
        concentration: 'The concentration of A is always greater than the concentration of B.',
        arith: 'The concentration of A is always greater than the concentration of C plus 15.',
        comment: 'The concentration of A is always greater than "some arbitrary words".'
      };
    });

    QUnit.test("Temporal interval block with 'all points' selected generates correct translations", function() {
      // make a new Temporal Interval block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval');
      this.block.setFieldValue('GLOBAL', 'TEMP');
      this.block.setFieldValue('5', 'START');
      this.block.setFieldValue('15', 'END');

      this.expectedLBC = {
        real: 'G{5, 15}([A] > 15)',
        concentration: 'G{5, 15}([A] > [B])',
        arith: 'G{5, 15}([A] > ([C] + 15))',
        comment: 'G{5, 15}([A] > "some arbitrary words")'
      };

      this.expectedEnglish = {
        real: 'Between times 5 and 15, the concentration of A is always greater than 15.',
        concentration: 'Between times 5 and 15, the concentration of A is always greater than the concentration of B.',
        arith: 'Between times 5 and 15, the concentration of A is always greater than the concentration of C plus 15.',
        comment: 'Between times 5 and 15, the concentration of A is always greater than "some arbitrary words".'
      };
    });

    QUnit.test("Temporal interval block with 'some point' selected generates correct translations", function() {
      // make a new Temporal Interval block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval');
      this.block.setFieldValue('FUTURE', 'TEMP');
      this.block.setFieldValue('5', 'START');
      this.block.setFieldValue('15', 'END');

      this.expectedLBC = {
        real: 'F{5, 15}([A] > 15)',
        concentration: 'F{5, 15}([A] > [B])',
        arith: 'F{5, 15}([A] > ([C] + 15))',
        comment: 'F{5, 15}([A] > "some arbitrary words")'
      };

      this.expectedEnglish = {
        real: 'At some point between times 5 and 15, the concentration of A is greater than 15.',
        concentration: 'At some point between times 5 and 15, the concentration of A is greater than the concentration of B.',
        arith: 'At some point between times 5 and 15, the concentration of A is greater than the concentration of C plus 15.',
        comment: 'At some point between times 5 and 15, the concentration of A is greater than "some arbitrary words".'
      };
    });

    QUnit.test("Temporal interval block with only end modifiable, with 'all points' selected, generates correct translations", function() {
      // make a new Temporal Interval block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval_upto');
      this.block.setFieldValue('GLOBAL', 'TEMP');
      this.block.setFieldValue('20', 'END');

      this.expectedLBC = {
        real: 'G{0, 20}([A] > 15)',
        concentration: 'G{0, 20}([A] > [B])',
        arith: 'G{0, 20}([A] > ([C] + 15))',
        comment: 'G{0, 20}([A] > "some arbitrary words")'
      };

      this.expectedEnglish = {
        real: 'Before time 20, the concentration of A is always greater than 15.',
        concentration: 'Before time 20, the concentration of A is always greater than the concentration of B.',
        arith: 'Before time 20, the concentration of A is always greater than the concentration of C plus 15.',
        comment: 'Before time 20, the concentration of A is always greater than "some arbitrary words".'
      };
    });

    QUnit.test("Temporal interval block with only end modifiable, with 'some point' selected, generates correct translations", function() {
      // make a new Temporal Interval block
      this.block = Blockly.Block.obtain(this.workspace, 'lbc_temporal_interval_upto');
      this.block.setFieldValue('FUTURE', 'TEMP');
      this.block.setFieldValue('20', 'END');

      this.expectedLBC = {
        real: 'F{0, 20}([A] > 15)',
        concentration: 'F{0, 20}([A] > [B])',
        arith: 'F{0, 20}([A] > ([C] + 15))',
        comment: 'F{0, 20}([A] > "some arbitrary words")'
      };

      this.expectedEnglish = {
        real: 'At some point before time 20, the concentration of A is greater than 15.',
        concentration: 'At some point before time 20, the concentration of A is greater than the concentration of B.',
        arith: 'At some point before time 20, the concentration of A is greater than the concentration of C plus 15.',
        comment: 'At some point before time 20, the concentration of A is greater than "some arbitrary words".'
      };
    });
  });

  QUnit.module("Multiple-block comment block tests", function(assert) {
    QUnit.test("Comment block with input generates correct translations", function(assert) {
      block = Blockly.Block.obtain(this.workspace, 'lbc_comment_with_input');
      block.setFieldValue('For some reason', 'TEXT');

      compare = Blockly.Block.obtain(this.workspace, 'lbc_compare');
      compare.setFieldValue('A', 'SPECIES');
      compare.setFieldValue('GT', 'OP');
      connectBlocks(block, compare, 'ARGUMENT');

      real = Blockly.Block.obtain(this.workspace, 'lbc_real');
      real.setFieldValue('15', 'NUM');
      connectBlocks(compare, real, 'ARGUMENT');

      var tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" [A] > 15');
      assert.equal(treeToEnglish(tree), '"For some reason" the concentration of A is greater than 15.');
      real.unplug();

      concentration = Blockly.Block.obtain(this.workspace, 'lbc_concentration');
      concentration.setFieldValue('B', 'SPECIES');
      connectBlocks(compare, concentration, 'ARGUMENT');

      tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" [A] > [B]');
      assert.equal(treeToEnglish(tree), '"For some reason" the concentration of A is greater than the concentration of B.');
      concentration.unplug();

      arith = Blockly.Block.obtain(this.workspace, 'lbc_arithmetic');
      arith.setFieldValue('C', 'SPECIES');
      arith.setFieldValue('ADD', 'OP');
      arith_real = Blockly.Block.obtain(this.workspace, 'lbc_real');
      arith_real.setFieldValue('15', 'NUM');
      connectBlocks(arith, arith_real, 'ARGUMENT');
      connectBlocks(compare, arith, 'ARGUMENT');

      tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" [A] > ([C] + 15)');
      assert.equal(treeToEnglish(tree), '"For some reason" the concentration of A is greater than the concentration of C plus 15.');
      arith.unplug();

      comment = Blockly.Block.obtain(this.workspace, 'lbc_comment_with_output');
      comment.setFieldValue('some arbitrary words', 'TEXT');
      connectBlocks(compare, comment, 'ARGUMENT');

      tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" [A] > "some arbitrary words"');
      assert.equal(treeToEnglish(tree), '"For some reason" the concentration of A is greater than "some arbitrary words".');
      compare.unplug();
      comment.unplug();

      connectBlocks(block, real, 'ARGUMENT');
      tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" 15');
      assert.equal(treeToEnglish(tree), '"For some reason" 15.');
      real.unplug();

      connectBlocks(block, concentration, 'ARGUMENT');
      tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" [B]');
      assert.equal(treeToEnglish(tree), '"For some reason" the concentration of B.');
      concentration.unplug();

      connectBlocks(block, arith, 'ARGUMENT');
      tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" ([C] + 15)');
      assert.equal(treeToEnglish(tree), '"For some reason" the concentration of C plus 15.');
      arith.unplug();

      connectBlocks(block, comment, 'ARGUMENT');
      tree = blockToObject(block);
      assert.equal(treeToLBC(tree), '"For some reason" "some arbitrary words"');
      assert.equal(treeToEnglish(tree), '"For some reason" "some arbitrary words".');
    });
  });
});
