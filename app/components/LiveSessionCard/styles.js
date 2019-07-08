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
  session: ViewStyleProp,
  header: ViewStyleProp,
  displayName: TextStyleProp,
  live: TextStyleProp,
  info: ViewStyleProp,
  image: ImageStyleProp,
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
  options: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  session: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
    height: 180,
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
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 26,
  },
  live: {
    flex: 1,
    textAlign: 'right',
    color: '#c0392b',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Muli',
    lineHeight: 26,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 10,
    borderRadius: 30,
    alignSelf: 'center',
  },
  track: {
    flex: 1,
    paddingRight: 5,
    paddingTop: 1,
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  name: {
    flex: 1,
    color: '#fefefe',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Muli',
    lineHeight: 26,
  },
  artistAlbum: {
    flex: 1,
    paddingTop: 4,
    fontFamily: 'Muli',
  },
  artists: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20.8,
    color: '#888',
  },
  separator: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: '#888',
  },
  album: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20.8,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    paddingRight: 5,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20.8,
    color: '#fefefe',
  },
  disabled: {
    color: '#888',
  },
  options: {
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    height: 40,
    backgroundColor: '#1b1b1e',
  },
});

export default styles;