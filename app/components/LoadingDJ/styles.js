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
  wrap: ViewStyleProp,
  image: ViewStyleProp,
  text: ViewStyleProp,
  icon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 6,
    maxWidth: 200,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5,
    backgroundColor: '#888',
  },
  text: {
    height: 16,
    backgroundColor: '#888',
    marginTop: 11,
  },
  icon: {
    fontSize: 15,
    color: '#888',
    marginTop: -7,
  },
});

export default styles;