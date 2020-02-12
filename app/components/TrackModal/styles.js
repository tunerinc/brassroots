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
  track: ViewStyleProp,
  shadow: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  bottom: TextStyleProp,
  option: ViewStyleProp,
  button: ViewStyleProp,
  text: TextStyleProp,
  danger: TextStyleProp,
  disabled: TextStyleProp,
  cancel: ViewStyleProp,
  cancelButton: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fefefe',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  track: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 75,
    alignItems: 'center',
  },
  shadow: {
    height: 55,
    width: 55,
    marginRight: 10,
    backgroundColor: '#888',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  image: {
    width: 55,
    height: 55,
  },
  info: {
    flex: 6,
    justifyContent: 'space-around',
    paddingTop: 1,
  },
  name: {
    color: '#1b1b1e',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
    paddingTop: 2,
  },
  bottom: {
    paddingTop: 5,
    
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#888',
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
    color: '#c0392b'
  },
  disabled: {
    color: 'rgba(136,136,136,0.5)',
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