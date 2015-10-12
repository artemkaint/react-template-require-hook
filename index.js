var reactTemplates = require('react-templates/src/reactTemplates');
var fs = require('fs');
var _ = require('lodash');
var ext = '.rt';

module.exports = function(options) {
  var defaultOptions = {
    modules: 'commonjs'
  };
  var options = _.extend({}, defaultOptions, options);

  var loadRtFile = function(module, filename) {
    var source = fs.readFileSync(filename, 'utf8');
    var answer = reactTemplates.convertTemplateToReact(source, options);
    module._compile(answer, filename);
  };

  if (require.extensions !== undefined) {
    require.extensions[ext] = loadRtFile;
  }
};
