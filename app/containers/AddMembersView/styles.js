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
  leftIcon: TextStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  rightIconText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
  scrollContainer: ViewStyleProp,
  scrollWrap: ViewStyleProp,
  user: ViewStyleProp,
  userWrap: ViewStyleProp,
  userImage: ViewStyleProp,
  userText: ViewStyleProp,
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
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
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
    alignSelf: 'center',
  },
  rightIconText: {
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    textAlign: 'right',
  },
  enabledText: {
    color: '#fefefe'
  },
  disabledText: {
    color: '#888'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1b1b1e',
    marginTop: 65,
  },
  scrollWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
  },
  user: {
    marginHorizontal: 15,
    paddingVertical: 10,
    height: 75,
  },
  userWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    marginRight: 10,
    backgroundColor: '#888',
  },
  userText: {
    height: 16,
    marginTop: 10,
    backgroundColor: '#888',
  },
});

export default styles;