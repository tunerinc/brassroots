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
  text: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 5,
    opacity: 0.3,
  },
  text: {
    height: 16,
    backgroundColor: '#888',
  },
});

export default styles;