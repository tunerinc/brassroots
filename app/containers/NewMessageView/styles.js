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
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  shadow: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: ViewStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  rightIconText: TextStyleProp,
  messageWrap: ViewStyleProp,
  newGroupButton: ViewStyleProp,
  newGroupIcon: TextStyleProp,
  newGroupText: TextStyleProp,
};

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
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
    justifyContent: 'center'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
  },
  leftIcon: {
    flex: 2,
    height: 45,
    alignSelf: 'center',
    backgroundColor: 'transparent',
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
  rightIcon: {
    flex: 2,
    alignSelf: 'center',
  },
  rightIconText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.6,
    textAlign: 'right',
    color: '#fefefe'
  },
  messageWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    paddingTop: 10,
  },
  newGroupButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b6dc0',
    paddingVertical: 3,
    marginBottom: 20,
  },
  newGroupIcon: {
    marginRight: 10,
    fontSize: 45,
    color: '#fefefe',
  },
  newGroupText: {
    
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 26.4,
    color: '#fefefe'
  },
});

export default styles;