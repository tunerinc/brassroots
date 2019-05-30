"use strict";

/**
 * @format
 * @flow
 */

import moment from "moment";
import updateObject from '../utils/updateObject';
import * as types from "../actions/tracks/types";
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as AlbumAction} from './albums';
import {type Action as ArtistAction} from './artists';

// Case Functions
import * as addRecentTrack from '../actions/tracks/AddRecentTrack/reducers';
import {addSingleTrack, addTracks} from '../actions/tracks/AddTracks/reducers';
import * as changeFavoriteTrack from '../actions/tracks/ChangeFavoriteTrack/reducers';
import * as getFavoriteTrack from '../actions/tracks/GetFavoriteTrack/reducers';
import * as getMostPlayedSpotifyTrack from '../actions/tracks/GetMostPlayedSpotifyTrack/reducers';
import * as getMostPlayedTracks from '../actions/tracks/GetMostPlayedTracks/reducers';
import * as getRecentTracks from '../actions/tracks/GetRecentTracks/reducers';
import * as getTracks from '../actions/tracks/GetTracks/reducers';
import * as incrementTrackPlays from '../actions/tracks/IncrementTrackPlays/reducers';

export const lastUpdated: string = moment().format("ddd, MMM D, YYYY, h:mm:ss a");

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | AlbumAction | ArtistAction | PromiseAction | ThunkAction | Array<Action>) => any;

type TrackArtist = {
  +id: string,
  +name: string,
};

type Track = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +albumID?: ?string,
  +artists?: Array<TrackArtist>,
  +trackNumber?: number,
  +durationMS?: number,
  +totalPlays?: number,
  +userPlays?: number,
};

type Action = {
  +type?: string,
  +error?: Error,
  +tracks?: {+[id: string]: Track} | Array<string>,
  +track?: Track,
  +refreshing?: boolean,
  +trackID?: string,
  +trackCount?: number,
};

type State = {
  +lastUpdated?: string,
  +userTracks?: Array<string>,
  +tracksByID?: {+[key: string]: Track},
  +totalTracks?: number,
  +selectedTrack?: ?string,
  +searchingTracks?: boolean,
  +fetchingTracks?: boolean,
  +refreshingTracks?: boolean,
  +changingFavoriteTrack?: boolean,
  +fetchingFavoriteTrack?: boolean,
  +fetchingMostPlayed?: boolean,
  +fetchingRecent?: boolean,
  +addingRecent?: boolean,
  +incrementingCount?: boolean,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  TrackArtist,
  Track,
  Action,
  State,
};

/**
 * @constant
 * @alias singleTrackState
 * @type {object}
 * 
 * @property {string}   id=null       The Spotify id of the track
 * @property {string}   name=null     The name of the track
 * @property {string}   albumID=null  The Spotify id of the track's album
 * @property {object[]} artists       The track artists
 * @property {string}   artists.id    The Spotify id of the track artist
 * @property {string}   artists.name  The name of the track artist
 * @property {number}   trackNumber=0 The position of the track within the album
 * @property {number}   durationMS=0  The duration of the track in milliseconds
 * @property {number}   totalPlays=0  The total amount of plays the track has
 * @property {number}   userPlays=0   The amount of plays the current user has on the track
 */
const singleState: Track = {
  id: null,
  name: null,
  albumID: null,
  artists: [],
  trackNumber: 0,
  durationMS: 0,
  totalPlays: 0,
  userPlays: 0,
};

/**
 * @constant
 * @alias tracksState
 * @type {object}
 * 
 * @property {string}   lastUpdated                 The date/time the tracks were last updated
 * @property {string[]} userTracks                  The Spotify track ids saved in the current user's library
 * @property {object}   tracksByID                  The track objects using the Spotify ids as the key
 * @property {number}   totalTracks=0               The total amount of tracks
 * @property {string}   selectedTrack=null          The selected track to view
 * @property {boolean}  searchingTracks=false       Whether the current user is searching tracks
 * @property {boolean}  fetchingTracks=false        Whether the current user is fetching tracks
 * @property {boolean}  refreshingTracks=false      Whether the current user is refreshing tracks
 * @property {boolean}  changingFavoriteTrack=false Whether the current user is changing their favorite track
 * @property {boolean}  fetchingFavoriteTrack=false Whether the current user is fetching a favorite track
 * @property {boolean}  fetchingMostPlayed=false    Whether the current user is fetching most played tracks
 * @property {boolean}  fetchingRecent=false        Whether the current user is fetching recently played tracks
 * @property {boolean}  addingRecent=false          Whether we are adding a recently played track for the current user
 * @property {boolean}  incrementingCount=false     Whether the current user is incrementing the play count for a single track
 * @property {Error}    error=null                  The error related to tracks actions
 */
