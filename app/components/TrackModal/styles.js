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
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  modal: ViewStyleProp,
  track: ViewStyleProp,
  shadow: ViewStyleProp,
  image: ImageStyleProp,
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 82,
    alignItems: 'center',
  },
  shadow: {
    height: 60,
    width: 60,
    marginRight: 10,
    backgroundColor: '#888',
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  image: {
    width: 60,
    height: 60,
  },
  info: {
    flex: 6,
    justifyContent: 'space-around',
  },
  name: {
    color: '#1b1b1e',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 18,
  },
  bottom: {
    paddingTop: 6,
    fontFamily: 'Muli',
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
    height: 56,
    justifyContent: 'center',
  },
  text: {
    color: '#1b1b1e',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'center',
  },
  danger: {
    color: '#c0392b'
  },
  disabled: {
    color: '#888',
  },
  cancel: {
    backgroundColor: '#fefefe',
    height: 66,
    borderColor: '#888',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  cancelButton: {},
});

export default styles;