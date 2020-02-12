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
  icon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    flex: 2,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    textAlign: 'right',
    fontSize: 25,
    color: '#fefefe',
  },
});

export default styles;