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
  placeholderWrap: ViewStyleProp,
  image: ViewStyleProp,
  text: ViewStyleProp,
  topText: ViewStyleProp,
  arrow: TextStyleProp,
};

const styles: Styles =  StyleSheet.create({
  playlist: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
  },
  wrap: {
    flex: 7,
  },
  placeholderWrap: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
    backgroundColor: '#888',
  },
  text: {
    height: 16,
    backgroundColor: '#888',
  },
  topText: {
    marginTop: 10,
    marginBottom: 6.2,
  },
  arrow: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 5,
    paddingTop: 3,
    fontSize: 30,
    color: '#888',
  },
});

export default styles;