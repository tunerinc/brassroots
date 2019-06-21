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
  track: ViewStyleProp,
  wrap: ViewStyleProp,
  image: ImageStyleProp,
  editIcon: TextStyleProp,
  imageFilter: ViewStyleProp,
  round: ViewStyleProp,
  position: ViewStyleProp,
  positionText: TextStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  bottom: TextStyleProp,
  bottomText: TextStyleProp,
  gray: TextStyleProp,
  user: TextStyleProp,
  options: TextStyleProp,
  count: ViewStyleProp,
  play: TextStyleProp,
  number: TextStyleProp,
  favoriteTrackIcon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  track: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 82,
    width: '100%',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  editIcon: {
    backgroundColor: 'transparent',
    color: '#fefefe',
    fontSize: 40,
  },
  imageFilter: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(136,136,136,0.5)'
  },
  round: {
    borderRadius: 30,
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
  bottom: {
    paddingTop: 6,
    fontFamily: 'Muli',
  },
  bottomText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#888',
  },
  gray: {
    color: '#888',
  },
  user: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
    color: '#888',
    paddingTop: 2,
    fontFamily: 'Muli',
  },
  options: {
    flex: 1,
    textAlign: 'right',
    height: 45,
    backgroundColor: '#1b1b1e',
    fontSize: 35,
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
  favoriteTrackIcon: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
    color: '#FDC52F',
  },
});

export default styles;