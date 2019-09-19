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
  type: ViewStyleProp,
  info: ViewStyleProp,
  top: ViewStyleProp,
  images: ViewStyleProp,
  image: ViewStyleProp,
  timestampWrap: ViewStyleProp,
  timestamp: ViewStyleProp,
  bottom: ViewStyleProp,
  text: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    borderColor: '#323232',
    borderBottomWidth: 1,
    opacity: 0.3,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  images: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
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
    height: 16,
    backgroundColor: '#888',
  },
  bottom: {
    flex: 1,
  },
  text: {
    height: 20,
    backgroundColor: '#888',
  },
});

export default styles;