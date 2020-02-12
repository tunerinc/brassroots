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

const screenHeight: number = Dimensions.get('window').height;
const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  shadow: {
    height: 75,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
    paddingTop: 20,
    paddingHorizontal: 10,
    zIndex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  cancelSearchButton: {
    alignItems: 'flex-end',
    width: 50,
  },
  cancelSearchButtonText: {
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    textAlign: 'right',
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
    height: screenHeight - 85,
  },
  section: {
    marginBottom: 20,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    
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
});

export default styles;