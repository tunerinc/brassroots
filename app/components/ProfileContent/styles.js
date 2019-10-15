'use strict';

/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {HEADER_DELTA, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT} from '../../containers/UserProfileView';
import {type ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  gradient: ViewStyleProp,
  profileHeader: ViewStyleProp,
  user: ViewStyleProp,
  userPhoto: ViewStyleProp,
  roundPhoto: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  profileHeader: {
    paddingTop: 10,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  userPhoto: {
    width: 55,
  },
  roundPhoto: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
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
  },
  loadingText: {
    backgroundColor: '#888',
    height: 16,
  },
  profileInfoButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#888',
  },
  locationText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
    paddingRight: 45,
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
    paddingRight: 45,
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
  },
  followersCount: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
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
  },
  followingCount: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#fefefe',
    backgroundColor: 'transparent',
  },
  followingText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#888',
    backgroundColor: 'transparent',
  },
  scrollWrap: {
    flex: 1,
    backgroundColor: '#1b1b1e',
  },
  profileTrack: {
    backgroundColor: '#1b1b1e',
    zIndex: 5,
  },
  favoriteTrack: {
    paddingBottom: 20,
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
});

export default styles;