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

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

export type PlaylistTrack = {
  +playlistTrackID?: ?string,
  +trackID?: ?string,
  +userID?: ?string,
  +totalPlays?: number,
  +userPlays?: number,
};

export type Playlist = {
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
};

export type Action = {
  +type?: string,
  +error?: Error,
  +userID?: string,
};

export type State = {
  +lastUpdated?: string,
  +userPlaylists?: Array<string>,
  +playlistsByID?: {+[key: string]: Playlist},
  +totalPlaylists?: number,
  +playlistTracksByID?: {+[key: string]: PlaylistTrack},
  +totalPlaylistTracks?: number,
  +selectedPlaylist?: ?string,
  +canPaginate?: boolean,
  +fetchingMembers?: boolean,
  +refreshingPlaylists?: boolean,
  +fetchingPlaylists?: boolean,
  +fetchingTopPlaylists?: boolean,
  +fetchingTopTracks?: boolean,
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
};

/**
 * @constant
 * @alias playlistsState
 * @type {object}
 * 
 * @property {string}   lastUpdated                The date/time the playlists were last updated
 * @property {string[]} userPlaylists              The Spoitify ids of the playlists saved in the current user's library
 * @property {object}   playlistsByID              The playlist objects with the Spotify id as the key
 * @property {number}   totalPlaylists=0           The total amount of playlists
 * @property {object}   playlistTracksByID         The playlist track objects with a string of the playlist id and track id as the key
 * @property {number}   totalPlaylistTracks=0      The total amount of playlist tracks
 * @property {string}   selectedPlaylist=null      The selected playlis to view
 * @property {boolean}  canPaginate=true           Whether the playlists can be paginated
 * @property {boolean}  fetchingMembers=false      Whether the current user is fetching members of a playlist
 * @property {boolean}  refreshingPlaylists=false  Whether the current user is refreshing playlists
 * @property {boolean}  fetchingPlaylists=false    Whether the current user is fetching playlists
 * @property {boolean}  fetchingTopPlaylists=false Whether the current user is fetching top playlists
 * @property {boolean}  fetchingTopTracks=false    Whether the current user is fetching top tracks of a playlist
 * @property {boolean}  fetchingTracks=false       Whether the current user is fetching tracks of a playlist
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
  playlistsByID: {},
  totalPlaylists: 0,
  playlistTracksByID: {},
  totalPlaylistTracks: 0,
  selectedPlaylist: null,
  canPaginate: true,
  fetchingMembers: false,
  refreshingPlaylists: false,
  fetchingPlaylists: false,
  fetchingTopPlaylists: false,
  fetchingTopTracks: false,
  fetchingTracks: false,
  searchingPlaylists: false,
  creatingPlaylist: false,
  incrementingCount: false,
  error: null,
  newPlaylist: {
    members: [],
    name: '',
    image: '',
    mode: '',
  },
};

export function singleTrack(
  state: PlaylistTrack = singleTrackState,
  action: Action,
): PlaylistTrack {
  switch (action.type) {
    default:
      return state;
  }
}

export function singlePlaylist(
  state: Playlist = singlePlaylistState,
  action: Action,
): Playlist {
  switch (action.type) {
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
      default:
        return state;
    }
  }

  return state;
}