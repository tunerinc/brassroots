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
  optionsButton: ViewStyleProp,
  options: TextStyleProp,
  loadWrap: ViewStyleProp,
  loadingName: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  track: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    backgroundColor: 'transparent'
  },
  action: {
    flex: 1,
    marginRight: 10,
  },
  check: {
    fontSize: 40,
    height: 40,
    textAlign: 'left',
    backgroundColor: 'transparent',
    paddingLeft: 10,
    color: '#2b6dc0',
  },
  plus: {
    fontSize: 40,
    height: 40,
    paddingLeft: 5,
    textAlign: 'left',
    backgroundColor: 'transparent',
    color: '#fefefe',
  },
  info: {
    flex: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 4,
  },
  nameArtists: {
    color: '#fefefe',
    
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
  },
  separator: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    color: '#888',
  },
  artists: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    color: '#888'
  },
  user: {
    paddingTop: 6,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
    color: '#888',
  },
  optionsButton: {
    flex: 1,
    height: 45,
    backgroundColor: 'transparent',
    paddingTop: 7.5,
    paddingRight: 15,
  },
  options: {
    textAlign: 'right',
    fontSize: 30,
    color: '#fefefe',
  },
  loadWrap: {
    paddingTop: 6,
    width: 150,
    height: 22,
    justifyContent: 'center',
  },
  loadingName: {
    marginTop: 10,
    height: 16,
    backgroundColor: '#888',
  },
});

export default styles;