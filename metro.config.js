'use strict';

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
