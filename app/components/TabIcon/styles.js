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
  tabWrap: ViewStyleProp,
  selectedTabIcon: TextStyleProp,
  tabIcon: TextStyleProp,
  selectedTabText: TextStyleProp,
  tabText: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  tabWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selectedTabIcon: {
    alignSelf: 'center',
    shadowColor: '#fefefe',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    marginBottom: 3,
  },
  tabIcon: {
    alignSelf: 'center',
    marginBottom: 3,
  },
  selectedTabText: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 11,
    color: '#fefefe',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 11,
    color: '#888',
  }
});

export default styles;