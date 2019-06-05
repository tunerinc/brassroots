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
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addTrackIcon: {
    backgroundColor: '#888',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTrackPlus: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingTop: 2,
    fontSize: 45,
  },
  addTrackText: {
    flex: 6,
    color: '#fefefe',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 26,
  },
  upNext: {
    marginTop: 20,
    alignItems: 'center',
  },
  upNextHeading: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  upNextHeadingText: {
    color: '#fefefe',
    fontSize: 18,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 21.6,
    textAlign: 'center',
  },
});

export default styles;