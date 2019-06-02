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
  album: ViewStyleProp,
  shadow: ViewStyleProp,
  image: ImageStyleProp,
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 92,
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
    flex: 1,
    color: '#1b1b1e',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 26,
  },
  artists: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20.8,
    color: '#888',
    fontFamily: 'Muli',
    paddingTop: 4,
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
  danger: {
    color: '#c0392b'
  },
  cancel: {
    paddingVertical: 20,
    borderColor: '#888',
    borderTopWidth: 1,
  },
  cancelButton: {
    
  },
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
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 23.4,
    marginLeft: 7,
    paddingTop: 1,
  },
});

export default styles;