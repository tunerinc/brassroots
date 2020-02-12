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
  option: ViewStyleProp,
  button: ViewStyleProp,
  wrap: ViewStyleProp,
  text: TextStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  option: {
    borderColor: '#323232',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flex: 3,
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    alignSelf: 'center',
    color: '#fefefe',
  },
});

export default styles;