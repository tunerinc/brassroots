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
  white: TextStyleProp,
  gray: TextStyleProp,
  blue: TextStyleProp,
  reportWrap: ViewStyleProp,
  section: ViewStyleProp,
  sectionHeader: ViewStyleProp,
  sectionHeaderText: TextStyleProp,
  sectionOption: ViewStyleProp,
  sectionOptionWrap: ViewStyleProp,
  sectionOptionText: TextStyleProp,
  optionCheck: TextStyleProp,
  reportMessage: ViewStyleProp,
  input: TextStyleProp,
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
  rightIconText: {
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    textAlign: 'right',
  },
  white: {
    color: '#fefefe',
  },
  gray: {
    color: '#888',
  },
  blue: {
    color: '#2b6dc0',
  },
  reportWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    marginTop: 65,
    paddingTop: 10,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  sectionHeaderText: {
    
    color: '#888',
    fontSize: 16,
    lineHeight: 19.2, // x1.2
    fontWeight: '800',
    backgroundColor: 'transparent',
  },
  sectionOption: {
    borderColor: '#323232',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  sectionOptionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionOptionText: {
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#fefefe',
  },
  optionCheck: {
    fontSize: 25,
  },
  reportMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  input: {
    flex: 5,
    minHeight: 44,
    height: 'auto',
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#fefefe',
  },
});

export default styles;