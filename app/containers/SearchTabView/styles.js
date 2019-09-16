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
  cancelSearchButton: ViewStyleProp,
  searchInput: TextStyleProp,
  searchWrap: ViewStyleProp,
  activeSearchFilter: ViewStyleProp,
  section: ViewStyleProp,
  sectionHeader: ViewStyleProp,
  sectionTitle: TextStyleProp,
  viewAllButton: ViewStyleProp,
  viewAllText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
};

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
  cancelSearchButton: {
    alignItems: 'flex-end',
  },
  cancelSearchButtonText: {
    fontWeight: '600',
    fontFamily: 'Muli',
    textAlign: 'right',
    fontSize: 18,
    lineHeight: 21.6,
  },
  searchInput: {
    marginRight: 0,
    color: '#323232',
  },
  searchWrap: {
    flex: 1,
  },
  activeSearchFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#888',
    zIndex: 2,
  },
  section: {
    marginBottom: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Muli',
    color: '#888',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  viewAllButton: {

  },
  viewAllText: {
    textAlign: 'right',
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
    backgroundColor: 'transparent',
  },
  enabledText: {
    color: '#fefefe',
  },
  disabledText: {
    color: '#888',
  },
});

export default styles;