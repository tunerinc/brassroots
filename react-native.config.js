'use strict';

const ios = require('@react-native-community/cli-platform-ios');
const android = require('@react-native-community/cli-platform-android');

module.exports = {
  // root: '/Users/aldogonzalez/Desktop/brassroots',
  // reactNativePath: '/Users/aldogonzalez/Desktop/brassroots/node_modules/react-native',
  root: '/Users/hackathon/Documents/Hackathon/Projects/brassroots',
  reactNativePath: '/Users/hackathon/Documents/Hackathon/Projects/brassroots/node_modules/react-native',
  commands: [...ios.commands, ...android.commands],
  dependencies: {
    'react-native-events': {
      platforms: {
        ios: null,
      },
    },
    'rn-spotify-sdk': {
      platforms: {
        ios: null,
      },
    },
  },
  platforms: {
    ios: {
      linkConfig: ios.linkConfig,
      projectConfig: ios.projectConfig,
      dependencyConfig: ios.dependencyConfig,
    },
    android: {
      linkConfig: android.linkConfig,
      projectConfig: android.projectConfig,
      dependencyConfig: android.dependencyConfig,
    },
  },
};