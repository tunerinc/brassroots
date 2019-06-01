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
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 82,
  },
  image: {
    marginRight: 10,
  },
  position: {
    flex: 1,
  },
  info: {
    flex: 5,
    marginRight: 10,
  },
  plays: {
    flex: 1,
    paddingRight: 10,
  },
  options: {
    flex: 1,
    textAlign: 'right',
  },
  favoriteTrackIcon: {
    flex: 1,
    textAlign: 'right',
    color: '#FDC52F',
    alignSelf: 'center',
  },
});

export default styles;