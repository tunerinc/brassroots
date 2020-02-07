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
  container: ViewStyleProp,
  image: ViewStyleProp,
  text: ViewStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
  },
  text: {
    height: 20,
    backgroundColor: '#888',
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    color: '#888',
    fontSize: 35,
  },
});

export default styles;