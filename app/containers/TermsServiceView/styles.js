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
  spinnerWrap: ViewStyleProp,
  termsWrap: ViewStyleProp,
};

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
  },
  leftIcon: {
    flex: 1,
    height: 45,
    fontSize: 45,
    alignSelf: 'center'
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
    flex: 1,
    alignSelf: 'center'
  },
  spinnerWrap: {
    flex: 1,
    paddingHorizontal: 20,
    opacity: 0.3,
  },
  termsWrap: {
    flex: 1,
    marginTop: 70,
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    zIndex: -1,
    backgroundColor: 'transparent',
  },
});

export default styles;