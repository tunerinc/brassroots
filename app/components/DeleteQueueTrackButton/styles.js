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
  loading: ViewStyleProp,
  delete: TextStyleProp,
  error: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  loading: {
    flex: 1,
  },
  delete: {},
  error: {},
});

export default styles;