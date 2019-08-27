'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/playlists/types';
import * as entitiesTypes from '../actions/entities/types';
import {type Firebase} from '../utils/firebaseTypes';
import type {SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as EntitiesAction} from './entities';

// Case Functions
import {addSinglePlaylist, addPlaylists} from '../actions/playlists/AddPlaylists/reducers';
import {addSinglePlaylistTrack, addPlaylistTracks} from '../actions/playlists/AddPlaylistTracks/reducers';
import * as getPlaylistTracks from '../actions/playlists/GetPlaylistTracks/reducers';
import * as getTopPlaylists from '../actions/playlists/GetTopPlaylists/reducers';
import * as incrementPlaylistPlays from '../actions/playlists/IncrementPlaylistPlays/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction = Action | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type PlaylistTrack = {
  +id?: ?string,
  +trackID?: ?string,
  +userID?: ?string,
  +totalPlays?: number,
  +userPlays?: number,
  +lastUpdated?: string,
};

type Playlist = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +ownerID?: ?string,
  +ownerType?: ?string,
  +small?: ?string,
  +medium?: ?string,
  +large?: ?string,
  +mode?: ?string,
  +public?: boolean,
  +members?: Array<string>,
  +tracks?: Array<string>,
  +topTracks?: Array<string>,
  +totalPlays?: number,
  +userPlays?: number,
  +total?: number,
};

type Action = {
  +type?: string,
  +error?: Error,
  +userID?: string,
  +playlists?: {+[id: string]: Playlist} | Array<string>,
  +playlistID?: string,
  +refreshing?: boolean,
  +members?: Array<string>,
  +updates?: State,
  +topTracks?: Array<string>,
  +playlistCount?: number,
  +total?: number,
  +trackID?: string,
  +trackCount?: number,
  +mode?: string,
  +name?: string,
  +uri?: string,
  +track?: {
    +trackID?: string,
    +userID?: string,
  },
  +tracks?:
    | Array<string>
    | Array<
      {|
        +trackID: string,
        +userID: string,
      |}
    >
};

type State = {
  +lastUpdated?: string,
  +userPlaylists?: Array<string>,
  +totalUserPlaylists?: number,
  +selectedPlaylist?: ?string,
  +fetching?: Array<string>,
  +refreshing?: Array<string>,
  +searching?: boolean,
  +creating?: boolean,
  +incrementing?: boolean,
  +error?: ?Error | SpotifyError,
  +newPlaylist?: {
    +members?: Array<string>,
    +name?: ?string,
    +image?: ?string,
    +mode?: string,
  },
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  PlaylistTrack,
  Playlist,
  Action,
  State,
};

/**
 * @constant
 * @alias singlePlaylistTrackState
 * @type {object}
 * 
 * @property {string} id=null      A string containing the playlistID and the trackID
 * @property {string} trackID=null The Spotify id of the playlist track
 * @property {string} userID=null  The Brassroots id of the user who added the playlist track
 * @property {number} totalPlays=0 The total amount of plays the track within a playlist has
 * @property {number} userPlays=0  The amount of plays the current user has on the playlist track
 */
const singleTrackState: PlaylistTrack = {
  id: null,
  trackID: null,
  userID: null,
  totalPlays: 0,
  userPlays: 0,
};

