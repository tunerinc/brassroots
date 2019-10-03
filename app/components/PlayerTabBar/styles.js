'use strict';

/**
 * @format
 * @flow
 */

import {StyleSheet, Dimensions} from 'react-native';
import {
  type ViewStyleProp,
  type TextStyleProp,
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  wrap: ViewStyleProp,
  tabbar: ViewStyleProp,
  playerBackgroundWrap: ViewStyleProp,
  playerBackgroundImage: ImageStyleProp,
  tabButton: ViewStyleProp,
  cover: ViewStyleProp,
};

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;

const styles: Styles = StyleSheet.create({
  container: {
    backgroundColor: '#28282B',
    zIndex: 1,
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: -5},
    shadowRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  wrap: {
    width: '100%',
  },
  tabbar: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
  },
  playerBackgroundWrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -60,
    overflow: 'hidden',
  },
  playerBackgroundImage: {
    position: 'absolute',
    top: -screenHeight + 110,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    width: screenWidth / 5,
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1b1b1e',
  },
});

export default styles;