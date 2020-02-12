'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  type ViewStyleProp,
  type TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  modal: ViewStyleProp,
  controls: ViewStyleProp,
  control: ViewStyleProp,
  controlSelected: ViewStyleProp,
  disabledControl: ViewStyleProp,
  disabledControlSelected: ViewStyleProp,
  icon: TextStyleProp,
  controlText: TextStyleProp,
  option: ViewStyleProp,
  button: ViewStyleProp,
  optionText: TextStyleProp,
  cancel: ViewStyleProp,
  cancelButton: ViewStyleProp,
  disabled: TextStyleProp,
  selected: TextStyleProp,
};

const screenWidth: number = Dimensions.get('window').width;
const styles: Styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fefefe',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth / 3 - 15,
    borderColor: '#1b1b1e',
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 5,
    height: 45,
  },
  controlSelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b6dc0',
    width: screenWidth/3-15,
    borderColor: 'transparent',
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 5,
    height: 45,
  },
  disabledControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth/3-15,
    borderColor: 'rgba(136,136,136,0.5)',
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 5,
    height: 45,
  },
  disabledControlSelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth/3-15,
    backgroundColor: 'rgba(43, 109, 192, 0.5)',
    borderColor: 'transparent',
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 5,
    height: 45,
  },
  icon: {
    marginRight: 5,
  },
  controlText: {
    color: '#1b1b1e',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 21.6,
  },
  option: {
    borderColor: '#888',
    borderTopWidth: 1,
  },
  button: {
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    paddingVertical: 12.5,
  },
  optionText: {
    color: '#1b1b1e',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 21.6, // x1.2
    textAlign: 'center',
  },
  cancel: {
    backgroundColor: '#fefefe',
    borderColor: '#888',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  cancelButton: {
    paddingVertical: 20,
    backgroundColor: '#fefefe',
  },
  disabled: {
    color: 'rgba(136,136,136,0.5)',
  },
  selected: {
    color: '#fefefe',
    fontWeight: '800',
  },
});

export default styles;