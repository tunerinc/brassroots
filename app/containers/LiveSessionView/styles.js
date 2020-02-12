'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  type ViewStyleProp,
  type TextStyleProp,
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  shadow: ViewStyleProp,
  shadowBackground: ViewStyleProp,
  shadowBackgroundWrap: ViewStyleProp,
  shadowBackgroundImage: ImageStyleProp,
  backgroundFilter: ViewStyleProp,
  headerBackground: ViewStyleProp,
  headerBackgroundImage: ImageStyleProp,
  nav: ViewStyleProp,
  leftIconButton: ViewStyleProp,
  leftIcon: TextStyleProp,
  modal: ViewStyleProp,
  playerWrap: ViewStyleProp,
  chatWrap: ViewStyleProp,
  chatList: ViewStyleProp,
  chatMessageBar: ViewStyleProp,
  barShadowImage: ImageStyleProp,
  chatMessageArtButton: ViewStyleProp,
  chatMessageArt: ImageStyleProp,
  input: TextStyleProp,
  sendButton: ViewStyleProp,
  sendText: TextStyleProp,
  messageBarWrap: ViewStyleProp,
};

const screenHeight: number = Dimensions.get('window').height;
const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(27,27,30,0.9)',
  },
  shadow: {
    height: 65,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
    paddingTop: 10,
    paddingRight: 15,
    zIndex: 1,
    alignSelf: 'stretch',
  },
  shadowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  shadowBackgroundWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    width: null,
    backgroundColor: 'transparent',
  },
  shadowBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    height: screenHeight,
    width: null,
  },
  backgroundFilter: {
    backgroundColor: 'rgba(27,27,30,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
  },
  headerBackgroundImage: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
  },
  nav: {
    flex: 1,
    zIndex: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  leftIconButton: {
    flex: 2,
    backgroundColor: 'transparent',
    height: 45,
    paddingLeft: 15,
  },
  leftIcon: {
    fontSize: 30,
    paddingTop: 10,
    color: '#fefefe',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  playerWrap: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatWrap: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatList: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatMessageBar: {
    position: 'absolute',
    paddingLeft: 20,
    paddingRight: 20,
    bottom: 0,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: -8},
    shadowRadius: 5,
  },
  barShadowImage: {
    position: 'absolute',
    top: -screenHeight + 80,
    left: 0,
    right: 0,
    bottom: 0,
  },
  chatMessageArtButton: {
    width: 40,
    height: 40,
    marginRight: 15,
    marginBottom: 5,
    marginTop: 'auto',
  },
  chatMessageArt: {
    width: 40,
    height: 40,
  },
  input: {
    height: 50,
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: '#1b1b1e',
    paddingHorizontal: 10,
    backgroundColor: '#fefefe',
    borderRadius: 10,
  },
  sendButton: {
    marginBottom: 12,
    marginTop: 'auto',
    marginLeft: 12,
  },
  sendText: {
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'right',
  },
  messageBarWrap: {
    flex: 1,
  },
});

export default styles;