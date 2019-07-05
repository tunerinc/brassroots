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
    flexDirection: 'row',
  },
  icon: {
    fontSize: 25,
    color: '#2b6dc0',
  },
});

export default styles;