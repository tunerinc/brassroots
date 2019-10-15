'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {type ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {HEADER_MAX_HEIGHT} from '../../containers/UserProfileView';

interface Styles {
  container: ViewStyleProp,
  image: ViewStyleProp,
  cover: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: HEADER_MAX_HEIGHT,
    backgroundColor: '#1b1b1e',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1b1b1e',
    width: null,
    height: null,
  },
});

export default styles;