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
  position: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  album: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    height: 82,
  },
  position: {
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
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
    fontSize: 35,
  },
});

export default styles;