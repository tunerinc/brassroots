'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/entities/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type Album} from './albums';
import {type Artist} from './artists';
import {type ChatMessage} from './chat';
import {
  type SingleConversation,
  type SingleMessage,
} from './conversations';
import {type Group} from './groups';
import {
  type Playlist,
  type PlaylistTrack,
} from './playlists';
import {type QueueTrack} from './queue';
import {type Session} from './sessions';
import {type Track} from './tracks';
import {type User} from './users';

// Case Functions

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type Action = {|
  +type?: string,
  +error?: Error,
|};

type State = {|
  +albums: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: Album},
  },
  +artists: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: Artist},
  },
  +conversations: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: SingleConversation},
  },
  +groups: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: Group},
  },
  +messages: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: ChatMessage | SingleMessage},
  },
  +playlists: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: Playlist},
  },
  +playlistTracks: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: PlaylistTrack},
  },
  +queueTracks: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: QueueTrack},
  },
  +sessions: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: Session},
  },
  +tracks: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: Track},
  },
  +users: {
    +allIDs?: Array<string>,
    +total?: number,
    +byID?: {[string]: User},
  },
|};



export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Action,
  State,
};

/**
 * @constant
 * @alias entitiesState
 * @type {object}
 * 
 * @property {object}   albums
 * @property {string[]} albums.allIDs
 * @property {number}   albums.total
 * @property {object}   albums.byID
 * @property {object}   artists
 * @property {string[]} artists.allIDs
 * @property {number}   artists.total
 * @property {object}   artists.byID
 * @property {object}   conversations
 * @property {string[]} conversations.allIDs
 * @property {number}   conversations.total
 * @property {object}   conversations.byID
 * @property {object}   groups
 * @property {string[]} groups.allIDs
 * @property {number}   groups.total
 * @property {object}   groups.byID
 * @property {object}   messages
 * @property {number}   messages.total
 * @property {string[]} messages.allIDs
 * @property {object}   messages.byID
 * @property {object}   playlists
 * @property {string[]} playlists.allIDs
 * @property {number}   playlists.total
 * @property {object}   playlists.byID
 * @property {object}   playlistTracks
 * @property {string[]} playlistTracks.allIDs
 * @property {number}   playlistTracks.total
 * @property {object}   playlistTracks.byID
 * @property {object}   queueTracks
 * @property {string[]} queueTracks.allIDs
 * @property {number}   queueTracks.total
 * @property {object}   queueTracks.byID
 * @property {object}   sessions
 * @property {string[]} sessions.allIDs
 * @property {number}   sessions.total
 * @property {object}   sessions.byID
 * @property {object}   tracks
 * @property {string[]} tracks.allIDs
 * @property {number}   tracks.total
 * @property {object}   tracks.byID
 * @property {object}   users
 * @property {string[]} users.allIDs
 * @property {number}   users.total
 * @property {object}   users.byID
 */
export const initialState: State = {
  albums: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  artists: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  conversations: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  groups: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  messages: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  playlists: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  playlistTracks: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  queueTracks: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  sessions: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  tracks: {
    allIDs: [],
    total: 0,
    byID: {},
  },
  users: {
    allIDs: [],
    total: 0,
    byID: {},
  },
};