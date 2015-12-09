requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    parsing: '../parsing'
  }
});

require(['parsing/lbc-parser']);

var parseExpression = function(expression) {
  return parser.parse(expression);
};
