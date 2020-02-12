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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  sessionLiveText: {
    color: '#c0293b',
    fontSize: 18,
    
    fontWeight: '800',
    paddingTop: 5,
    lineHeight: 18,
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
  sessionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  listenersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  listenersIcon: {
    marginRight: 10,
    fontSize: 35,
    height: 35,
  },
  listenersTotal: {
    color: '#fefefe',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 23.4, // x1.3
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  distanceIcon: {
    marginRight: 10,
    height: 35,
    fontSize: 35,
  },
  distanceText: {
    color: '#888',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 23.4, // x1.3
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  shareIcon: {
    marginRight: 10,
    height: 35,
    fontSize: 35,
  },
  shareText: {
    color: '#fefefe',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 23.4, // x1.3
  },
  queue: {
    marginTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  queueTitle: {
    color: '#fefefe',
    fontSize: 24,
    
    fontWeight: '800',
    lineHeight: 28.8,
    paddingVertical: 10,
  },
  queueOption: {
    paddingVertical: 10,
  },
  queueOptionText: {
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default styles;