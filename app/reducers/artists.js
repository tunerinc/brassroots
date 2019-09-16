'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Action as AlbumAction} from './albums';
import {type Action as TrackAction} from './tracks';
import {type Action as EntitiesAction} from './entities';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import * as types from '../actions/artists/types';
import * as entitiesTypes from '../actions/entities/types';

// Case Functions

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction = Action | AlbumAction | TrackAction | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type Artist = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +small?: ?string,
  +medium?: ?string,
  +large?: ?string,
  +images?: [],
  +albums?: Array<string>,
  +totalPlays?: number,
  +userPlays?: number,
  +userAlbums?: Array<string>,
  +userTracks?: Array<string>,
  +topAlbums?: Array<string>,
  +topListeners?: Array<string>,
  +topPlaylists?: Array<string>,
  +topTracks?: Array<string>,
  +userProfile?: ?string,
};

type Action = {
  +type?: string,
  +error?: Error,
  +artists?: {+[id: string]: Artist} | Array<string>,
  +artistID?: string,
  +item?: ?Artist,
  +topAlbums?: Array<string>,
  +listeners?: Array<string>,
  +playlistIDs?: Array<string>,
  +trackIDs?: Array<string>,
  +artistCounts?: Array<number>,
  +artistCount?: number,
  +refreshing?: boolean,
  +updates?: State,
};

type State = {
  +lastUpdated?: string,
  +userArtists?: Array<string>,
  +totalUserArtists?: number,
  +selectedArtist?: ?string,
  +searching?: ?Array<string>,
  +fetching?: ?Array<string>,
  +incrementing?: boolean,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Artist,
  Action,
  State,
};

/**
 * @constant
 * @alias artistState
 * @type {object}
 * 
 * @property {string}   lastUpdated  The date/time the single artist was last updated
 * @property {string}   id=null      The Spotify id of the artist
 * @property {string}   name=null    The name of the artist
 * @property {string}   small=null   120x120 size image url for artist
 * @property {string}   medium=null  320x320 size image url for artist
 * @property {string}   large-null   640x640 size image url for artist
 * @property {string[]} albums       The Spotify ids of a single artist's albums in order of release date
 * @property {number}   totalPlays=0 The total amount of plays a single artist has
 * @property {number}   userPlays=0  The total amount of plays the current user has for the artist
 * @property {string[]} userAlbums   The Spotify ids of the albums the current user has saved by the artist
 * @property {string[]} userTracks   The Spotify ids of the tracks the current user has saved by the artist
 * @property {string[]} topAlbums    The Spotify ids of the top albums of an artist
 * @property {string[]} topListeners The Brassroots ids of the top listeners of an artist
 * @property {string[]} topPlaylists The Spotify ids of the top playlists of an artist
 * @property {string[]} topTracks    The Spotify ids of the top tracks of an artist
 */
const artistState: Artist = {
  lastUpdated,
  id: null,
  name: null,
  small: null,
  medium: null,
  large: null,
  albums: [],
  totalPlays: 0,
  userPlays: 0,
  userAlbums: [],
  userTracks: [],
  topAlbums: [],
  topListeners: [],
  topPlaylists: [],
  topTracks: [],
  userProfile: null,
};

/**
 * @constant
 * @alias artistsState
 * @type {object}
 * 
 * @property {string}   lastUpdated         The date/time the artists were last updated
 * @property {string[]} userArtists         The Spotify ids of the artists saved in the current user's library
 * @property {number}   totalUserArtists=0  The total amount of artists in the currrent user's library
 * @property {string}   selectedArtist=null The selected artist to view
 * @property {string[]} searching=[]        Whether the current user is searching any given item type, i.e. album, artist, listener, etc.
 * @property {string[]} fetching=[]         Whether the current user is fetching any given item type, i.e. album, artist, listener, etc.
 * @property {boolean}  incrementing=false  Whether the current user is incrementing the play count for an album
 * @property {Error}    error=null          The error related to artists actions
 */