export const initialState: State = {
  lastUpdated,
  userTracks: [],
  tracksByID: {},
  totalTracks: 0,
  selectedTrack: null,
  searchingTracks: false,
  fetchingTracks: false,
  refreshingTracks: false,
  changingFavoriteTrack: false,
  fetchingFavoriteTrack: false,
  fetchingMostPlayed: false,
  fetchingRecent: false,
  addingRecent: false,
  incrementingCount: false,
  error: null,
};

export function singleTrack(
  state: Track = singleState,
  action: Action,
): Track {
  switch (action.type) {
    case types.ADD_TRACKS:
      return addSingleTrack(state, action);
    case types.INCREMENT_TRACK_PLAYS_SUCCESS:
      return incrementTrackPlays.increment(state, action);
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
      case types.ADD_RECENT_TRACK_REQUEST:
        return addRecentTrack.request(state);
      case types.ADD_RECENT_TRACK_SUCCESS:
        return addRecentTrack.success(state);
      case types.ADD_RECENT_TRACK_FAILURE:
        return addRecentTrack.failure(state, action);
        case types.ADD_TRACKS:
          return addTracks(state, action);
        case types.CHANGE_FAVORITE_TRACK_REQUEST:
          return changeFavoriteTrack.request(state);
        case types.CHANGE_FAVORITE_TRACK_SUCCESS:
          return changeFavoriteTrack.success(state);
        case types.CHANGE_FAVORITE_TRACK_FAILURE:
          return changeFavoriteTrack.failure(state, action);
        case types.GET_FAVORITE_TRACK_REQUEST:
          return getFavoriteTrack.request(state);
        case types.GET_FAVORITE_TRACK_SUCCESS:
          return getFavoriteTrack.success(state);
        case types.GET_FAVORITE_TRACK_FAILURE:
          return getFavoriteTrack.failure(state, action);
        case types.GET_MOST_PLAYED_SPOTIFY_TRACK_REQUEST:
          return getMostPlayedSpotifyTrack.request(state);
        case types.GET_MOST_PLAYED_SPOTIFY_TRACK_SUCCESS:
          return getMostPlayedSpotifyTrack.success(state);
        case types.GET_MOST_PLAYED_SPOTIFY_TRACK_FAILURE:
          return getMostPlayedSpotifyTrack.failure(state, action);
        case types.GET_MOST_PLAYED_TRACKS_REQUEST:
          return getMostPlayedTracks.request(state);
        case types.GET_MOST_PLAYED_TRACKS_SUCCESS:
          return getMostPlayedTracks.success(state);
        case types.GET_MOST_PLAYED_TRACKS_FAILURE:
          return getMostPlayedTracks.failure(state, action);
        case types.GET_RECENT_TRACKS_REQUEST:
          return getRecentTracks.request(state);
        case types.GET_RECENT_TRACKS_SUCCESS:
          return getRecentTracks.success(state);
        case types.GET_RECENT_TRACKS_FAILURE:
          return getRecentTracks.failure(state, action);
        case types.GET_TRACKS_REQUEST:
          return getTracks.request(state, action);
        case types.GET_TRACKS_SUCCESS:
          return getTracks.success(state, action);
        case types.GET_TRACKS_FAILURE:
          return getTracks.failure(state, action);
        case types.INCREMENT_TRACK_PLAYS_REQUEST:
          return incrementTrackPlays.request(state);
        case types.INCREMENT_TRACK_PLAYS_SUCCESS:
          return incrementTrackPlays.success(state, action);
        case types.INCREMENT_TRACK_PLAYS_FAILURE:
          return incrementTrackPlays.failure(state, action);
        case types.RESET_TRACKS:
          return initialState;
      default:
        return state;
    }
  }

  return state;
}