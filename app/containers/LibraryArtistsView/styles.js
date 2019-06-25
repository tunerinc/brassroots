'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import Dimensions from 'Dimensions';
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
  scrollContainer: ViewStyleProp,
  scrollWrap: ViewStyleProp,
};

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
    height: 70,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
    paddingTop: 15,
    paddingHorizontal: 20,
    zIndex: 2,
    alignSelf: 'stretch',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
  },
  leftIcon: {
    flex: 1,
    height: 35,
    fontSize: 35,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 24,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 28.8,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 1,
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1b1b1e',
    marginTop: 70,
  },
  scrollWrap: {
    minHeight: screenHeight - 85,
  },
});

export default styles;