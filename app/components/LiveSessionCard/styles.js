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
  session: ViewStyleProp,
  header: ViewStyleProp,
  displayName: TextStyleProp,
  live: TextStyleProp,
  info: ViewStyleProp,
  image: ViewStyleProp,
  track: ViewStyleProp,
  name: TextStyleProp,
  artistAlbum: TextStyleProp,
  artists: TextStyleProp,
  separator: TextStyleProp,
  album: TextStyleProp,
  footer: ViewStyleProp,
  action: ViewStyleProp,
  actionIcon: TextStyleProp,
  actionText: TextStyleProp,
  disabled: TextStyleProp,
  optionsButton: ViewStyleProp,
  options: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  session: {
    height: 150,
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    paddingTop: 15,
    borderColor: '#323232',
    borderBottomWidth: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  displayName: {
    flex: 4,
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
  },
  live: {
    flex: 1,
    textAlign: 'right',
    color: '#c0392b',
    fontSize: 16,
    fontWeight: '800',
    
    lineHeight: 16,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
    borderRadius: 27.5,
    alignSelf: 'center',
  },
  track: {
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
  artistAlbum: {
    paddingTop: 6,
    
  },
  artists: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#888',
  },
  separator: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#888',
  },
  album: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    flex: 2,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    paddingRight: 5,
    fontSize: 25,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16.8,
    color: '#fefefe',
  },
  disabled: {
    color: '#888',
  },
  optionsButton: {
    flex: 1,
    height: 45,
    backgroundColor: '#1b1b1e',
    paddingTop: 7.5,
  },
  options: {
    textAlign: 'right',
    fontSize: 30,
    color: '#fefefe',
  },
});

export default styles;