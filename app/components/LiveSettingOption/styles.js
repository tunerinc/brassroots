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
  wrap: ViewStyleProp,
  icon: TextStyleProp,
  info: ViewStyleProp,
  heading: TextStyleProp,
  item: ViewStyleProp,
  bullet: TextStyleProp,
  itemText: TextStyleProp,
  radio: TextStyleProp,
  check: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#888',
    borderBottomWidth: 1,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  icon: {
    flex: 2,
  },
  info: {
    flex: 6,
  },
  heading: {
    
    fontSize: 22,
    lineHeight: 28.6,
    color: '#fefefe',
    fontWeight: '800',
    marginBottom: 5,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 2,
    paddingRight: 20,
  },
  bullet: {
    
    fontSize: 14,
    lineHeight: 18.2,
    color: '#888',
    fontWeight: '600',
  },
  itemText: {
    
    fontSize: 14,
    lineHeight: 18.2,
    color: '#888',
    fontWeight: '600',
  },
  radio: {
    flex: 1,
  },
  check: {
    flex: 1,
  },
});

export default styles;