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
  info: ViewStyleProp,
  image: ViewStyleProp,
  name: TextStyleProp,
  icon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    flex: 6,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  name: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 20.8,
  },
  icon: {
    fontSize: 15,
    color: '#fefefe',
    marginTop: -3,
  },
});

export default styles;