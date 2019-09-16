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
  shadow: ViewStyleProp,
  nav: ViewStyleProp,
  navButton: ViewStyleProp,
  navButtonText: TextStyleProp,
  socialWrap: ViewStyleProp,
  notificationsWrap: ViewStyleProp,
  messagesWrap: ViewStyleProp,
  newMessageButton: ViewStyleProp,
  newMessageButtonText: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b1b1e',
    justifyContent: 'center',
  },
  shadow: {
    height: 85,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 5,
    paddingTop: 15,
    paddingHorizontal: 20,
    zIndex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: 'transparent',
  },
  navButtonText: {
    textAlign: 'center',
    fontFamily: 'Muli',
    fontSize: 28,
    lineHeight: 33.6,
    fontWeight: '800',
  },
  socialWrap: {
    flex: 1,
  },
  notificationsWrap: {
    flex: 1,
    zIndex: -1,
    paddingTop: 10,
  },
  messagesWrap: {
    flex: 1,
    zIndex: -1,
    paddingTop: 10,
  },
  newMessageButton: {
    padding: 5,
    height: 50,
    backgroundColor: '#2b6dc0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  newMessageButtonText: {
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28.6,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
});

export default styles;