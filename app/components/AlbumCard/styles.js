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
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  album: ViewStyleProp,
  wrap: ViewStyleProp,
  position: ViewStyleProp,
  positionText: TextStyleProp,
  image: ImageStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  artists: TextStyleProp,
  arrow: TextStyleProp,
  count: ViewStyleProp,
  play: TextStyleProp,
  number: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  album: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    height: 82,
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    flex: 1,
  },
  positionText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
    fontFamily: 'Muli',
    color: '#888',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  info: {
    flex: 6,
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  name: {
    color: '#fefefe',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 18,
  },
  artists: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 14,
    color: '#888',
    paddingTop: 6,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 35,
    alignSelf: 'center',
  },
  count: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  play: {
    fontSize: 20,
  },
  number: {
    color: '#fefefe',
    fontSize: 16,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 20.8,
    marginLeft: 7,
    paddingBottom: 1,
  },
});

export default styles;