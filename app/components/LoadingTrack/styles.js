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
  imageWrap: ViewStyleProp,
  image: ViewStyleProp,
  positionWrap: ViewStyleProp,
  position: ViewStyleProp,
  info: ViewStyleProp,
  text: ViewStyleProp,
  topText: ViewStyleProp,
  playsWrap: ViewStyleProp,
  plays: ViewStyleProp,
  options: TextStyleProp,
  favoriteIcon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
  },
  imageWrap: {
    marginRight: 10,
  },
  image: {
    width: 55,
    height: 55,
    backgroundColor: '#888',
  },
  positionWrap: {
    flex: 1,
  },
  position: {
    width: 14,
    height: 14,
    backgroundColor: '#888',
  },
  info: {
    flex: 6,
    marginRight: 10,
  },
  text: {
    height: 16,
    backgroundColor: '#888',
  },
  topText: {
    marginBottom: 6.2,
    marginTop: 10,
  },
  playsWrap: {
    flex: 1,
    paddingRight: 10,
  },
  plays: {
    height: 14,
    marginBottom: 5.6,
    backgroundColor: '#888',
  },
  options: {
    flex: 1,
    textAlign: 'right',
    backgroundColor: '#1b1b1e',
    fontSize: 30,
    color: '#888',
  },
  favoriteIcon: {
    flex: 1,
    textAlign: 'right',
    color: '#FDC52F',
    alignSelf: 'center',
    fontSize: 25,
  },
});

export default styles;