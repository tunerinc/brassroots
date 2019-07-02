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
    backgroundColor: '#2b6dc0',
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    paddingTop: 4,
    paddingLeft: 7,
    lineHeight: 60,
    fontSize: 60,
    color: '#fefefe',
  },
});

export default styles;