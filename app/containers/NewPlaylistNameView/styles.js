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
  shadow: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: TextStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  rightIconText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
  newPlaylistWrap: ViewStyleProp,
  newPlaylistImageName: ViewStyleProp,
  newPlaylistImage: ViewStyleProp,
  newPlaylistImageIcon: TextStyleProp,
  newPlaylistName: ViewStyleProp,
  input: TextStyleProp,
  newPlaylistMode: ViewStyleProp,
  newPlaylistModeWrap: ViewStyleProp,
  newPlaylistModeIcon: TextStyleProp,
  newPlaylistModeInfo: ViewStyleProp,
  newPlaylistModeName: ViewStyleProp,
  newPlaylistModeNameText: TextStyleProp,
  newPlaylistModeDesc: ViewStyleProp,
  newPlaylistModeDescBullet: ViewStyleProp,
  newPlaylistModeDescBulletText: TextStyleProp,
  newPlaylistModeDescText: TextStyleProp,
  newPlaylistModeSelect: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  shadow: {
    height: 70,
    backgroundColor: '#1b1b1e',
    shadowColor: '#1b1b1e',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    paddingTop: 15,
    paddingHorizontal: 20,
    zIndex: 1,
    alignSelf: 'stretch',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#1b1b1e',
  },
  leftIcon: {
    flex: 2,
    height: 35,
    fontSize: 35,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 22,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 26.4,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 2,
    alignSelf: 'center',
  },
  rightIconText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    textAlign: 'right',
  },
  enabledText: {
    color: '#fefefe',
  },
  disabledText: {
    color: '#888',
  },
  newPlaylistWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: '#1b1b1e',
  },
  newPlaylistImageName: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#323232',
    zIndex: -2,
  },
  newPlaylistImage: {
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  newPlaylistImageIcon: {
    fontSize: 28,
  },
  newPlaylistName: {
    flex: 6,
  },
  input: {
    flex: 1,
    height: 54,
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26.5,
    color: '#fefefe',
    paddingLeft: 10,
  },
  newPlaylistMode: {
    flex: 1,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  newPlaylistModeWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  newPlaylistModeIcon: {
    flex: 2,
    fontSize: 50,
  },
  newPlaylistModeInfo: {
    flex: 6,
  },
  newPlaylistModeName: {
    marginBottom: 5,
  },
  newPlaylistModeNameText: {
    color: '#fefefe',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 23.4,
  },
  newPlaylistModeDesc: {
    paddingRight: 30,
  },
  newPlaylistModeDescBullet: {
    flexDirection: 'row',
  },
  newPlaylistModeDescBulletText: {
    fontFamily: 'Muli',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 10.8,
    color: '#888',
    marginRight: 5,
  },
  newPlaylistModeDescText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 16.8,
    color: '#888',
  },
  newPlaylistModeSelect: {
    flex: 1,
    textAlign: 'right',
    fontSize: 35,
  },
});

export default styles;