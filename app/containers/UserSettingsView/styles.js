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
  settings: ViewStyleProp,
  logout: ViewStyleProp,
  logoutWrap: ViewStyleProp,
  logoutText: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  shadow: {
    height: 65,
    backgroundColor: '#1b1b1e',
    paddingTop: 10,
    paddingHorizontal: 15,
    zIndex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  leftIcon: {
    flex: 1,
    height: 45,
    fontSize: 30,
    paddingTop: 7.5,
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
    alignSelf: 'center',
  },
  settings: {
    flex: 1,
    zIndex: -1,
    backgroundColor: '#1b1b1e',
    marginTop: 10,
  },
  logout: {
    backgroundColor: '#1b1b1e',
    marginTop: 20,
    height: 50,
    borderColor: '#323232',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutWrap: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoutText: {
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#c0392b',
    textAlign: 'center',
    backgroundColor: '#1b1b1e',
  },
});

export default styles;