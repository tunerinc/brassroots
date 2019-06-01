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
  container: ViewStyleProp,
  image: ViewStyleProp,
  info: ViewStyleProp,
  header: ViewStyleProp,
  member: ViewStyleProp,
  timestamp: ViewStyleProp,
  content: ViewStyleProp,
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
  image: {
    flex: 1,
    alignSelf: 'flex-start',
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
  member: {
    flex: 3,
    paddingRight: 20,
  },
  timestamp: {
    flex: 1,
  },
  content: {
    flex: 2,
  },
});

export default styles;