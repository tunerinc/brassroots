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
  wrap: ViewStyleProp,
  aboutOptions: ViewStyleProp,
  option: ViewStyleProp,
  optionWrap: ViewStyleProp,
  optionText: TextStyleProp,
  arrow: TextStyleProp,
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
  wrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    marginTop: 65,
    paddingTop: 10,
  },
  aboutOptions: {},
  option: {
    borderColor: '#323232',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  optionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  optionText: {
    flex: 3,
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    alignSelf: 'center',
    color: '#fefefe',
  },
  bottom: {
    marginTop: 60,
  },
  section: {
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  sectionHeading: {
    paddingHorizontal: 15,
    marginBottom: 5,
    alignItems: 'center',
  },
  sectionHeadingText: {
    
    color: '#888',
    fontSize: 16,
    lineHeight: 19.2, // x1.2
    fontWeight: '800',
    backgroundColor: 'transparent',
  },
  sectionContent: {
    paddingLeft: 15,
    paddingVertical: 10,
  },
  sectionContentText: {
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#fefefe',
  },
  copyright: {
    alignItems: 'center',
    marginTop: 10,
  },
  copyrightText: {
    
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16.8,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
});

export default styles;