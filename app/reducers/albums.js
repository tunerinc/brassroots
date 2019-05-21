'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import * as types from '../actions/albums/types';

// Case Functions
import {addSingleAlbum, addAlbums} from '../actions/albums/AddAlbums/reducers';
import * as getAlbums from '../actions/albums/GetAlbums/reducers';
import * as getAlbumTopListeners from '../actions/albums/GetAlbumTopListeners/reducers';
import * as getAlbumTopPlaylists from '../actions/albums/GetAlbumTopPlaylists/reducers';
import * as getAlbumTopTracks from '../actions/albums/GetAlbumTopTracks/reducers';
import * as incrementAlbumPlays from '../actions/albums/IncrementAlbumPlays/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

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
  +refreshing?: boolean,
  +albumID?: string,
  +listeners?: Array<string>,
  +playlistIDs?: Array<string>,
  +trackIDs?: Array<string>,
  +albumCount?: number,
};

type State = {
  +lastUpdated?: string,
  +userAlbums?: Array<string>,
  +albumsByID?: {[key: string]: Album},
  +totalAlbums?: number,
  +selectedAlbum?: ?string,
  +searchingAlbums?: boolean,
  +refreshingAlbums?: boolean,
  +fetchingAlbums?: boolean,
  +fetchingArtists?: boolean,
  +fetchingListeners?: boolean,
  +fetchingPlaylists?: boolean,
  +fetchingTracks?: boolean,
  +incrementingCount?: boolean,
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
 * @alias singleAlbumState
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
const singleState: Album = {
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
 * @property {string}   lastUpdated             The date/time the albums were last updated
 * @property {string[]} userAlbums              The Spotify album ids saved in the current user's library
 * @property {object}   albumsByID              The album objects using the Spotify id as the key
 * @property {number}   totalAlbums             The total amount of albums
 * @property {string}   selectedAlbum=null      The selected album to view
 * @property {boolean}  searchingAlbums=false   Whether the current user is searching albums
 * @property {boolean}  refreshingAlbums=false  Whether the current user is refreshing their saved albums
 * @property {boolean}  fetchingAlbums=false    Whether the current user is fetching albums
 * @property {boolean}  fetchingArtists=false   Whether the current user is fetching artists for an album
 * @property {boolean}  fetchingListeners=false Whether the current user is fetching listeners for an album
 * @property {boolean}  fetchingPlaylists=false Whether the current user is fetching playlists for an album
 * @property {boolean}  fetchingTracks=false    Whether the current user is fetching tracks for an album
 * @property {boolean}  incrementingCount=false Whether the current user is incrementing the play count for an album
 * @property {Error}    error=null              The error related to an albums action
 */
export const initialState: State = {
  lastUpdated,
  userAlbums: [],
  albumsByID: {},
  totalAlbums: 0,
  selectedAlbum: null,
  searchingAlbums: false,
  refreshingAlbums: false,
  fetchingAlbums: false,
  fetchingArtists: false,
  fetchingListeners: false,
  fetchingPlaylists: false,
  fetchingTracks: false,
  incrementingCount: false,
  error: null,
};

export function singleAlbum(
  state: Album = singleState,
  action: Action,
): Album {
  switch (action.type) {
    case types.ADD_ALBUMS:
      return addSingleAlbum(state, action);
    case types.GET_ALBUM_TOP_LISTENERS_SUCCESS:
      return getAlbumTopListeners.addListeners(state, action);
    case types.GET_ALBUM_TOP_PLAYLISTS_SUCCESS:
      return getAlbumTopPlaylists.addPlaylists(state, action);
    case types.GET_ALBUM_TOP_TRACKS_SUCCESS:
      return getAlbumTopTracks.addTracks(state, action);
    case types.INCREMENT_ALBUM_PLAYS_SUCCESS:
        return incrementAlbumPlays.increment(state, action);
    default:
      return state;
  }
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.ADD_ALBUMS:
        return addAlbums(state, action);
      case types.GET_ALBUMS_REQUEST:
        return getAlbums.request(state, action);
      case types.GET_ALBUMS_SUCCESS:
        return getAlbums.success(state, action);
      case types.GET_ALBUMS_FAILURE:
        return getAlbums.failure(state, action);
      case types.GET_ALBUM_TOP_LISTENERS_REQUEST:
        return getAlbumTopListeners.request(state);
      case types.GET_ALBUM_TOP_LISTENERS_SUCCESS:
        return getAlbumTopListeners.success(state, action);
      case types.GET_ALBUM_TOP_LISTENERS_FAILURE:
        return getAlbumTopListeners.failure(state, action);
      case types.GET_ALBUM_TOP_PLAYLISTS_REQUEST:
        return getAlbumTopPlaylists.request(state);
      case types.GET_ALBUM_TOP_PLAYLISTS_SUCCESS:
        return getAlbumTopPlaylists.success(state, action);
      case types.GET_ALBUM_TOP_PLAYLISTS_FAILURE:
        return getAlbumTopPlaylists.failure(state, action);
      case types.GET_ALBUM_TOP_TRACKS_REQUEST:
        return getAlbumTopTracks.request(state);
      case types.GET_ALBUM_TOP_TRACKS_SUCCESS:
        return getAlbumTopTracks.success(state, action);
      case types.GET_ALBUM_TOP_TRACKS_FAILURE:
        return getAlbumTopTracks.failure(state, action);
      case types.INCREMENT_ALBUM_PLAYS_REQUEST:
        return incrementAlbumPlays.request(state);
      case types.INCREMENT_ALBUM_PLAYS_SUCCESS:
        return incrementAlbumPlays.success(state, action);
      case types.INCREMENT_ALBUM_PLAYS_FAILURE:
        return incrementAlbumPlays.failure(state, action);
      default:
        return state;
    }
  }

  return state;
}