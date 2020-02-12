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
  image: ViewStyleProp,
  text: ViewStyleProp,
  topText: ViewStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  artist: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    height: 75,
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
    borderRadius: 27.5,
    backgroundColor: '#888',
  },
  text: {
    height: 16,
    backgroundColor: '#888',
  },
  topText: {
    marginBottom: 6.2,
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