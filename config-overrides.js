const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(_config, env) {
  let config = _config;
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#ce6872',
    },
  })(config, env);
  return config;
};
