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
  text: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    padding: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  text: {
    
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28.6,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
});

export default styles;