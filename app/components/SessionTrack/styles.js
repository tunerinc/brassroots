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
  track: ViewStyleProp,
  action: ViewStyleProp,
  check: TextStyleProp,
  plus: TextStyleProp,
  info: ViewStyleProp,
  nameArtists: TextStyleProp,
  name: TextStyleProp,
  separator: TextStyleProp,
  artists: TextStyleProp,
  user: TextStyleProp,
  options: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  track: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 82,
  },
  action: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 20,
  },
  check: {
    marginLeft: 10,
    fontSize: 45,
  },
  plus: {
    alignSelf: 'flex-start',
    fontSize: 45,
  },
  info: {
    flex: 5,
    justifyContent: 'space-around',
  },
  nameArtists: {
    flex: 1,
    color: '#fefefe',
    fontFamily: 'Muli',
    textAlign: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
  },
  separator: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: '#888',
  },
  artists: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: '#888'
  },
  user: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20.8,
    color: '#888',
  },
  options: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    height: 40,
    backgroundColor: 'transparent',
  },
});

export default styles;