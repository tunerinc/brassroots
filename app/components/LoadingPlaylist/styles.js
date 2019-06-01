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
  playlist: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  arrow: TextStyleProp,
};

export default StyleSheet.create({
  playlist: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    height: 82,
  },
  image: {
    flex: 2,
  },
  info: {
    flex: 6,
    paddingRight: 10,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    paddingTop: 3,
  },
});