'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {type ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  typeWrap: ViewStyleProp,
  type: ViewStyleProp,
  info: ViewStyleProp,
  top: ViewStyleProp,
  images: ViewStyleProp,
  image: ViewStyleProp,
  timestampWrap: ViewStyleProp,
  timestamp: ViewStyleProp,
  bottom: ViewStyleProp,
  text: ViewStyleProp,
  topText: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#323232',
    borderBottomWidth: 1,
    opacity: 0.3,
  },
  typeWrap: {
    marginRight: 20,
  },
  type: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#888',
  },
  info: {
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  images: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#888',
  },
  timestampWrap: {
    flex: 1,
  },
  timestamp: {
    height: 14,
    backgroundColor: '#888',
  },
  bottom: {
    marginBottom: -10,
  },
  text: {
    height: 16,
    backgroundColor: '#888',
  },
  topText: {
    marginTop: 10,
    marginBottom: 6.2,
  },
});

export default styles;