requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		treehugger: 'treehugger/lib/treehugger'
	}
});

require(['treehugger/tree', 'treehugger/traverse']);
