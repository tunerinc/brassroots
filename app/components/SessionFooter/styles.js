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
  addTrackButton: ViewStyleProp,
  addTrackIcon: ViewStyleProp,
  addTrackPlus: TextStyleProp,
  addTrackText: TextStyleProp,
  upNext: ViewStyleProp,
  upNextHeading: ViewStyleProp,
  upNextHeadingText: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  addTrackButton: {
    paddingLeft: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addTrackIcon: {
    backgroundColor: '#888',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTrackPlus: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    lineHeight: 55,
    fontSize: 40,
    color: '#fefefe',
  },
  addTrackText: {
    flex: 6,
    color: '#fefefe',
    fontSize: 16,
    
    fontWeight: '600',
    lineHeight: 19.2,
  },
  upNext: {
    marginTop: 20,
    alignItems: 'center',
  },
  upNextHeading: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  upNextHeadingText: {
    color: '#888',
    fontSize: 16,
    lineHeight: 19.2, // x1.2
    
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default styles;