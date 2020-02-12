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
  rightIconButton: ViewStyleProp,
  rightIconText: TextStyleProp,
  settingsWrap: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1e',
  },
  shadow: {
    height: 90,
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
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
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
    flex: 6,
    color: '#fefefe',
    fontSize: 28,
    
    fontWeight: '800',
    lineHeight: 33.6,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIconButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightIconText: {
    color: '#fefefe',
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.6,
    
  },
  settingsWrap: {},
});

export default styles;