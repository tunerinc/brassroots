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
  timestamp: ViewStyleProp,
  bottom: ViewStyleProp,
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
    flex: 1,
    alignSelf: 'flex-start',
  },
  info: {
    flex: 7,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  images: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  timestamp: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
});

export default styles;