QUnit.module("Block -> LBC, English", {
  beforeEach: function() {
    this.workspace = new Blockly.Workspace();
  }
});

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
