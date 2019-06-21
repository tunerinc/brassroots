'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  type ViewStyleProp,
  type ImageStyleProp,
  type TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  modal: ViewStyleProp,
  artist: ViewStyleProp,
  shadow: ViewStyleProp,
  image: ImageStyleProp,
  name: TextStyleProp,
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
  artist: {
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
    borderRadius: 30,
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
    borderRadius: 30,
  },
  name: {
    flex: 6,
    color: '#1b1b1e',
    fontSize: 18,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 18,
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