export const initialState: State = {
  lastUpdated,
  userArtists: [],
  totalUserArtists: 0,
  selectedArtist: null,
  searching: [],
  fetching: [],
  incrementing: false,
  error: null,
};

/**
 * Adds or updates a single artist
 * 
 * @function addOrUpdateArtist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {object} action.item The artist object to add or update
 * 
 * @returns {object}             The single artist added or updated with the new information
 */
function addOrUpdateArtist(
  state: Artist,
  action: Action,
): Artist {
  const {albums, userAlbums, userTracks} = state;
  const {item} = action;
  const updates: Artist = (
    item
    && Array.isArray(albums)
    && Array.isArray(userAlbums)
    && Array.isArray(userTracks)
  )
    ? {
      ...item,
      lastUpdated,
      albums: item.albums ? [...albums, ...item.albums] : [...albums],
      userAlbums: item.userAlbums ? [...userAlbums, ...item.userAlbums] : [...userAlbums],
      userTracks: item.userTracks ? [...userTracks, ...item.userTracks] : [...userTracks],
    }
    : {};

  return updateObject(state, updates);
}

export function artist(
  state: Artist = artistState,
  action: Action,
): Artist {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return addOrUpdateArtist(state, action);
    default:
      return state;
  }
}

/**
 * Updates the state by adding/removing values
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} type        The type to remove from the fetching array
 * 
 * @returns {object}             The state with the updated values
 */
function update(
  state: State,
  action: Action,
  type: string,
): State {
  const {totalUserArtists, fetching: oldFetch, userArtists: oldArtists} = state;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const updates: State = Array.isArray(oldFetch) && Array.isArray(oldArtists)
    ? {
      lastUpdated,
      fetching: add && type ? oldFetch.concat(type) : type ? oldFetch.filter(t => t !== type) : oldFetch,
      error: haveError ? action.error : null,
      totalUserArtists: Array.isArray(action.artists) ? action.artists.length : totalUserArtists,
      userArtists: Array.isArray(action.artists) ? [...action.artists] : [...oldArtists],
    }
    : {};

  return updateObject(state, updates);
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.GET_ARTIST_IMAGES_REQUEST:
      case types.GET_ARTIST_IMAGES_SUCCESS:
      case types.GET_ARTIST_IMAGES_FAILURE:
        return update(state, action, 'images');
      case types.GET_ARTISTS_REQUEST:
      case types.GET_ARTISTS_SUCCESS:
      case types.GET_ARTISTS_FAILURE:
        return update(state, action, 'artists');
      case types.GET_ARTIST_TOP_ALBUMS_REQUEST:
      case types.GET_ARTIST_TOP_ALBUMS_SUCCESS:
      case types.GET_ARTIST_TOP_ALBUMS_FAILURE:
        return update(state, action, 'topAlbums');
      case types.GET_ARTIST_TOP_LISTENERS_REQUEST:
      case types.GET_ARTIST_TOP_LISTENERS_SUCCESS:
      case types.GET_ARTIST_TOP_LISTENERS_FAILURE:
        return update(state, action, 'topListeners');
      case types.GET_ARTIST_TOP_PLAYLISTS_REQUEST:
      case types.GET_ARTIST_TOP_PLAYLISTS_SUCCESS:
      case types.GET_ARTIST_TOP_PLAYLISTS_FAILURE:
        return update(state, action, 'topPlaylists');
      case types.GET_ARTIST_TOP_TRACKS_REQUEST:
      case types.GET_ARTIST_TOP_TRACKS_SUCCESS:
      case types.GET_ARTIST_TOP_TRACKS_FAILURE:
        return update(state, action, 'topTracks');
      case types.INCREMENT_ARTIST_PLAYS_REQUEST:
        return updateObject(state, {incrementing: true, error: null});
      case types.INCREMENT_ARTIST_PLAYS_SUCCESS:
        return updateObject(state, {incrementing: false, error: null});
      case types.INCREMENT_ARTIST_PLAYS_FAILURE:
        return updateObject(state, {error: action.error, incrementing: false});
      case types.RESET_ARTISTS:
        return initialState;
      case types.UPDATE_ARTISTS:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}