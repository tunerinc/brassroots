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
  recentlyPlayedWrap: ViewStyleProp,
  modal: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  shadow: {
    height: 85,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 5,
    paddingTop: 15,
    paddingHorizontal: 20,
    zIndex: 1,
    alignSelf: 'stretch',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
  },
  leftIcon: {
    flex: 2,
    height: 45,
    fontSize: 45,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    color: '#fefefe',
  },
  title: {
    flex: 8,
    color: '#fefefe',
    fontSize: 28,
    
    fontWeight: '800',
    lineHeight: 33.6,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 2,
    alignSelf: 'center',
  },
  recentlyPlayedWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    paddingTop: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;