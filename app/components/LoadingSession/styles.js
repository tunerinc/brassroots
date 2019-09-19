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
  headerText: ViewStyleProp,
  info: ViewStyleProp,
  image: ViewStyleProp,
  text: ViewStyleProp,
  topText: ViewStyleProp,
  footer: ViewStyleProp,
  action: ViewStyleProp,
  icon: ViewStyleProp,
  iconText: ViewStyleProp,
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
  },
  owner: {
    flex: 4,
  },
  live: {
    flex: 1,
  },
  headerText: {
    height: 16,
    backgroundColor: '#888',
  },
  info: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10,
    backgroundColor: '#888',
  },
  text: {
    height: 16,
    backgroundColor: '#888',
  },
  topText: {
    marginBottom: 6.2,
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
    marginRight: 20,
    height: 45,
  },
  icon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#888',
  },
  iconText: {
    height: 14,
    backgroundColor: '#888',
  },
  options: {
    flex: 1,
    textAlign: 'right',
    height: 45,
    backgroundColor: '#1b1b1e',
    paddingTop: 7.5,
    fontSize: 30,
    color: '#888',
  },
});

export default styles;