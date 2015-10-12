var reactTemplates = require('react-templates/src/reactTemplates');
var url = require('url');
var fs = require('fs');
var ext = '.rt';

var loadRtFile = function(module, filename) {
  var options = {};
  var source = fs.readFileSync(filename, 'utf8');
  var answer = reactTemplates.convertTemplateToReact(source, options);
  module._compile(answer, filename);
};

if (require.extensions !== undefined) {
  require.extensions[ext] = loadRtFile;
}

module.exports = loadRtFile;