/**
 * @constant
 * @alias singlePlaylistState
 * @type {object}
 * 
 * @property {string}   lastUpdated    The date/time the single playlist was last updated
 * @property {string}   id=null        The Spotify id of the playlist
 * @property {string}   name=null      The name of the playlist
 * @property {string}   ownerID=null   The Spotify id of the owner of the playlist
 * @property {string}   ownerType=null The type of account of the owner of the playlist
 * @property {string}   small=null     The 64x64 size cover image of the playlist
 * @property {string}   medium=null    The 300x300 size cover image of the playlist
 * @property {string}   large=null     The 640x640 size cover image of the playlist
 * @property {string}   mode=null      The mode of the playlist
 * @property {boolean}  public=true    Whether the single playlist is public
 * @property {string[]} members        The Brassroots ids of the members of the single playlist
 * @property {string[]} tracks         The Spotify ids of the tracks of the single playlist
 * @property {string[]} topTracks      The Spotify ids of the top tracks of the single playlist
 * @property {number}   totalPlays=0   The total amount of playlist the single playlist has
 * @property {number}   userPlays=0    The amount of plays the current user has on the playlist
 * @property {number}   total=0        The total amount of tracks in the playlist
 */
const singlePlaylistState: Playlist = {
  lastUpdated,
  id: null,
  name: null,
  ownerID: null,
  ownerType: null,
  small: null,
  medium: null,
  large: null,
  mode: null,
  public: true,
  members: [],
  tracks: [],
  topTracks: [],
  totalPlays: 0,
  userPlays: 0,
  total: 0,
};

/**
 * @constant
 * @alias playlistsState
 * @type {object}
 * 
 * @property {string}   lastUpdated                The date/time the playlists were last updated
 * @property {string[]} userPlaylists              The Spoitify ids of the playlists saved in the current user's library
 * @property {number}   totalUserPlaylists=0       The total amount of playlists the current user has saved in their library
 * @property {string}   selectedPlaylist=null      The selected playlis to view
 * @property {boolean}  fetchingMembers=false      Whether the current user is fetching members of a playlist
 * @property {boolean}  refreshingPlaylists=false  Whether the current user is refreshing playlists
 * @property {boolean}  fetchingPlaylists=false    Whether the current user is fetching playlists
 * @property {boolean}  fetchingTopPlaylists=false Whether the current user is fetching top playlists
 * @property {boolean}  fetchingTopTracks=false    Whether the current user is fetching top tracks of a playlist
 * @property {boolean}  fetchingTracks=false       Whether the current user is fetching tracks of a playlist
 * @property {boolean}  refreshingTracks=false     Whether the current user is refreshing tracks of a playlist
 * @property {boolean}  searchingPlaylists=false   Whether the current user is searching playlists
 * @property {boolean}  creatingPlaylist=false     Whether the current user is creating a playlist
 * @property {boolean}  incrementingCount=false    Whether the current user is incrementing the count of a playlist & a playlist track
 * @property {Error}    error=null                 The error related to playlists actions
 * @property {object}   newPlaylist                The new playlist to create
 * @property {string[]} newPlaylist.members        The members of the new playlist
 * @property {string}   newPlaylist.name           The name of the new playlist
 * @property {string}   newPlaylist.image          The image url of the new playlist
 * @property {string}   newPlaylist.mode           The mode to create the new playlist in
 */
export const initialState: State = {
  lastUpdated,
  userPlaylists: [],
  totalUserPlaylists: 0,
  selectedPlaylist: null,
  fetching: [],
  refreshing: [],
  searching: false,
  creating: false,
  incrementing: false,
  error: null,
  newPlaylist: {
    members: [],
    name: null,
    image: null,
    mode: 'limitless',
  },
};

export function playlistTrack(
  state: PlaylistTrack = singleTrackState,
  action: Action,
): PlaylistTrack {
  switch (action.type) {
    case types.ADD_PLAYLIST_TRACKS:
    case entitiesTypes.ADD_ENTITIES:
      return addSinglePlaylistTrack(state, action);
    case types.INCREMENT_PLAYLIST_PLAYS_SUCCESS:
      return incrementPlaylistPlays.incrementTrack(state, action);
    default:
      return state;
  }
}

