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
  slider: ViewStyleProp,
  seekingSlider: ViewStyleProp,
  thumb: ViewStyleProp,
  seekingThumb: ViewStyleProp,
  times: ViewStyleProp,
  current: TextStyleProp,
  remaining: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  slider: {},
  seekingSlider: {
    shadowColor: '#fefefe',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: .5,
  },
  thumb: {
    borderRadius: 2,
    width: 4,
    height: 25,
  },
  seekingThumb: {
    borderRadius: 2,
    width: 8,
    height: 30,
    shadowColor: '#fefefe',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    shadowOpacity: .7,
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  current: {
    color: '#fefefe',
    fontSize: 14,
    
    fontWeight: '600',
    lineHeight: 16.8, // x1.2
  },
  remaining: {
    color: '#fefefe',
    fontSize: 14,
    
    fontWeight: '600',
    lineHeight: 16.8,
  },
});

export default styles;