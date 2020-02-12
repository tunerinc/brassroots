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
  track: ViewStyleProp,
  wrap: ViewStyleProp,
  image: ViewStyleProp,
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
  optionsButton: ViewStyleProp,
  options: TextStyleProp,
  count: ViewStyleProp,
  play: TextStyleProp,
  number: TextStyleProp,
  favoriteTrackIcon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  track: {
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: '100%',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  editIcon: {
    backgroundColor: 'transparent',
    color: '#fefefe',
    fontSize: 40,
  },
  imageFilter: {
    width: 55,
    height: 55,
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
    borderRadius: 27.5,
  },
  position: {
    flex: 1,
  },
  positionText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
    
    color: '#888',
  },
  info: {
    flex: 6,
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  name: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
  },
  bottom: {
    paddingTop: 6,
    
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
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#888',
    paddingTop: 6,
    
  },
  optionsButton: {
    flex: 1,
    height: 45,
    backgroundColor: 'transparent',
    paddingTop: 7.5,
    paddingRight: 15,
  },
  options: {
    textAlign: 'right',
    fontSize: 30,
    color: '#fefefe',
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