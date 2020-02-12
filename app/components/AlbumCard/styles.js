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
  album: ViewStyleProp,
  wrap: ViewStyleProp,
  position: ViewStyleProp,
  positionText: TextStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  artists: TextStyleProp,
  arrow: TextStyleProp,
  count: ViewStyleProp,
  play: TextStyleProp,
  number: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  album: {
    paddingHorizontal: 15,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    flex: 1,
  },
  positionText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
    
    color: '#888',
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  info: {
    flex: 6,
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  name: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
  },
  artists: {
    fontSize: 14,
    fontWeight: '600',
    
    lineHeight: 14,
    color: '#888',
    paddingTop: 6,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    alignSelf: 'center',
    color: '#fefefe',
  },
  count: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  play: {
    fontSize: 20,
    color: '#fefefe',
  },
  number: {
    color: '#fefefe',
    fontSize: 14,
    
    fontWeight: '800',
    lineHeight: 18.2, // x1.3
    marginLeft: 7,
    paddingBottom: 1,
  },
});

export default styles;