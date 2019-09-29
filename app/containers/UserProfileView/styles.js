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
  profileTrack: ViewStyleProp,
  favoriteTrack: ViewStyleProp,
  favoriteTrackHeader: ViewStyleProp,
  favoriteTrackIcon: TextStyleProp,
  favoriteTrackHeaderText: TextStyleProp,
  section: ViewStyleProp,
  sectionHeader: ViewStyleProp,
  sectionTitle: TextStyleProp,
  viewAllButton: ViewStyleProp,
  viewAllText: TextStyleProp,
  enabledText: TextStyleProp,
  disabledText: TextStyleProp,
  animatedHeader: ViewStyleProp,
  coverImageWrap: ViewStyleProp,
  coverImage: ImageStyleProp,
  linearGradient: ViewStyleProp | ImageStyleProp,
  nav: ViewStyleProp,
  leftIcon: ViewStyleProp | TextStyleProp,
  title: TextStyleProp,
  rightIcon: TextStyleProp,
  profileHeader: ViewStyleProp,
  user: ViewStyleProp,
  userPhoto: ViewStyleProp,
  roundPhoto: ImageStyleProp,
  userName: ViewStyleProp,
  userNameText: TextStyleProp,
  userProfileAction: ViewStyleProp,
  userProfileActionText: TextStyleProp,
  followingProfileAction: ViewStyleProp,
  followProfileAction: ViewStyleProp,
  followPerson: TextStyleProp,
  followCheck: TextStyleProp,
  followPlus: TextStyleProp,
  bio: ViewStyleProp,
  bioIcon: TextStyleProp,
  bioText: TextStyleProp,
  loadingInfo: ViewStyleProp,
  profileInfoButton: ViewStyleProp,
  location: ViewStyleProp,
  locationIcon: TextStyleProp,
  locationText: TextStyleProp,
  website: ViewStyleProp,
  websiteIcon: TextStyleProp,
  websiteText: TextStyleProp,
  loadingFollow: ViewStyleProp,
  followCount: ViewStyleProp,
  followers: ViewStyleProp,
  followersCount: TextStyleProp,
  followersText: TextStyleProp,
  following: ViewStyleProp,
  followingCount: TextStyleProp,
  followingText: TextStyleProp,
  modal: ViewStyleProp,
};

const screenHeight: number = Dimensions.get('window').height;
const HEADER_MIN_HEIGHT: number = 85;
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
    minHeight: screenHeight,
  },
  profileTrack: {
    borderColor: '#323232',
    borderBottomWidth: 1,
    backgroundColor: '#1b1b1e',
    zIndex: 5,
  },
  favoriteTrack: {
    borderColor: '#323232',
    borderTopWidth: 1,
  },
  favoriteTrackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  favoriteTrackIcon: {
    color: '#FDC52F',
    marginRight: 10,
    fontSize: 25,
  },
  favoriteTrackHeaderText: {
    fontFamily: 'Muli',
    color: '#888',
    fontSize: 16,
    lineHeight: 19.2, // x1.2
    fontWeight: '800',
    backgroundColor: 'transparent',
  },
  section: {
    marginBottom: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Muli',
    color: '#888',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  viewAllButton: {},
  viewAllText: {
    textAlign: 'right',
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
    backgroundColor: 'transparent',
  },
  enabledText: {
    color: '#fefefe',
  },
  disabledText: {
    color: '#888',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 5
  },
  coverImageWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nav: {
    paddingTop: 15,
    height: HEADER_MIN_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  leftIcon: {
    flex: 1,
    height: 45,
    fontSize: 45,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#fefefe',
  },
  title: {
    flex: 6,
    color: '#fefefe',
    fontSize: 28,
    fontFamily: 'Muli',
    fontWeight: '800',
    lineHeight: 28,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  rightIcon: {
    flex: 1,
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'right',
    backgroundColor: 'transparent',
    color: '#fefefe',
  },
  profileHeader: {
    overflow: 'hidden',
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  userPhoto: {
    width: 70,
  },
  roundPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
  },
  userName: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  userNameText: {
    fontFamily: 'Muli',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 24,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  userProfileAction: {
    width: 100,
    backgroundColor: '#1b1b1e',
    borderRadius: 10,
    borderColor: '#fefefe',
    borderWidth: 2,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  userProfileActionText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  followingProfileAction: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#2b6dc0',
  },
  followProfileAction: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#1b1b1e',
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  followPerson: {
    marginRight: 5,
    fontSize: 35,
  },
  followCheck: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 15,
    right: 7,
    fontSize: 12,
  },
  followPlus: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 13,
    right: 5,
    fontSize: 15,
  },
  bio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bioIcon: {
    width: 40,
    fontSize: 25,
    marginRight: 10,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  bioText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
    paddingRight: 45,
  },
  loadingInfo: {
    width: 150,
    height: 19.2,
    justifyContent: 'center',
  },
  profileInfoButton: {
    backgroundColor: 'transparent',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 40,
    fontSize: 25,
    marginRight: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    textAlign: 'center',
  },
  locationText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  website: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  websiteIcon: {
    width: 40,
    fontSize: 25,
    marginRight: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    textAlign: 'center',
  },
  websiteText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  loadingFollow: {
    justifyContent: 'center',
    width: 25,
    height: 19.2,
    marginRight: 5,
  },
  followCount: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
  },
  followers: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  followersCount: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  followersText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#888',
    backgroundColor: 'transparent',
  },
  following: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  followingCount: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  followingText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#888',
    backgroundColor: 'transparent',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;