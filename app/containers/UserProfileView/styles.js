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
  header: ViewStyleProp,
  background: ViewStyleProp,
  wrap: ViewStyleProp,
  image: ImageStyleProp,
  gradient: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: ViewStyleProp | TextStyleProp,
  title: TextStyleProp,
  rightIcon: TextStyleProp,
  modal: ViewStyleProp,
};

const {height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT: number = height * 0.6;
const HEADER_MIN_HEIGHT: number = 65;
const HEADER_DELTA: number = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1e',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    paddingHorizontal: 15,
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
    zIndex: 10,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    width: null,
    backgroundColor: 'transparent',
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    zIndex: 2,
    width: null,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    height: HEADER_MIN_HEIGHT,
    zIndex: 12,
  },
  nav: {
    paddingTop: 15,
    height: HEADER_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  leftIcon: {
    flex: 1,
    height: 45,
    fontSize: 30,
    paddingTop: 7,
    color: '#fefefe',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 1,
    height: 45,
    fontSize: 30,
    paddingTop: 6,
    color: '#fefefe',
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;