export function playlist(
  state: Playlist = singlePlaylistState,
  action: Action,
): Playlist {
  switch (action.type) {
    case types.ADD_PLAYLISTS:
    case entitiesTypes.ADD_ENTITIES:
      return addSinglePlaylist(state, action);
    case types.GET_PLAYLIST_TRACKS_SUCCESS:
      return getPlaylistTracks.addTracks(state, action);
    case types.INCREMENT_PLAYLIST_PLAYS_SUCCESS:
      return incrementPlaylistPlays.incrementPlaylist(state, action);
    default:
      return state;
  }
}

/**
 * Updates any of the values in the playlists state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.updates The updates to make to the state
 * @param   {string} type           The type to add/remove from the array
 * 
 * @returns {object}                The state updated with the new information
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {
    totalUserPlaylists,
    fetching: oldFetch,
    userPlaylists: oldPlaylists,
    refreshing: oldRefresh,
    newPlaylist: oldPlaylist,
  } = state;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const updates: State = (
    Array.isArray(oldRefresh)
    && Array.isArray(oldFetch)
    && Array.isArray(oldPlaylists)
  )
    ? {
      ...(action.updates ? action.updates : {}),
      lastUpdated,
      fetching: add && type ? oldFetch.concat(type) : type ? oldFetch.filter(t => t !== type) : oldFetch,
      error: haveError ? action.error : null,
      totalUserPlaylists: action.total ? action.total : totalUserPlaylists,
      newPlaylist: action.updates && action.updates.newPlaylist && oldPlaylist
        ? updateObject(oldPlaylist, action.updates.newPlaylist)
        : {...oldPlaylist},
      refreshing: action.refreshing && type
        ? oldRefresh.concat(type)
        : type
        ? oldRefresh.filter(t => t !== type)
        : oldRefresh,
      userPlaylists: Array.isArray(action.playlists) && type && oldRefresh.includes(type)
        ? [...action.playlists]
        : Array.isArray(action.playlists)
        ? [...oldPlaylists, ...action.playlists]
        : [...oldPlaylists],
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
      case types.GET_PLAYLISTS_REQUEST:
      case types.GET_PLAYLISTS_SUCCESS:
      case types.GET_PLAYLISTS_FAILURE:
        return update(state, action, 'playlists');
      case types.GET_PLAYLIST_TOP_MEMBERS_REQUEST:
      case types.GET_PLAYLIST_TOP_MEMBERS_SUCCESS:
      case types.GET_PLAYLIST_TOP_MEMBERS_FAILURE:
        return update(state, action, 'topMembers');
      case types.GET_PLAYLIST_TOP_TRACKS_REQUEST:
      case types.GET_PLAYLIST_TOP_TRACKS_SUCCESS:
      case types.GET_PLAYLIST_TOP_TRACKS_FAILURE:
        return update(state, action, 'topTracks');
      case types.GET_PLAYLIST_TRACKS_REQUEST:
        return getPlaylistTracks.request(state, action);
      case types.GET_PLAYLIST_TRACKS_SUCCESS:
        return getPlaylistTracks.success(state);
      case types.GET_PLAYLIST_TRACKS_FAILURE:
        return getPlaylistTracks.failure(state, action);
      case types.GET_TOP_PLAYLISTS_REQUEST:
        return getTopPlaylists.request(state);
      case types.GET_TOP_PLAYLISTS_SUCCESS:
        return getTopPlaylists.success(state);
      case types.GET_TOP_PLAYLISTS_FAILURE:
        return getTopPlaylists.failure(state, action);
      case types.INCREMENT_PLAYLIST_PLAYS_REQUEST:
        return incrementPlaylistPlays.request(state);
      case types.INCREMENT_PLAYLIST_PLAYS_SUCCESS:
        return incrementPlaylistPlays.success(state);
      case types.INCREMENT_PLAYLIST_PLAYS_FAILURE:
        return incrementPlaylistPlays.failure(state, action);
      case types.RESET_PLAYLISTS:
        return initialState;
      case types.UPDATE_PLAYLISTS:
        return update(state, action);
      default:
        return state;
    }
  }

  return state;
}