'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import Dimensions from 'Dimensions';
import {StyleSheet} from 'react-native';
import {
  type ViewStyleProp,
  type TextStyleProp,
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  scrollContainer: ViewStyleProp,
  scrollWrap: ViewStyleProp,
  favoriteWrapper: ViewStyleProp,
  displayName: ViewStyleProp,
  profileLeftIcon: TextStyleProp,
  input: TextStyleProp,
  bio: ViewStyleProp,
  location: ViewStyleProp,
  website: ViewStyleProp,
  email: ViewStyleProp,
  profileRightIconWrap: ViewStyleProp,
  profileRightIcon: TextStyleProp,
  birthdate: ViewStyleProp,
  animatedHeader: ViewStyleProp,
  headerBackground: ViewStyleProp | ImageStyleProp,
  headerFilter: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: TextStyleProp | ViewStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
  createText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
  photos: ViewStyleProp,
  roundPhoto: ImageStyleProp,
  editProfilePhoto: ViewStyleProp,
  photoButton: ViewStyleProp,
  roundPhotoWrap: ViewStyleProp,
  roundPhotoFilter: ViewStyleProp,
  editPhotoText: TextStyleProp,
  editCoverPhoto: ViewStyleProp,
};

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const HEADER_MAX_HEIGHT: number = 261;
const HEADER_MIN_HEIGHT: number = 70;
const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1b1b1e',
  },
  scrollWrap: {
    marginTop: HEADER_MAX_HEIGHT,
    minHeight: screenHeight - HEADER_MIN_HEIGHT,
  },
  favoriteWrapper: {
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  displayName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  profileLeftIcon: {
    width: 50,
    fontSize: 35,
    color: '#888',
    textAlign: 'center',
  },
  input: {
    flex: 5,
    height: 54,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.6,
    color: '#fefefe',
    paddingLeft: 10,
  },
  bio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  website: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  profileRightIconWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  profileRightIcon: {
    flex: 1,
    textAlign: 'right',
    color: '#888'
  },
  birthdate: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: '#323232',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 5,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
  },
  headerFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(27,27,30,0.5)'
  },
  nav: {
    height: HEADER_MIN_HEIGHT,
    flexDirection: 'row',
    paddingTop: 10,
  },
  leftIcon: {
    flex: 2,
    height: 45,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 22,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 26.4,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 2,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  createText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2,
    textAlign: 'right',
  },
  enabledText: {
    color: '#fefefe',
  },
  disabledText: {
    color: '#888'
  },
  photos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  roundPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
  },
  editProfilePhoto: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  photoButton: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  roundPhotoWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: '#888',
  },
  roundPhotoFilter: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(136,136,136,0.5)'
  },
  editPhotoText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.6,
    color: '#fefefe'
  },
  editCoverPhoto: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});

export default styles;