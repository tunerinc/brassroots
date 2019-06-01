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
  container: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  arrowForward: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  image: {
    flex: 2,
  },
  info: {
    flex: 6,
    paddingRight: 10,
  },
  arrowForward: {
    flex: 1,
    textAlign: 'right',
  },
});

export default styles;