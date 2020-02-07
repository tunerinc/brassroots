'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as ArtistAction} from './artists';
import {type Action as PlaylistAction} from './playlists';
import {type Action as TrackAction} from './tracks';
import {type Action as UserAction} from './users';
import {type Action as EntitiesAction} from './entities';
import * as types from '../actions/albums/types';
import * as entitiesTypes from '../actions/entities/types';

// Case Functions

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;
type DispatchAction =
  | Action
  | ArtistAction
  | PlaylistAction
  | TrackAction
  | UserAction
  | EntitiesAction;

type Artist = {|
  +id?: string,
  +name?: string,
|};

type Album = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +small?: ?string,
  +medium?: ?string,
  +large?: ?string,
  +artists?: Array<Artist>,
  +tracks?: Array<string>,
  +totalPlays?: number,
  +userPlays?: number,
  +userTracks?: Array<string>,
  +topListeners?: Array<string>,
  +topPlaylists?: Array<string>,
  +topTracks?: Array<string>,
};

type Action = {
  +type?: string,
  +error?: Error,
  +albums?: {+[key: string]: Album} | Array<string>,
  +album?: ?Album,
  +item?: ?Album,
  +refreshing?: boolean,
  +albumID?: string,
  +listeners?: Array<string>,
  +playlistIDs?: Array<string>,
  +trackIDs?: Array<string>,
  +albumCount?: number,
  +replace?: boolean,
  +total?: number,
  +updates?: State,
};

type State = {
  +lastUpdated?: string,
  +userAlbums?: Array<string>,
  +totalUserAlbums?: number,
  +selectedAlbum?: ?string,
  +searching?: Array<string>,
  +refreshing?: boolean,
  +fetching?: Array<string>,
  +incrementing?: boolean,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Artist,
  Album,
  Action,
  State,
};

/**
 * @constant
 * @alias albumState
 * @type {object}
 * 
 * @property {string}   lastUpdated  The date/time the albums were last updated
 * @property {string}   id=null      The Spotify id of the album
 * @property {string}   name=null    The name of the album
 * @property {string}   small=null   64x64 size image url for album's artwork
 * @property {string}   medium=null  300x300 size image url for album's artwork
 * @property {string}   large-null   640x640 size image url for album's artwork
 * @property {string[]} artists      The Spotify ids of the album's artists
 * @property {string[]} tracks       The tracks of the album in order by trackNumber
 * @property {number}   totalPlays=0 The total amount of plays a single album has
 * @property {number}   userPlays=0  The total amount of plays the user has listened to the album
 * @property {string[]} userTracks   The Spotify ids of the tracks from the album the current user has saved in their library
 * @property {string[]} topListeners The Brassroots ids of the top listeners of a single album
 * @property {string[]} topPlaylists The Spotify ids of the top playlists of a single album
 * @property {string[]} topTracks    The Spotify ids of the top tracks of a single album
 */
const albumState: Album = {
  lastUpdated,
  id: null,
  name: null,
  small: null,
  medium: null,
  large: null,
  artists: [],
  tracks: [],
  totalPlays: 0,
  userPlays: 0,
  userTracks: [],
  topListeners: [],
  topPlaylists: [],
  topTracks: [],
};

/**
 * @constant
 * @alias albumsState
 * @type {object}
 * 
 * @property {string}   lastUpdated        The date/time the albums were last updated
 * @property {string[]} userAlbums         The Spotify album ids saved in the current user's library
 * @property {number}   totalUserAlbums=0  The total number of albums in the current user's library
 * @property {string}   selectedAlbum=null The selected album to view
 * @property {string[]} searching=[]       Whether the current user is searching any given item type, i.e. album, artist, listener, etc.
 * @property {boolean}  refreshing=false   Whether the current user is refreshing any given item type, i.e. album, artist, listener, etc.
 * @property {string[]} fetching=[]        Whether the current user is fetching any given item type, i.e. album, artist, listener, etc.
 * @property {boolean}  incrementing=false Whether the current user is incrementing the play count for an album
 * @property {Error}    error=null         The error related to an albums action
 */
