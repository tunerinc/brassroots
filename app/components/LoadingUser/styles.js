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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  name: {
    width: 100,
  },
});

export default styles;