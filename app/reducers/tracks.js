"use strict";

/**
 * @format
 * @flow
 */

import moment from "moment";
import updateObject from '../utils/updateObject';
import * as types from "../actions/tracks/types";
import * as entitiesTypes from "../actions/entities/types";
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import {type Album} from './albums';
import {type Action as AlbumAction} from './albums';
import {type Action as ArtistAction} from './artists';
import {type Action as UserAction} from './users';
import {type Action as EntitiesAction} from './entities';

export const lastUpdated: string = moment().format("ddd, MMM D, YYYY, h:mm:ss a");

type DispatchAction = Action | AlbumAction | ArtistAction | UserAction | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<DispatchAction>) => any;

type TrackArtist = {
  +id: string,
  +name: string,
};

type Track = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +album?: ?Album,
  +artists?: Array<TrackArtist>,
  +trackNumber?: number,
  +durationMS?: number,
  +totalPlays?: number,
  +userPlays?: number,
  +saved?: boolean,
};

type Action = {
  +type?: string,
  +error?: Error,
  +tracks?: {+[id: string]: Track} | Array<string>,
  +track?: Track,
  +refreshing?: boolean,
  +trackID?: string,
  +trackCount?: number,
  +replace?: boolean,
  +total?: number,
  +updates?: State,
  +item?: Track,
};

type State = {
  +lastUpdated?: string,
  +userTracks?: Array<string>,
  +totalUserTracks?: number,
  +selectedTrack?: ?string,
  +searching?: boolean,
  +fetching?: Array<string>,
  +refreshing?: boolean,
  +addingRecent?: boolean,
  +incrementing?: boolean,
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
 * @property {string}   id=null           The Spotify id of the track
 * @property {string}   name=null         The name of the track
 * @property {object}   album=null        The object for the track's album
 * @property {string}   album.id=null     The Spotify id of the album
 * @property {string}   album.name=null   The name of the album
 * @property {string}   album.small=null  64x64 size image url for album's artwork
 * @property {string}   album.medium=null 300x300 size image url for album's artwork
 * @property {string}   album.large-null  640x640 size image url for album's artwork
 * @property {string[]} artists           The Spotify ids of the album's artists
 * @property {object[]} artists           The track artists
 * @property {string}   artists.id        The Spotify id of the track artist
 * @property {string}   artists.name      The name of the track artist
 * @property {number}   trackNumber=0     The position of the track within the album
 * @property {number}   durationMS=0      The duration of the track in milliseconds
 * @property {number}   totalPlays=0      The total amount of plays the track has
 * @property {number}   userPlays=0       The amount of plays the current user has on the track
 * @property {boolean}  saved=false       Whether the track is saved in the current user's library
 */
const singleState: Track = {
  id: null,
  name: null,
  album: null,
  artists: [],
  trackNumber: 0,
  durationMS: 0,
  totalPlays: 0,
  userPlays: 0,
  saved: false,
};

/**
 * @constant
 * @alias tracksState
 * @type {object}
 * 
 * @property {string}   lastUpdated        The date/time the tracks were last updated
 * @property {string[]} userTracks         The Spotify track ids saved in the current user's library
 * @property {number}   totalUserTracks=0  The total amount of tracks in the current user's library
 * @property {string}   selectedTrack=null The selected track to view
 * @property {boolean}  searching=false    Whether the current user is searching tracks
 * @property {boolean}  fetching=[]        Whether the current user is fetching tracks
 * @property {boolean}  refreshing=false   Whether the current user is refreshing tracks
 * @property {boolean}  addingRecent=false we are adding a recently played track for the current user
 * @property {boolean}  incrementing=false Whether the current user is incrementing the play count for a single track
 * @property {Error}    error=null         The error related to tracks actions
 */
export const initialState: State = {
  lastUpdated,
  userTracks: [],
  totalUserTracks: 0,
  selectedTrack: null,
  searching: false,
  fetching: [],
  refreshing: false,
  addingRecent: false,
  incrementing: false,
  error: null,
};

export function track(
  state: Track = singleState,
  action: Action,
): Track {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return updateObject(state, {...(action.item ? action.item : {})});
    default:
      return state;
  }
}

/**
 * Updates any values in the tracks state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.updates The updates to make to the state
 * @param   {string} [type]         The type of add/remove from arrays
 * 
 * @returns {object}                The state updated with the new information
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {totalUserTracks, fetching, userTracks, refreshing, lastUpdated: oldUpdated} = state;
  const isAddRecent: boolean = typeof action.type === 'string' && action.type.includes('ADD_RECENT');
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const newUpdated: string = moment().format("ddd, MMM D, YYYY, h:mm:ss a");
  const updates: State = Array.isArray(fetching) && Array.isArray(userTracks)
    ? {
      lastUpdated: Array.isArray(action.tracks) ? newUpdated : oldUpdated,
      addingRecent: add && isAddRecent ? true : false,
      fetching: add && type ? fetching.concat(type) : type ? fetching.filter(t => t !== type) : fetching,
      refreshing: action.refreshing && !action.replace ? action.refreshing : false,
      error: haveError ? action.error : null,
      totalUserTracks: typeof action.total === 'number' ? action.total : totalUserTracks,
      userTracks: (Array.isArray(action.tracks) && (refreshing || action.replace))
        ? [...action.tracks]
        : Array.isArray(action.tracks)
        ? [...userTracks, ...action.tracks]
        : [...userTracks],
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
      case types.ADD_RECENT_TRACK_REQUEST:
      case types.ADD_RECENT_TRACK_SUCCESS:
      case types.ADD_RECENT_TRACK_FAILURE:
        return update(state, action);
      case types.CHANGE_FAVORITE_TRACK_REQUEST:
      case types.CHANGE_FAVORITE_TRACK_SUCCESS:
      case types.CHANGE_FAVORITE_TRACK_FAILURE:
      case types.GET_FAVORITE_TRACK_REQUEST:
      case types.GET_FAVORITE_TRACK_SUCCESS:
      case types.GET_FAVORITE_TRACK_FAILURE:
        return update(state, action, 'favorite');
      case types.GET_MOST_PLAYED_TRACKS_REQUEST:
      case types.GET_MOST_PLAYED_TRACKS_SUCCESS:
      case types.GET_MOST_PLAYED_TRACKS_FAILURE:
        return update(state, action, 'mostPlayed');
      case types.GET_RECENT_TRACKS_REQUEST:
      case types.GET_RECENT_TRACKS_SUCCESS:
      case types.GET_RECENT_TRACKS_FAILURE:
        return update(state, action, 'recent');
      case types.GET_TRACKS_REQUEST:
      case types.GET_TRACKS_SUCCESS:
      case types.GET_TRACKS_FAILURE:
        return update(state, action, 'tracks');
      case types.INCREMENT_TRACK_PLAYS_REQUEST:
        return updateObject(state, {incrementing: true, error: null});
      case types.INCREMENT_TRACK_PLAYS_SUCCESS:
        return updateObject(state, {incrementing: false, error: null});
      case types.INCREMENT_TRACK_PLAYS_FAILURE:
        return updateObject(state, {error: action.error, incrementing: false});
      case types.RESET_TRACKS:
        return initialState;
      case types.UPDATE_TRACKS:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}