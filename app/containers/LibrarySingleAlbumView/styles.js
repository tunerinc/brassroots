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
  scrollWrap: ViewStyleProp,
  header: ViewStyleProp,
  animatedHeader: ViewStyleProp,
  animatedShadow: ViewStyleProp,
  headerBackground: ViewStyleProp | ImageStyleProp,
  headerFilter: ViewStyleProp,
  blurred: ImageStyleProp,
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
const HEADER_MAX_HEIGHT: number = 261;
const HEADER_MIN_HEIGHT: number = 65;
const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1e',
  },
  list: {
    marginBottom: HEADER_MIN_HEIGHT,
    backgroundColor: '#1b1b1e',
    minHeight: height - (HEADER_MAX_HEIGHT + 65),
  },
  scrollWrap: {
    backgroundColor: '#1b1b1e',
  },
  header: {
    height: HEADER_MAX_HEIGHT,
    backgroundColor: '#1b1b1e',
    zIndex: 0,
  },
  animatedHeader: {
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
  },
  animatedShadow: {
    backgroundColor: '#1b1b1e',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
    zIndex: 1,
  },
  headerFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(27,27,30,0.5)',
    zIndex: 2,
  },
  blurred: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
  },
  nav: {
    height: HEADER_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingHorizontal: 15,
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
    fontSize: 30,
    paddingTop: 6,
    color: '#fefefe',
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
  playButtonWrap: {
    marginTop: 25,
    zIndex: 3,
  },
  headerBottomOptions: {
    marginTop: 25,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 3,
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
    fontFamily: 'Muli',
    lineHeight: 20.8,
  },
  options: {
    flex: 1,
    textAlign: 'right',
    height: 30,
    fontSize: 30,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;