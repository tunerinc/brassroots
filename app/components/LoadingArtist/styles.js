'use strict';

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
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    height: 92,
  },
  image: {
    flex: 2,
  },
  info: {
    flex: 6,
    paddingRight: 10,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    paddingTop: 3,
  },
});

export default styles;