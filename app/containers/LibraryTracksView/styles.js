'use strict';

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
  nav: ViewStyleProp,
  leftIconButton: ViewStyleProp,
  leftIcon: TextStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  scrollContainer: ViewStyleProp,
  tracksWrap: ViewStyleProp,
  shuffleButton: ViewStyleProp,
  shuffleButtonText: TextStyleProp,
  modal: ViewStyleProp,
  footer: ViewStyleProp,
  loadingGif: ImageStyleProp,
};

const screenHeight = Dimensions.get('window').height;
const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
    paddingTop: 10,
    paddingRight: 15,
    zIndex: 2,
    alignSelf: 'stretch',
  },
  nav: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
  },
  leftIconButton: {
    flex: 2,
    backgroundColor: 'transparent',
    height: 45,
    paddingLeft: 15,
  },
  leftIcon: {
    fontSize: 30,
    paddingTop: 7.5,
    color: '#fefefe',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 2,
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1b1b1e',
    marginTop: 65,
  },
  tracksWrap: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'transparent',
    marginTop: 65,
  },
  shuffleButton: {
    padding: 3,
    height: 45,
    backgroundColor: '#2b6dc0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  shuffleButtonText: {
    
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 23.4,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingGif: {
    width: 60,
    height: 72.6,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.7,
  },
});

export default styles;