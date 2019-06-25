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
  artist: ViewStyleProp,
  wrap: ViewStyleProp,
  loading: ViewStyleProp,
  image: ImageStyleProp,
  placeholder: ViewStyleProp,
  default: ViewStyleProp,
  defaultImage: ImageStyleProp,
  artistIcon: TextStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  count: TextStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  artist: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    height: 82,
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loading: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: '#888',
  },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    height: 60,
    width: 60,
    backgroundColor: '#323232',
    marginRight: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultImage: {
    flex: 1,
    height: 37.19,
    width: 45,
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 18,
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 14,
    color: '#888',
    paddingTop: 6,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 35,
    alignSelf: 'center',
  },
});

export default styles;