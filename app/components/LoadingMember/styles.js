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
  image: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  image: {
    alignItems: 'center',
  },
});

export default styles;