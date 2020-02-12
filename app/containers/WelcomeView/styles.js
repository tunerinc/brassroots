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
  container: ViewStyleProp,
  logo: ImageStyleProp,
  button: ViewStyleProp,
  text: TextStyleProp,
  loading: ViewStyleProp,
  loadingGif: ImageStyleProp,
  footnoteWrap: ViewStyleProp,
  footnote: ViewStyleProp,
  footText: TextStyleProp,
  footLink: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 165,
    width: 199.65,
    bottom: 115,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#2b6dc0',
    padding: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    borderRadius: 50,
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  text: {
    
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28.6,
    color: '#fefefe',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  loading: {
    backgroundColor: '#1b1b1e',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 200,
    height: 242,
    bottom: 115,
    justifyContent: 'center',
  },
  footnoteWrap: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  footnote: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 18,
  },
  footLink: {
    color: '#2b6dc0',
    fontSize: 14,
    lineHeight: 18
  },
});

export default styles;