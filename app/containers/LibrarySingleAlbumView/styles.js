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
  playButtonWrap: ViewStyleProp,
  headerBottomOptions: ViewStyleProp,
  shareButton: ViewStyleProp,
  shareIcon: TextStyleProp,
  shareText: TextStyleProp,
  options: TextStyleProp,
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
  list: {
    flex: 1,
    marginTop: HEADER_MIN_HEIGHT,
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
    paddingTop: HEADER_MIN_HEIGHT + height * 0.1,
    alignItems: "center",
    zIndex: 12,
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
  playButtonWrap: {
    zIndex: 3,
    marginBottom: height * 0.1,
  },
  headerBottomOptions: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 3,
  },
  shareButtonWrap: {
    flex: 2,
    backgroundColor: 'transparent',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shareIcon: {
    marginRight: 5,
    fontSize: 30,
    color: '#fefefe',
  },
  shareText: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '800',
    
    lineHeight: 20.8, // x1.3
  },
  detailsWrap: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modeIcon: {
    fontSize: 30,
    color: '#fefefe',
  },
  memberButton: {
    marginLeft: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  memberIcon: {
    backgroundColor: 'transparent',
    borderColor: '#fefefe',
    borderWidth: 3,
    height: 28,
    width: 28,
    fontSize: 18,
    paddingTop: 2,
    borderRadius: 15,
    textAlign: 'center',
  },
  optionsWrap: {
    flex: 2,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  options: {
    flex: 1,
    textAlign: 'right',
    height: 30,
    backgroundColor: 'transparent',
    fontSize: 30,
    color: '#fefefe',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;