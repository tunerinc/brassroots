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
  plus: TextStyleProp,
  filterWrap: ViewStyleProp,
  filterText: TextStyleProp,
  filter: ViewStyleProp,
  image: ViewStyleProp,
  default: ViewStyleProp,
  logo: ViewStyleProp,
  buttonText: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
    height: 90,
  },
  filterWrap: {},
  plus: {
    textAlign: 'center',
    paddingTop: 4,
    fontSize: 40,
  },
  filterText: {
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '600',
    lineHeight: 26,
    backgroundColor: 'transparent',
    marginTop: 17,
  },
  filter: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
    opacity: 0.5,
    position: 'absolute',
    zIndex: -1,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
  },
  default: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    backgroundColor: '#323232',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    height: 37.19,
    width: 45,
  },
  buttonText: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
  },
});

export default styles;