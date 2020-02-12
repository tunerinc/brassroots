'use strict';

/**
 * @format
 * @flow
 */

import React from 'react'
import {StyleSheet} from 'react-native';
import {
  type ViewStyleProp,
  type TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  message: ViewStyleProp,
  userBubble: ViewStyleProp,
  messageBubble: ViewStyleProp,
  messageText: TextStyleProp,
  userInfo: ViewStyleProp,
  messageInfo: ViewStyleProp,
  messageTime: TextStyleProp,
  messageUser: ViewStyleProp,
  userImage: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  message: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  userBubble: {
    marginLeft: 20,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 5,
  },
  messageBubble: {
    alignSelf: 'flex-start',
    marginRight: 20,
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 5,
  },
  messageText: {
    color: '#1b1b1e',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 19.2,
  },
  userInfo: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: 10,
  },
  messageInfo: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  messageTime: {
    color: '#888',
    fontSize: 14,
    
    fontWeight: '600',
    lineHeight: 25,
  },
  messageUser: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userImage: {
    marginLeft: 10,
    marginRight: 0,
  },
});

export default styles;