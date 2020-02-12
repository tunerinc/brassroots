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
  editIcon: TextStyleProp,
  editPhotoText: TextStyleProp,
  editCoverPhoto: ViewStyleProp,
  loadingImage: ViewStyleProp,
};

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const HEADER_MAX_HEIGHT: number = 261;
const HEADER_MIN_HEIGHT: number = 65;
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
    paddingHorizontal: 15,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  profileLeftIcon: {
    width: 55,
    fontSize: 30,
    color: '#888',
    textAlign: 'center',
  },
  input: {
    flex: 5,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#fefefe',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 10,
  },
  bio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  website: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
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
    paddingHorizontal: 15,
    borderColor: '#323232',
    borderBottomWidth: 1,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 5,
    paddingHorizontal: 15,
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
    width: null,
    backgroundColor: 'rgba(27,27,30,0.5)',
  },
  nav: {
    height: HEADER_MIN_HEIGHT,
    flexDirection: 'row',
    paddingTop: 10,
  },
  leftIcon: {
    flex: 1,
    height: 45,
    fontSize: 30,
    paddingTop: 7.5,
    color: '#fefefe',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  title: {
    flex: 4,
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 1,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  createText: {
    
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
    marginTop: 10,
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
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  photoButton: {
    borderRadius: 35,
    justifyContent: 'center',
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
  editIcon: {
    backgroundColor: 'transparent',
    color: '#fefefe',
    fontSize: 40,
  },
  editPhotoText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.2, // x1.2
    color: '#fefefe',
  },
  editCoverPhoto: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#fefefe'
  },
  placeholderWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#888',
  },
});

export default styles;