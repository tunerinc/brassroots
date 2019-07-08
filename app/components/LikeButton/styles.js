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
  button: ViewStyleProp,
  like: TextStyleProp,
  count: TextStyleProp,
  red: TextStyleProp,
  gray: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    textAlign: 'center',
  },
  count: {
    fontSize: 12,
    lineHeight: 15.6,
    position: 'absolute',
    bottom: -5,
    left: 26,
    textAlign: 'left',
  },
  red: {
    color: '#c0293b',
  },
  gray: {
    color: '#888',
  },
});

export default styles;