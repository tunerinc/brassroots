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
  wrap: ViewStyleProp,
  user: ViewStyleProp,
  shadow: ViewStyleProp,
  image: ViewStyleProp,
  displayName: TextStyleProp,
  live: TextStyleProp,
  option: ViewStyleProp,
  button: ViewStyleProp,
  text: TextStyleProp,
  danger: TextStyleProp,
  cancel: ViewStyleProp,
  cancelButton: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fefefe',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  wrap: {
    
  },
  user: {
    flexDirection: 'row',
    height: 75,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  shadow: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    marginRight: 10,
    backgroundColor: '#888',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
  },
  displayName: {
    flex: 6,
    color: '#1b1b1e',
    fontSize: 16,
    
    fontWeight: '600',
    lineHeight: 16,
    paddingTop: 2,
  },
  live: {
    flex: 2,
    textAlign: 'right',
    color: '#c0392b',
    fontSize: 16,
    fontWeight: '800',
    
    lineHeight: 16,
  },
  option: {
    borderColor: '#888',
    borderTopWidth: 1,
  },
  button: {
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    paddingVertical: 12.5,
  },
  text: {
    color: '#1b1b1e',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 21.6, // x1.2
    textAlign: 'center',
  },
  danger: {
    color: '#c0392b',
  },
  cancel: {
    backgroundColor: '#fefefe',
    borderColor: '#888',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  cancelButton: {
    paddingVertical: 20,
    backgroundColor: '#fefefe',
  },
});

export default styles;