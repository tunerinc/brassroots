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
  type ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface Styles {
  container: ViewStyleProp,
  scrollContainer: ViewStyleProp,
  scrollWrap: ViewStyleProp,
  section: ViewStyleProp,
  sectionTitle: TextStyleProp,
  playlistCreatorSpotify: ViewStyleProp,
  playlistCreator: ViewStyleProp,
  playlistCreatorSpotifyImage: TextStyleProp,
  playlistCreatorImage: ImageStyleProp | ViewStyleProp,
  default: ViewStyleProp,
  defaultImage: ImageStyleProp,
  playlistCreatorName: TextStyleProp,
  arrowForward: TextStyleProp,
  playlistMember: ViewStyleProp,
  playlistMemberImage: ImageStyleProp,
  playlistMemberName: TextStyleProp,
  playlistMemberViewAllFilter: ViewStyleProp,
  playlistMemberViewAllImage: ImageStyleProp,
  memberCountText: TextStyleProp,
  plus: TextStyleProp,
  playlistMemberAction: ViewStyleProp,
  playlistMemberImagePlaceholder: ViewStyleProp,
  playlistMemberInviteText: TextStyleProp,
  topMembersError: ViewStyleProp,
  topMembersErrorText: TextStyleProp,
  topMembersEmpty: ViewStyleProp,
  topMembersEmptyText: TextStyleProp,
  loadingSection: ViewStyleProp,
  playlistPlays: TextStyleProp,
  playlistPlaysNumber: TextStyleProp,
  topTracksError: ViewStyleProp,
  topTracksErrorText: TextStyleProp,
  topTracksEmpty: ViewStyleProp,
  topTracksEmptyText: TextStyleProp,
  header: ViewStyleProp,
  headerBackground: ViewStyleProp | ImageStyleProp,
  headerFilter: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: TextStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1b1b1e',
  },
  scrollWrap: {
    marginTop: 90,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 16,
    
    fontWeight: '800',
    lineHeight: 20.8,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  playlistCreatorSpotify: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistCreator: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
  },
  playlistCreatorSpotifyImage: {
    width: 55,
    height: 55,
    fontSize: 55,
    marginRight: 10,
    borderRadius: 27.5,
    color: '#888',
  },
  playlistCreatorImage: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderRadius: 27.5,
    backgroundColor: '#888',
  },
  default: {
    height: 55,
    width: 55,
    backgroundColor: '#323232',
    marginRight: 10,
    borderRadius: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultImage: {
    flex: 1,
    height: 34.09,
    width: 41.25,
  },
  playlistCreatorName: {
    flex: 6,
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
  },
  arrowForward: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    alignSelf: 'center',
  },
  playlistMember: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistMemberImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  playlistMemberName: {
    color: '#fefefe',
    fontSize: 16,
    
    fontWeight: '600',
    lineHeight: 19.2,
  },
  playlistMemberViewAllFilter: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
    opacity: 0.5,
    position: 'absolute',
    zIndex: -1,
  },
  playlistMemberViewAllImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    position: 'absolute',
    zIndex: -2,
  },
  memberCountText: {
    color: '#fefefe',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 23.4,
    backgroundColor: 'transparent',
    marginTop: 17,
  },
  plus: {
    textAlign: 'center',
    paddingTop: 4,
    fontSize: 40,
  },
  playlistMemberAction: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistMemberImagePlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistMemberInviteText: {
    color: '#fefefe',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 23.4,
  },
  topMembersError: {
    height: 80,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMembersErrorText: {
    color: '#fefefe',
    fontSize: 16,
    
    fontWeight: '600',
    lineHeight: 19.2,
  },
  topMembersEmpty: {
    height: 80,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMembersEmptyText: {
    color: '#fefefe',
    fontSize: 16,
    
    fontWeight: '600',
    lineHeight: 16,
  },
  loadingSection: {
    flexDirection: 'row',
  },
  playlistPlays: {
    marginTop: 30,
    marginBottom: 20,
    color: '#888',
    fontSize: 14,
    fontWeight: '800',
    
    textAlign: 'center',
    lineHeight: 39,
    backgroundColor: 'transparent',
  },
  playlistPlaysNumber: {
    color: '#fefefe',
    fontSize: 30,
  },
  topTracksError: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTracksErrorText: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
  },
  topTracksEmpty: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTracksEmptyText: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '600',
    
    lineHeight: 16,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 65,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#1b1b1e',
    shadowColor: '#101010',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.9,
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
    backgroundColor: 'rgba(27,27,30,0.5)',
  },
  nav: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    flex: 1,
    height: 45,
    fontSize: 30,
    paddingTop: 7,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    color: '#fefefe',
  },
  title: {
    flex: 6,
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
    fontSize: 30,
    paddingTop: 6,
    color: '#fefefe',
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
});