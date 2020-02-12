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
  syncScreen: ViewStyleProp,
  shadow: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: ViewStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  libraryWrap: ViewStyleProp,
  libraryOption: ViewStyleProp,
  libraryOptionIcon: TextStyleProp,
  libraryOptionText: TextStyleProp,
  libraryOptionArrow: TextStyleProp,
  modal: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  syncScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1e',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 15,
    zIndex: 2,
    alignSelf: 'stretch',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  leftIcon: {
    flex: 2,
    height: 40,
    backgroundColor: 'transparent',
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
    flex: 2,
    alignSelf: 'center',
  },
  libraryWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    marginTop: 65,
  },
  libraryOption: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  libraryOptionIcon: {
    height: 55,
    width: 55,
    textAlign: 'center',
    fontSize: 55,
    marginRight: 10,
    color: '#fefefe',
  },
  libraryOptionText: {
    flex: 6,
    
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fefefe',
  },
  libraryOptionArrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    alignSelf: 'center',
    color: '#fefefe',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;