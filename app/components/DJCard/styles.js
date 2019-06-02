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
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  button: ViewStyleProp,
  info: ViewStyleProp,
  image: ImageStyleProp,
  name: TextStyleProp,
  icon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  button: {
    flex: 6,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  name: {
    color: '#fefefe',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 26,
  },
  icon: {},
});

export default styles;