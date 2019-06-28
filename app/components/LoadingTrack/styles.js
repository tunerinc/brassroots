'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  type ViewStyleProp,
  type TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  track: ViewStyleProp,
  image: ViewStyleProp,
  position: ViewStyleProp,
  info: ViewStyleProp,
  plays: ViewStyleProp,
  options: TextStyleProp,
  favoriteTrackIcon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
  },
  image: {
    marginRight: 10,
  },
  position: {
    flex: 1,
  },
  info: {
    flex: 6,
    marginRight: 10,
  },
  plays: {
    flex: 1,
    paddingRight: 10,
  },
  options: {
    flex: 1,
    textAlign: 'right',
    backgroundColor: '#1b1b1e',
    fontSize: 30,
    color: '#888',
  },
  favoriteTrackIcon: {
    flex: 1,
    textAlign: 'right',
    color: '#FDC52F',
    alignSelf: 'center',
    fontSize: 25,
  },
});

export default styles;