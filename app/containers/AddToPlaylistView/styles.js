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
  rightIcon: TextStyleProp,
  playlistsWrap: ViewStyleProp,
  createButton: ViewStyleProp,
  createButtonText: TextStyleProp,
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
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
  },
  leftIcon: {
    flex: 2,
    height: 45,
    backgroundColor: 'transparent',
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
  rightIcon: {
    flex: 2,
    alignSelf: 'center',
    textAlign: 'right',
    fontSize: 45,
  },
  playlistsWrap: {
    flex: 1,
    zIndex: -1,
    paddingTop: 10,
  },
  createButton: {
    padding: 5,
    height: 50,
    backgroundColor: '#2b6dc0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  createButtonText: {
    
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28.6,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
});

export default styles;