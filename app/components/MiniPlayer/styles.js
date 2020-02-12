'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {screenWidth} from '../MiniPlayer';
import {
  type ViewStyleProp,
  type TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  player: ViewStyleProp,
  playerProgress: ViewStyleProp,
  playerButton: ViewStyleProp,
  playerImageButton: ViewStyleProp,
  playerImage: ViewStyleProp,
  playerInfo: ViewStyleProp,
  playerTrack: TextStyleProp,
  playerTrackName: TextStyleProp,
  playerTrackSeparator: TextStyleProp,
  playerSessionOwner: TextStyleProp,
  playerAction: ViewStyleProp,
  playIcon: TextStyleProp,
  pauseIcon: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  player: {
    height: 55,
    zIndex: 3,
    backgroundColor: 'rgba(27,27,30,0.7)',
  },
  playerProgress: {
    height: 3,
    backgroundColor: '#2b6dc0',
  },
  playerButton: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerImageButton: {},
  playerImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  playerInfo: {
    flex: 6,
    alignItems: 'center',
  },
  playerTrack: {
    
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20.8,
    textAlign: 'center',
    color: '#888',
    backgroundColor: 'transparent',
  },
  playerTrackName: {
    color: '#fefefe'
  },
  playerTrackSeparator: {},
  playerSessionOwner: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 19.2,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  playerAction: {
    width: 35,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  playIcon: {
    width: 35,
    textAlign: 'right',
    fontSize: 35,
  },
  pauseIcon: {
    width: 35,
    textAlign: 'center',
    fontSize: 35,
  },
});

export default styles;