import reactTemplates from 'react-templates/src/reactTemplates';
import fs from 'fs';
const ext = '.rt';

export default function hook(options) {
  const convertOptions = Object.assign({}, {
    modules: 'commonjs',
    reactImportPath: 'react'
  }, options);

  function loadRtFile (module, filename) {
    var source = fs.readFileSync(filename, 'utf8');
    var answer = reactTemplates.convertTemplateToReact(source, convertOptions);
    module._compile(answer, filename);
  }

  if (require.extensions !== undefined) {
    require.extensions[ext] = loadRtFile;
  }
};
