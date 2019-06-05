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
  sessionLiveMode: ViewStyleProp,
  sessionLiveText: TextStyleProp,
  sessionOptions: ViewStyleProp,
  listenersButton: ViewStyleProp,
  listenersIcon: TextStyleProp,
  listenersTotal: TextStyleProp,
  distance: ViewStyleProp,
  distanceIcon: TextStyleProp,
  distanceText: TextStyleProp,
  shareButton: ViewStyleProp,
  shareIcon: TextStyleProp,
  shareText: TextStyleProp,
  queue: ViewStyleProp,
  queueTitle: TextStyleProp,
  queueOption: ViewStyleProp,
  queueOptionText: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  sessionLiveMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sessionLiveText: {
    color: '#c0293b',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
  sessionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listenersButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listenersIcon: {
    marginRight: 10,
    fontSize: 35,
  },
  listenersTotal: {
    color: '#fefefe',
    fontSize: 18,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 21.6,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    marginRight: 10,
    fontSize: 35,
  },
  distanceText: {
    color: '#888',
    fontSize: 18,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 21.6,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: 10,
    fontSize: 35,
  },
  shareText: {
    color: '#fefefe',
    fontSize: 18,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 21.6,
  },
  queue: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  queueTitle: {
    color: '#fefefe',
    fontSize: 28,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 33.6,
  },
  queueOption: {

  },
  queueOptionText: {
    color: '#fefefe',
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: '600',
    lineHeight: 33.6,
  },
});

export default styles;