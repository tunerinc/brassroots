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
  session: ViewStyleProp,
  header: ViewStyleProp,
  owner: ViewStyleProp,
  live: ViewStyleProp,
  info: ViewStyleProp,
  image: ViewStyleProp,
  track: ViewStyleProp,
  footer: ViewStyleProp,
  action: ViewStyleProp,
  text: ViewStyleProp,
  options: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  session: {
    height: 150,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#323232',
    borderBottomWidth: 1,
    opacity: 0.3,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  owner: {
    flex: 4,
  },
  live: {
    flex: 1,
  },
  info: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  image: {},
  track: {
    flex: 1,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  text: {
    flex: 1,
    paddingLeft: 10,
  },
  options: {
    flex: 1,
    textAlign: 'right',
    backgroundColor: '#1b1b1e',
    fontSize: 30,
    color: '#888',
  },
});

export default styles;