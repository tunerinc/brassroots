'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import * as types from '../actions/artists/types';

// Case Functions
import {addSingleArtist, addArtists} from '../actions/artists/AddArtists/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type Artist = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +small?: ?string,
  +medium?: ?string,
  +large?: ?string,
  +albums?: Array<string>,
  +totalPlays?: number,
  +userPlays?: number,
  +userTracks?: Array<string>,
  +topAlbums?: Array<string>,
  +topListeners?: Array<string>,
  +topPlaylists?: Array<string>,
  +topTracks?: Array<string>,
};

type Action = {
  +type?: string,
  +error?: Error,
  +artists?: {+[id: string]: Artist},
};

type State = {
  +lastUpdated?: string,
  +userArtists?: Array<string>,
  +artistsByID?: {+[key: string]: Artist},
  +totalArtists?: number,
  +selectedArtist?: ?string,
  +searchingArtists?: boolean,
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
  Action,
  State,
};

/**
 * @constant
 * @alias singleArtistState
 * @type {object}
 * 
 * @property {string}   lastUpdated  The date/time the single artist was last updated
 * @property {string}   id=null      The Spotify id of the artist
 * @property {string}   name=null    The name of the artist
 * @property {string}   small=null   64x64 size image url for artist
 * @property {string}   medium=null  300x300 size image url for artist
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
const singleState: Artist = {
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
};

/**
 * @constant
 * @alias artistsState
 * @type {object}
 * 
 * @property {string}   lastUpdated             The date/time the artists were last updated
 * @property {string[]} userArtists             The Spotify ids of the artists saved in the current user's library
 * @property {object}   artistsByID             The artist objects with the Spotify ids as the key
 * @property {number}   totalArtists=0          The total amount of artists
 * @property {string}   selectedArtist=null     The selected artist to view
 * @property {boolean}  searchingArtists=false  Whether the current user is searching artists
 * @property {boolean}  fetchingAlbums=false    Whether the current user is fetching albums of an artist
 * @property {boolean}  fetchingArtists=false   Whether the current user is fetching artists
 * @property {boolean}  fetchingListeners=false Whether the current user is fetching listeners of an artist
 * @property {boolean}  fetchingPlaylists=false Whether the current user is fetching playlists of an artist
 * @property {boolean}  fetchingTracks=false    Whether the current user is fetching trakcs of an artist
 * @property {boolean}  incrementingCount=false Whether the current user is incrmenting the amount of plays for the current user on artists
 * @property {Error}    error=null              The error related to artists actions
 */
export const initialState: State = {
  lastUpdated,
  userArtists: [],
  artistsByID: {},
  totalArtists: 0,
  selectedArtist: null,
  searchingArtists: false,
  fetchingAlbums: false,
  fetchingArtists: false,
  fetchingListeners: false,
  fetchingPlaylists: false,
  fetchingTracks: false,
  incrementingCount: false,
  error: null,
};

export function singleArtist(
  state: Artist = singleState,
  action: Action,
): Artist {
  switch (action.type) {
    case types.ADD_ARTISTS:
      return addSingleArtist(state, action);
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
      case types.ADD_ARTISTS:
        return addArtists(state, action);
      default:
        return state;
    }
  }

  return state;
}