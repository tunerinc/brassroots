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
  name: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  name: {
    width: 100,
    paddingTop: 1,
  },
});

export default styles;