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
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 82,
    alignItems: 'center',
  },
  shadow: {
    height: 60,
    width: 60,
    marginRight: 10,
    backgroundColor: '#888',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
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
    paddingTop: 4,
  },
  name: {
    color: '#1b1b1e',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 18,
  },
  artists: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 14,
    color: '#888',
    paddingTop: 6,
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