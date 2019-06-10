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
    flex: 2,
    height: 45,
    backgroundColor: 'transparent',
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
    flex: 2,
    alignSelf: 'center',
  },
  libraryWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    marginTop: 70,
  },
  libraryOption: {
    paddingVertical: 7.5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  libraryOptionIcon: {
    flex: 2,
    textAlign: 'center',
  },
  libraryOptionText: {
    flex: 6,
    paddingLeft: 10,
    fontFamily: 'Muli',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fefefe',
  },
  libraryOptionArrow: {
    flex: 2,
    textAlign: 'right',
    color: '#fefefe',
    fontSize: 45,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Muli',
    color: '#888',
    fontSize: 16,
    lineHeight: 19.2,
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
    fontSize: 18,
    lineHeight: 92,
    fontWeight: '600',
    color: '#fefefe',
    textAlign: 'center',
  },
  empty: {
    paddingTop: 24.4,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontFamily: 'Muli',
    fontSize: 18,
    lineHeight: 21.6,
    fontWeight: '600',
    color: '#fefefe',
    marginBottom: 5,
  },
  emptySub: {
    fontFamily: 'Muli',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '600',
    color: '#888',
  },
});

export default styles;