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
  wrap: ViewStyleProp,
  user: ViewStyleProp,
  shadow: ViewStyleProp,
  image: ImageStyleProp,
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
    height: 92,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shadow: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: '#888',
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  displayName: {
    flex: 6,
    color: '#1b1b1e',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 26,
  },
  live: {
    flex: 2,
    textAlign: 'right',
    color: '#c0392b',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Muli',
    lineHeight: 26,
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
    color: '#c0392b',
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