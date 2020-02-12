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
  header: ViewStyleProp,
  title: TextStyleProp,
  button: ViewStyleProp,
  text: TextStyleProp,
  disabled: TextStyleProp,
  nothing: TextStyleProp,
  empty: ViewStyleProp,
  emptyTitle: TextStyleProp,
  emptyText: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#1b1b1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    
    color: '#888',
    fontSize: 16,
    lineHeight: 19.2, // x1.2
    fontWeight: '800',
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'right',
    
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 19.2,
    backgroundColor: 'transparent',
    color: '#fefefe',
    textTransform: 'uppercase',
  },
  disabled: {
    color: '#888',
  },
  nothing: {
    
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
    
    lineHeight: 16,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    
    lineHeight: 14,
    color: '#888',
  },
});

export default styles;