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
  aboutWrap: ViewStyleProp,
  aboutOptions: ViewStyleProp,
  option: ViewStyleProp,
  optionWrap: ViewStyleProp,
  optionText: TextStyleProp,
  arrowForward: TextStyleProp,
  bottom: ViewStyleProp,
  section: ViewStyleProp,
  sectionHeading: ViewStyleProp,
  sectionHeadingText: TextStyleProp,
  sectionContent: ViewStyleProp,
  sectionContentText: TextStyleProp,
  copyright: ViewStyleProp,
  copyrightText: TextStyleProp,
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
    fontSize: 45,
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
  aboutWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  aboutOptions: {},
  option: {
    borderColor: '#323232',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  optionText: {
    flex: 3,
    fontFamily: 'Muli',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  arrowForward: {
    flex: 1,
    textAlign: 'right',
    fontSize: 45,
  },
  bottom: {
    marginBottom: 60,
  },
  section: {
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  sectionHeading: {
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeadingText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    color: '#888',
    backgroundColor: 'transparent',
  },
  sectionContent: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  sectionContentText: {
    fontFamily: 'Muli',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  copyright: {
    alignItems: 'center',
    marginTop: 10,
  },
  copyrightText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16.8,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
});

export default styles;