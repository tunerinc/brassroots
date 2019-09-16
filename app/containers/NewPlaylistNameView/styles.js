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
  container: ViewStyleProp,
  shadow: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: TextStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  rightIconText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
  wrap: ViewStyleProp,
  imageName: ViewStyleProp,
  image: ViewStyleProp,
  imageIcon: TextStyleProp,
  name: ViewStyleProp,
  input: TextStyleProp,
  mode: ViewStyleProp,
  modeWrap: ViewStyleProp,
  modeIcon: TextStyleProp,
  modeInfo: ViewStyleProp,
  modeName: ViewStyleProp,
  modeNameText: TextStyleProp,
  modeDesc: ViewStyleProp,
  descBullet: ViewStyleProp,
  bulletText: TextStyleProp,
  descText: TextStyleProp,
  modeSelect: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  shadow: {
    height: 70,
    backgroundColor: '#1b1b1e',
    shadowColor: '#1b1b1e',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    paddingTop: 15,
    paddingHorizontal: 20,
    zIndex: 1,
    alignSelf: 'stretch',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#1b1b1e',
  },
  leftIcon: {
    flex: 2,
    height: 35,
    fontSize: 35,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    color: '#fefefe',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 22,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 26.4,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 2,
    alignSelf: 'center',
  },
  rightIconText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    textAlign: 'right',
  },
  enabledText: {
    color: '#fefefe',
  },
  disabledText: {
    color: '#888',
  },
  wrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: '#1b1b1e',
  },
  imageName: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#323232',
    zIndex: -2,
  },
  image: {
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  imageIcon: {
    fontSize: 28,
    color: '#fefefe',
  },
  name: {
    flex: 6,
  },
  input: {
    flex: 1,
    height: 54,
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26.5,
    color: '#fefefe',
    paddingLeft: 10,
  },
  mode: {
    flex: 1,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  modeWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modeIcon: {
    flex: 2,
    fontSize: 50,
  },
  modeInfo: {
    flex: 6,
  },
  modeName: {
    marginBottom: 5,
  },
  modeNameText: {
    color: '#fefefe',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 23.4,
  },
  modeDesc: {
    paddingRight: 30,
  },
  descBullet: {
    flexDirection: 'row',
  },
  bulletText: {
    fontFamily: 'Muli',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 10.8,
    color: '#888',
    marginRight: 5,
  },
  descText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 16.8,
    color: '#888',
  },
  modeSelect: {
    flex: 1,
    textAlign: 'right',
    fontSize: 35,
  },
});

export default styles;