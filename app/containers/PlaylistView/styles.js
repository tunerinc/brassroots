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
  list: ViewStyleProp,
  gradient: ViewStyleProp,
  header: ViewStyleProp,
  background: ViewStyleProp,
  wrap: ViewStyleProp,
  image: ImageStyleProp,
  gradient: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: TextStyleProp,
  title: TextStyleProp,
  rightIcon: TextStyleProp,
  footer: ViewStyleProp,
  loadingGif: ImageStyleProp,
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
  list: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    paddingHorizontal: 15,
    backgroundColor: '#1b1b1e',
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
    zIndex: 11,
  },
  nav: {
    height: HEADER_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingTop: 25,
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
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 1,
    height: 45,
    paddingTop: 6,
    fontSize: 30,
    color: '#fefefe',
    textAlign: 'right',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingGif: {
    width: 60,
    height: 72.6,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.7,
  },
});

export default styles;