var reactTemplates = require('react-templates/src/reactTemplates');
var path = require('path');
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

  var Module = require('module');

  var findExtension = function(filename) {
    var extensions = path.basename(filename).split('.');
    if (extensions[0] === '') {
      extensions.shift()
    }

    while (extensions.shift()) {
      var curExtension = '.' + extensions.join('.');
      if (Module._extensions[curExtension]) {
        return curExtension;
      }
    }
    return '.js';
  };

  Module.load = function(filename) {
    this.filename = filename;
    this.paths = Module._nodeModulePaths(path.dirname(filename));
    var extension = findExtension(filename);
    Module._extensions[extension](this, filename);
    this.loaded = true
    return this.loaded;
  }
}

module.exports = loadRtFile;