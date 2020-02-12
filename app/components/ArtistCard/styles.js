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
  artist: ViewStyleProp,
  wrap: ViewStyleProp,
  loading: ViewStyleProp,
  image: ViewStyleProp,
  placeholder: ViewStyleProp,
  default: ViewStyleProp,
  defaultImage: ViewStyleProp,
  artistIcon: TextStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  count: TextStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  artist: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loading: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderRadius: 27.5,
    backgroundColor: '#888',
  },
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    height: 50,
    width: 50,
    backgroundColor: '#323232',
    marginRight: 10,
    borderRadius: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultImage: {
    flex: 1,
    height: 34.09,
    width: 41.25,
  },
  artistIcon: {
    paddingTop: 3,
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
  count: {
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
});

export default styles;