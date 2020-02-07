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
    maxHeight: HEADER_MAX_HEIGHT,
  },
  image: {...StyleSheet.absoluteFillObject},
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1b1b1e',
  },
});

export default styles;