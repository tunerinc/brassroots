'use strict';

module.exports = function (api) {
  api.cache.never();

  const presets = [
    'module:metro-react-native-babel-preset',
  ];
  
  const plugins = [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-decorators', {'legacy': true, decoratorsBeforeExpore: true}],
    ['@babel/plugin-proposal-class-properties', {'loose': true}],
    ['@babel/plugin-transform-runtime', { "regenerator": false}],
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    ['@babel/plugin-proposal-optional-chaining', {'loose': false}],
    ['@babel/plugin-proposal-pipeline-operator', {'proposal': 'minimal'}],
    ['@babel/plugin-proposal-nullish-coalescing-operator', {'loose': false}],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-json-strings',
  ];

  return {
    presets,
    plugins,
    sourceMaps: true,
  };
}
