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
  placeholderWrap: ViewStyleProp,
  positionWrap: ViewStyleProp,
  position: ViewStyleProp,
  imageWrap: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  text: ViewStyleProp,
  topText: ViewStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  album: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    height: 75,
  },
  placeholderWrap: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionWrap: {
    flex: 1,
  },
  position: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#888',
  },
  imageWrap: {
    height: 55,
    width: 55,
    marginRight: 10,
  },
  image: {
    width: 55,
    height: 55,
    backgroundColor: '#888',
  },
  info: {
    flex: 6,
  },
  text: {
    height: 16,
    backgroundColor: '#888',
  },
  topText: {
    marginTop: 10,
    marginBottom: 6.4,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 5,
    paddingTop: 3,
    fontSize: 30,
    color: '#888',
  },
});

export default styles;