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
  syncScreen: ViewStyleProp,
  shadow: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: ViewStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  libraryWrap: ViewStyleProp,
  libraryOption: ViewStyleProp,
  libraryOptionIcon: TextStyleProp,
  libraryOptionText: TextStyleProp,
  libraryOptionArrow: TextStyleProp,
  section: ViewStyleProp,
  sectionHeader: ViewStyleProp,
  sectionTitle: TextStyleProp,
  viewAllButton: ViewStyleProp,
  viewAllText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
  modal: ViewStyleProp,
  nothing: TextStyleProp,
  empty: ViewStyleProp,
  emptyTitle: TextStyleProp,
  emptySub: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  syncScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1e',
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
    flexDirection: 'row',
    paddingTop: 15,
  },
  leftIcon: {
    flex: 2,
    height: 40,
    backgroundColor: 'transparent',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 2,
    alignSelf: 'center',
  },
  libraryWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    marginTop: 65,
  },
  libraryOption: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  libraryOptionIcon: {
    height: 55,
    width: 55,
    textAlign: 'center',
    fontSize: 55,
    marginRight: 10,
  },
  libraryOptionText: {
    flex: 6,
    fontFamily: 'Muli',
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fefefe',
  },
  libraryOptionArrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    alignSelf: 'center',
    color: '#fefefe',
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: 'Muli',
    color: '#888',
    fontSize: 16,
    lineHeight: 19.2, // x1.2
    fontWeight: '800',
    backgroundColor: 'transparent',
  },
  viewAllButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  viewAllText: {
    textAlign: 'right',
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 19.2,
    backgroundColor: 'transparent',
  },
  enabledText: {
    color: '#fefefe',
  },
  disabledText: {
    color: '#888',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  nothing: {
    fontFamily: 'Muli',
    fontSize: 16,
    lineHeight: 82,
    fontWeight: '600',
    color: '#fefefe',
    textAlign: 'center',
  },
  empty: {
    height: 75,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  emptyTitle: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 16,
    marginBottom: 5,
  },
  emptySub: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 14,
    color: '#888',
  },
});

export default styles;