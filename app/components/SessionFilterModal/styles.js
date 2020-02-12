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
  modal: ViewStyleProp,
  button: ViewStyleProp,
  option: ViewStyleProp,
  icon: TextStyleProp,
  text: TextStyleProp,
  check: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fefefe',
    height: 150,
  },
  button: {
    flex: 1,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 25,
  },
  text: {
    flex: 4,
    
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 18,
    backgroundColor: 'transparent'
  },
  check: {
    flex: 1,
    textAlign: 'right',
    backgroundColor: 'transparent',
    fontSize: 25,
  },
});

export default styles;