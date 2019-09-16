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
  info: ViewStyleProp,
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
  },
  info: {
    flex: 6,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 5,
    paddingTop: 3,
    fontSize: 30,
  },
});

export default styles;