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
    height: 45,
    backgroundColor: 'transparent',
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  like: {
    textAlign: 'right',
    fontSize: 25,
  },
  count: {
    fontSize: 12,
    lineHeight: 15.6,
    position: 'absolute',
    bottom: 0,
    left: 33,
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