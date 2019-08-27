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
import {
  type Conversation,
  type Message,
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
import {type Entities} from '../actions/entities/RemoveEntities';

// Case Functions
import {addEntityType, addEntities} from '../actions/entities/AddEntities/reducers';
import {removeEntities} from '../actions/entities/RemoveEntities/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type EntityType =
  | Album
  | Artist
  | Conversation
  | Group
  | Message
  | Playlist
  | PlaylistTrack
  | QueueTrack
  | Session
  | Track
  | User;

type Entity = {
  +allIDs?: Array<string>,
  +total?: number,
  +byID?: {[string]: EntityType},
};

type Action = {
  +type?: string,
  +error?: Error,
  +entities?: Entities | {+[type: string]: {+[id: string]: EntityType}},
  +ids?: Array<string>,
  +item?: EntityType,
  +items?: Array<EntityType>,
  +updates?: {+[type: string]: {+[id: string]: EntityType}},
  +entityType?: string,
};

type State = {
  +albums?: Entity,
  +artists?: Entity,
  +conversations?: Entity,
  +groups?: Entity,
  +messages?: Entity,
  +playlists?: Entity,
  +playlistTracks?: Entity,
  +queueTracks?: Entity,
  +sessions?: Entity,
  +tracks?: Entity,
  +users?: Entity,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  EntityType,
  Entity,
  Action,
  State,
};

/**
 * @constant
 * @alias entityTypeState
 * @type {object}
 * 
 * @property {string[]} allIDs=[]
 * @property {number}   total=0
 * @property {object}   byID
 */
export const entityTypeState: Entity = {
  allIDs: [],
  total: 0,
  byID: {},
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
  albums: entityTypeState,
  artists: entityTypeState,
  conversations: entityTypeState,
  groups: entityTypeState,
  messages: entityTypeState,
  playlists: entityTypeState,
  playlistTracks: entityTypeState,
  queueTracks: entityTypeState,
  sessions: entityTypeState,
  tracks: entityTypeState,
  users: entityTypeState,
};

export function singleEntityType(
  state: Entity = entityTypeState,
  action: Action,
): Entity {
  switch (action.type) {
    case types.ADD_ENTITIES:
      return addEntityType(state, action);
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
      case types.ADD_ENTITIES:
        return addEntities(state, action);
      case types.REMOVE_ENTITIES:
        return removeEntities(state, action);
    }
  }

  return state;
}