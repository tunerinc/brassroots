'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/playlists/types';
import {type Firebase} from '../utils/firebaseTypes';
import type {SpotifyError} from '../utils/spotifyAPI/types';

// Case Functions
import {addNewPlaylistUser} from '../actions/playlists/AddNewPlaylistUser/reducers';
import {addSinglePlaylist, addPlaylists} from '../actions/playlists/AddPlaylists/reducers';
import {addSinglePlaylistTrack, addPlaylistTracks} from '../actions/playlists/AddPlaylistTracks/reducers';
import {clearNewPlaylist} from '../actions/playlists/ClearNewPlaylist/reducers';
import * as getPlaylists from '../actions/playlists/GetPlaylists/reducers';
import * as getPlaylistTopMembers from '../actions/playlists/GetPlaylistTopMembers/reducers';
import * as getPlaylistTopTracks from '../actions/playlists/GetPlaylistTopTracks/reducers';
import * as getPlaylistTracks from '../actions/playlists/GetPlaylistTracks/reducers';
import * as getTopPlaylists from '../actions/playlists/GetTopPlaylists/reducers';
import * as incrementPlaylistPlays from '../actions/playlists/IncrementPlaylistPlays/reducers';
import {removeNewPlaylistUser} from '../actions/playlists/RemoveNewPlaylistUser/reducers';
import {setNewPlaylistMode} from '../actions/playlists/SetNewPlaylistMode/reducers';
import {setNewPlaylistName} from '../actions/playlists/SetNewPlaylistName/reducers';
import {setNewPlaylistPhoto} from '../actions/playlists/SetNewPlaylistPhoto/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type PlaylistTrack = {
  +playlistTrackID?: ?string,
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
  +canPaginate?: boolean,
  +fetchingMembers?: boolean,
  +refreshingPlaylists?: boolean,
  +fetchingPlaylists?: boolean,
  +fetchingTopPlaylists?: boolean,
  +fetchingTopTracks?: boolean,
  +refreshingTracks?: boolean,
  +fetchingTracks?: boolean,
  +searchingPlaylists?: boolean,
  +creatingPlaylist?: boolean,
  +incrementingCount?: boolean,
  +error?: ?Error | SpotifyError,
  +newPlaylist?: {
    +members?: Array<string>,
    +name?: string,
    +image?: string,
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
 * @property {string} playlistTrackID=null A string containing the playlistID and the trackID
 * @property {string} trackID=null         The Spotify id of the playlist track
 * @property {string} userID=null          The Brassroots id of the user who added the playlist track
 * @property {number} totalPlays=0         The total amount of plays the track within a playlist has
 * @property {number} userPlays=0          The amount of plays the current user has on the playlist track
 */
const singleTrackState: PlaylistTrack = {
  playlistTrackID: null,
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
  fetchingMembers: false,
  refreshingPlaylists: false,
  fetchingPlaylists: false,
  fetchingTopPlaylists: false,
  fetchingTopTracks: false,
  fetchingTracks: false,
  refreshingTracks: false,
  searchingPlaylists: false,
  creatingPlaylist: false,
  incrementingCount: false,
  error: null,
  newPlaylist: {
    members: [],
    name: '',
    image: '',
    mode: 'limitless',
  },
};

export function singleTrack(
  state: PlaylistTrack = singleTrackState,
  action: Action,
): PlaylistTrack {
  switch (action.type) {
    case types.ADD_PLAYLIST_TRACKS:
      return addSinglePlaylistTrack(state, action);
    case types.INCREMENT_PLAYLIST_PLAYS_SUCCESS:
      return incrementPlaylistPlays.incrementTrack(state, action);
    default:
      return state;
  }
}

export function singlePlaylist(
  state: Playlist = singlePlaylistState,
  action: Action,
): Playlist {
  switch (action.type) {
    case types.ADD_PLAYLISTS:
      return addSinglePlaylist(state, action);
    case types.GET_PLAYLIST_TOP_MEMBERS_SUCCESS:
      return getPlaylistTopMembers.addMembers(state, action);
    case types.GET_PLAYLIST_TOP_TRACKS_SUCCESS:
      return getPlaylistTopTracks.addTracks(state, action);
    case types.GET_PLAYLIST_TRACKS_SUCCESS:
      return getPlaylistTracks.addTracks(state, action);
    case types.INCREMENT_PLAYLIST_PLAYS_SUCCESS:
      return incrementPlaylistPlays.incrementPlaylist(state, action);
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
      case types.ADD_NEW_PLAYLIST_USER:
        return addNewPlaylistUser(state, action);
      case types.ADD_PLAYLISTS:
        return addPlaylists(state, action);
      case types.ADD_PLAYLIST_TRACKS:
        return addPlaylistTracks(state, action);
      case types.CLEAR_NEW_PLAYLIST:
        return clearNewPlaylist(state);
      case types.GET_PLAYLISTS_REQUEST:
        return getPlaylists.request(state, action);
      case types.GET_PLAYLISTS_SUCCESS:
        return getPlaylists.success(state, action);
      case types.GET_PLAYLISTS_FAILURE:
        return getPlaylists.failure(state, action);
      case types.GET_PLAYLIST_TOP_MEMBERS_REQUEST:
        return getPlaylistTopMembers.request(state);
      case types.GET_PLAYLIST_TOP_MEMBERS_SUCCESS:
        return getPlaylistTopMembers.success(state);
      case types.GET_PLAYLIST_TOP_MEMBERS_FAILURE:
        return getPlaylistTopMembers.failure(state, action);
      case types.GET_PLAYLIST_TOP_TRACKS_REQUEST:
        return getPlaylistTopTracks.request(state);
      case types.GET_PLAYLIST_TOP_TRACKS_SUCCESS:
        return getPlaylistTopTracks.success(state, action);
      case types.GET_PLAYLIST_TOP_TRACKS_FAILURE:
        return getPlaylistTopTracks.failure(state, action);
      case types.GET_PLAYLIST_TRACKS_REQUEST:
        return getPlaylistTracks.request(state, action);
      case types.GET_PLAYLIST_TRACKS_SUCCESS:
        return getPlaylistTracks.success(state, action);
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
        return incrementPlaylistPlays.success(state, action);
      case types.INCREMENT_PLAYLIST_PLAYS_FAILURE:
        return incrementPlaylistPlays.failure(state, action);
      case types.REMOVE_NEW_PLAYLIST_USER:
        return removeNewPlaylistUser(state, action);
      case types.RESET_PLAYLISTS:
        return initialState;
      case types.SET_NEW_PLAYLIST_MODE:
        return setNewPlaylistMode(state, action);
      case types.SET_NEW_PLAYLIST_NAME:
        return setNewPlaylistName(state, action);
      case types.SET_NEW_PLAYLIST_PHOTO:
        return setNewPlaylistPhoto(state, action);
      default:
        return state;
    }
  }

  return state;
}