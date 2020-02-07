'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {type ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  owner: ViewStyleProp,
  image: ViewStyleProp,
  name: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  owner: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
  },
  name: {
    width: 75,
    height: 20,
    backgroundColor: '#888'
  },
});

export default styles;