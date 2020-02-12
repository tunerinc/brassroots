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
  album: ViewStyleProp,
  shadow: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  artists: TextStyleProp,
  option: ViewStyleProp,
  button: ViewStyleProp,
  text: TextStyleProp,
  danger: TextStyleProp,
  cancel: ViewStyleProp,
  cancelButton: ViewStyleProp,
  count: ViewStyleProp,
  number: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fefefe',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  album: {
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
  artists: {
    fontSize: 14,
    fontWeight: '600',
    
    lineHeight: 14,
    color: '#888',
    paddingTop: 5,
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
  cancel: {
    paddingVertical: 20,
    borderColor: '#888',
    borderTopWidth: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
  },
  cancelButton: {},
  count: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  number: {
    color: '#1b1b1e',
    fontSize: 18,
    
    fontWeight: '800',
    lineHeight: 23.4,
    marginLeft: 7,
    paddingTop: 1,
  },
});

export default styles;