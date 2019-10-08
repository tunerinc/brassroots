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
  player: ViewStyleProp,
  left: ViewStyleProp,
  leftIcon: TextStyleProp,
  center: ViewStyleProp,
  image: ViewStyleProp,
  playPause: ViewStyleProp,
  centerIcon: TextStyleProp,
  right: ViewStyleProp,
  rightIcon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  leftIcon: {
    fontSize: 55,
  },
  center: {
    height: 200,
    width: 200,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  playPause: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  centerIcon: {
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightIcon: {
    fontSize: 55,
  },
});

export default styles;