'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {type ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  imageWrap: ViewStyleProp,
  image: ViewStyleProp,
  text: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  imageWrap: {
    alignItems: 'center',
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
  },
  text: {
    height: 20,
    backgroundColor: '#888',
  },
});

export default styles;