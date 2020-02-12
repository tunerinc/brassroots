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
  albumArtists: ViewStyleProp,
  sectionTitle: TextStyleProp,
  singleAlbumArtist: ViewStyleProp,
  singleAlbumArtistImage: ImageStyleProp,
  singleAlbumArtistName: TextStyleProp,
  albumArtist: ViewStyleProp,
  albumArtistImage: ImageStyleProp,
  albumArtistName: TextStyleProp,
  arrowForward: TextStyleProp,
  topListeners: ViewStyleProp,
  topListener: ViewStyleProp,
  topListenerImage: ImageStyleProp,
  topListenerName: TextStyleProp,
  topListenersError: ViewStyleProp,
  topListenersErrorText: TextStyleProp,
  loadingSection: ViewStyleProp,
  albumPlays: TextStyleProp,
  albumPlaysNumber: TextStyleProp,
  topTracks: ViewStyleProp,
  topTracksError: ViewStyleProp,
  topTracksErrorText: TextStyleProp,
  header: ViewStyleProp,
  headerBackground: ViewStyleProp | ImageStyleProp,
  headerFilter: ViewStyleProp,
  nav: ViewStyleProp,
  leftIcon: TextStyleProp,
  title: TextStyleProp,
  rightIcon: ViewStyleProp,
};

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
    marginTop: 90,
    paddingBottom: 20,
  },
  albumArtists: {
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
  singleAlbumArtist: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleAlbumArtistImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
  },
  singleAlbumArtistName: {
    flex: 6,
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '600',
    lineHeight: 26,
  },
  albumArtist: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumArtistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  albumArtistName: {
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '600',
    lineHeight: 26,
  },
  arrowForward: {
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
  },
  topListeners: {},
  topListener: {
    width: 80,
    height: 90,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topListenerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  topListenerName: {
    color: '#fefefe',
    fontSize: 20,
    
    fontWeight: '600',
    lineHeight: 26,
  },
  topListenersError: {
    height: 80,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topListenersErrorText: {
    color: '#fefefe',
    fontSize: 18,
    
    fontWeight: '600',
    lineHeight: 23.4,
  },
  loadingSection: {
    flexDirection: 'row',
  },
  albumPlays: {
    marginTop: 30,
    marginBottom: 20,
    color: '#888',
    fontSize: 16,
    fontWeight: '800',
    
    textAlign: 'center',
    lineHeight: 39,
    backgroundColor: 'transparent',
  },
  albumPlaysNumber: {
    color: '#fefefe',
    fontSize: 30,
  },
  topTracks: {},
  topTracksError: {
    height: 75,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTracksErrorText: {
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
    height: 60,
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
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
});

export default styles;