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

