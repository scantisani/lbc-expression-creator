# lbc-expression-creator
A graphical tool for creating expressions in the Logic of Behaviour in Context using Blockly.

To install, first clone the repository:

	git clone https://github.com/scantisani/lbc-expression-creator.git

Then initialize and update the submodules:

	git submodule init
	git submodule update

You'll need to install the `peg.js` library, and then generate the parser:
        
	npm install -g pegjs
	cd js/parsing
	./generateparser.sh

After that, you should be all set up! To use the expression creator, point your browser at `index.html` in the repository's root directory.

To run the expression creator's tests, load `tests.html` in the browser of your choice.

To run Blockly's tests, load `js/blockly/tests/generators/index.html` in a browser that allows the use of the `file://` protocol (e.g. Firefox or Safari--**not Chrome**).
