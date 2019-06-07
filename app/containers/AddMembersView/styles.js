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
  rightIconText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
  membersWrap: ViewStyleProp,
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
    alignItems: 'center',
  },
  leftIcon: {
    flex: 2,
    alignSelf: 'center',
    fontSize: 45,
    backgroundColor: 'transparent',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 28,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 33.6,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 2,
    height: 45,
    justifyContent: 'center',
  },
  rightIconText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.6,
    textAlign: 'right',
  },
  enabledText: {
    color: '#fefefe'
  },
  disabledText: {
    color: '#888'
  },
  membersWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    paddingTop: 10,
  },
});

export default styles;