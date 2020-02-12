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
  playlist: ViewStyleProp,
  wrap: ViewStyleProp,
  image: ViewStyleProp,
  default: ViewStyleProp,
  defaultImage: ViewStyleProp,
  info: ViewStyleProp,
  name: TextStyleProp,
  owner: TextStyleProp,
  mode: TextStyleProp,
  icons: ViewStyleProp,
  member: TextStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  playlist: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  default: {
    height: 55,
    width: 55,
    backgroundColor: '#323232',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultImage: {
    flex: 1,
    height: 34.09,
    width: 41.25,
  },
  info: {
    flex: 6,
    justifyContent: 'space-around',
    paddingTop: 7,
  },
  name: {
    flex: 1,
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
    paddingTop: 5,
  },
  owner: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    
    lineHeight: 14,
    color: '#888',
    paddingTop: 1,
  },
  mode: {
    width: 30,
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  member: {
    backgroundColor: '#1b1b1e',
    borderColor: '#fefefe',
    borderWidth: 3,
    marginRight: 5,
    marginBottom: 3,
    fontSize: 16,
    height: 26,
    width: 26,
    paddingTop: 2,
    borderRadius: 13,
    textAlign: 'center',
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    alignSelf: 'center',
    color: '#fefefe',
  },
});

export default styles;