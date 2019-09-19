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
  imageWrap: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  header: ViewStyleProp,
  memberWrap: ViewStyleProp,
  timestampWrap: ViewStyleProp,
  timestamp: ViewStyleProp,
  content: ViewStyleProp,
  text: ViewStyleProp,
  topText: ViewStyleProp,
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
  imageWrap: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  image: {
    width: 55,
    height: 55,
    backgroundColor: '#888',
  },
  info: {
    flex: 4,
    paddingLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  memberWrap: {
    flex: 3,
    paddingRight: 20,
  },
  timestampWrap: {
    flex: 1,
  },
  timestamp: {
    height: 16,
    backgroundColor: '#888',
  },
  content: {
    flex: 2,
  },
  text: {
    height: 20,
    backgroundColor: '#888',
  },
  topText: {
    marginBottom: 6.2,
  },
});

export default styles;