export const initialState: State = {
  lastUpdated,
  userAlbums: [],
  totalUserAlbums: 0,
  selectedAlbum: null,
  searching: [],
  refreshing: false,
  fetching: [],
  incrementing: false,
  error: null,
};

/**
 * Adds or updates a single album
 * 
 * @function addOrUpdateAlbum
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state             The Redux state
 * @param   {object}  action            The Redux action
 * @param   {string}  action.type       The type of Redux action
 * @param   {object}  action.item       The album object to add or update
 * @param   {boolean} action.refreshing Whether the current user is refreshing
 * 
 * @returns {object}                    The single album added or updated with the new information
 */
function addOrUpdateAlbum(
  state: Album,
  action: Action,
): Album {
  const {tracks, userTracks} = state;
  const {item, refreshing} = action;
  const updates: Album = item && Array.isArray(tracks) && Array.isArray(userTracks)
    ? {
      ...item,
      lastUpdated,
      userTracks: item.userTracks && refreshing
        ? [...item.userTracks]
        : item.userTracks
        ? [...userTracks, ...item.userTracks].filter((el, i, arr) => i === arr.indexOf(el))
        : [...userTracks],
      tracks: item.tracks && refreshing
        ? [...item.tracks]
        : item.tracks
        ? [...tracks, ...item.tracks].filter((el, i, arr) => i === arr.indexOf(el))
        : [...tracks],
    }
    : {};

  return updateObject(state, updates);
}

export function album(
  state: Album = albumState,
  action: Action,
): Album {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return addOrUpdateAlbum(state, action);
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
 * @param   {string} type        The type to add/remove from the fetching array
 * 
 * @returns {object}             The state with the updated values
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {totalUserAlbums, fetching, userAlbums, refreshing, lastUpdated: oldUpdated} = state;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const newUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');
  const updates: State = Array.isArray(fetching) && Array.isArray(userAlbums)
    ? {
      lastUpdated: Array.isArray(action.albums) ? newUpdated : oldUpdated,
      fetching: add && type ? fetching.concat(type) : type ? fetching.filter(t => t !== type) : fetching,
      refreshing: action.refreshing && !action.replace ? action.refreshing : false,
      error: haveError ? action.error : null,
      totalUserAlbums: typeof action.total === 'number' ? action.total : totalUserAlbums,
      userAlbums: (Array.isArray(action.albums) && (refreshing || action.replace))
        ? [...action.albums]
        : Array.isArray(action.albums)
        ? [...userAlbums, ...action.albums]
        : [...userAlbums],
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
      case types.GET_ALBUMS_REQUEST:
      case types.GET_ALBUMS_SUCCESS:
      case types.GET_ALBUMS_FAILURE:
        return update(state, action, 'albums');
      case types.GET_ALBUM_TOP_LISTENERS_REQUEST:
      case types.GET_ALBUM_TOP_LISTENERS_SUCCESS:
      case types.GET_ALBUM_TOP_LISTENERS_FAILURE:
        return update(state, action, 'topListeners');
      case types.GET_ALBUM_TOP_PLAYLISTS_REQUEST:
      case types.GET_ALBUM_TOP_PLAYLISTS_SUCCESS:
      case types.GET_ALBUM_TOP_PLAYLISTS_FAILURE:
        return update(state, action, 'topPlaylists');
      case types.GET_ALBUM_TOP_TRACKS_REQUEST:
      case types.GET_ALBUM_TOP_TRACKS_SUCCESS:
      case types.GET_ALBUM_TOP_TRACKS_FAILURE:
        return update(state, action, 'topTracks');
      case types.INCREMENT_ALBUM_PLAYS_REQUEST:
        return updateObject(state, {incrementing: true, error: null});
      case types.INCREMENT_ALBUM_PLAYS_SUCCESS:
        return updateObject(state, {incrementing: false, error: null});
      case types.INCREMENT_ALBUM_PLAYS_FAILURE:
        return updateObject(state, {error: action.error, incrementing: false});
      case types.RESET_ALBUMS:
        return initialState;
      case types.UPDATE_ALBUMS:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}