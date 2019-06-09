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
    flex: 1,
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
    flex: 1,
    alignSelf: 'center',
  },
  rightIconText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.6,
    textAlign: 'right',
  },
  enabledText: {
    color: '#fefefe',
  },
  disabledText: {
    color: '#888',
  },
  reportWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    paddingTop: 10,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  sectionHeaderText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    color: '#888',
  },
  sectionOption: {
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  sectionOptionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionOptionText: {
    fontFamily: 'Muli',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    color: '#fefefe',
  },
  optionCheck: {
    fontSize: 45,
  },
  reportMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  input: {
    flex: 5,
    height: 64,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: '#fefefe',
    backgroundColor: 'transparent'
  },
});

export default styles;