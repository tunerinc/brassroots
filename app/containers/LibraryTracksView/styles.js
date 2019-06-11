'use strict';

import React from 'react';
import Dimensions from 'Dimensions';
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
  scrollContainer: ViewStyleProp,
  scrollWrap: ViewStyleProp,
  shuffleButton: ViewStyleProp,
  shuffleButtonText: TextStyleProp,
  modal: ViewStyleProp,
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
    height: 70,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
    paddingTop: 15,
    paddingHorizontal: 20,
    zIndex: 2,
    alignSelf: 'stretch',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1b1b1e',
    marginTop: 70,
  },
  scrollWrap: {
    minHeight: screenHeight - 85,
  },
  shuffleButton: {
    padding: 5,
    height: 50,
    backgroundColor: '#2b6dc0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  shuffleButtonText: {
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28.6,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;