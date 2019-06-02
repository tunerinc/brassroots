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
  options: ViewStyleProp,
  menu: ViewStyleProp,
  opacity: ViewStyleProp,
  option: ViewStyleProp,
  button: ViewStyleProp,
  text: TextStyleProp,
  backdropButton: ViewStyleProp,
  backdrop: ViewStyleProp,
  close: ViewStyleProp,
  closeButton: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  options: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  menu: {
    backgroundColor: '#fefefe',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  opacity: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  option: {
    borderColor: '#888',
    borderTopWidth: 1,
  },
  button: {
    paddingVertical: 15,
  },
  text: {
    color: '#1b1b1e',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'center',
  },
  backdropButton: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#1b1b1e',
  },
  close: {
    paddingVertical: 20,
    borderColor: '#888',
    borderTopWidth: 1,
  },
  closeButton: {},
});

export default styles;