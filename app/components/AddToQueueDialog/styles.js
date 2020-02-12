'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  type ViewStyleProp,
  type TextStyleProp,
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  playerBackgroundWrap: ViewStyleProp,
  playerBackgroundImage: ImageStyleProp,
  cover: ViewStyleProp,
  content: ViewStyleProp,
  checkmark: TextStyleProp,
  textWrap: ViewStyleProp,
  text: TextStyleProp,
};

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const styles: Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 175,
    height: 175,
    top: (screenHeight - 275) / 2,
    bottom: (screenHeight - 75) / 2,
    left: (screenWidth - 175) / 2,
    right: (screenWidth - 175) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
    borderRadius: 10,
    shadowColor: '#1b1b1e',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  playerBackgroundWrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  playerBackgroundImage: {
    position: 'absolute',
    top: -(screenHeight - 175) / 2,
    left: -(screenWidth - 175) / 2,
    right: -(screenWidth - 175) / 2,
    bottom: -((screenHeight - 175) / 2) - 115,
    zIndex: 1,
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'rgba(27,27,30,0.7)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkmark: {
    textAlign: 'center',
  },
  textWrap: {
    
  },
  text: {
    textAlign: 'center',
    color: '#fefefe',
    
    fontSize: 24,
    lineHeight: 28.8,
    fontWeight: '600',
  },
});

export default styles;