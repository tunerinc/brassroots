'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/queue/types';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type QueueTrack = {
  +id: ?string,
  +trackID: ?string,
  +userID: ?string,
  +totalLikes: number,
  +liked: boolean,
};

export type State = {
  +lastUpdated: string,
  +userQueue: Array<string>,
  +contextQueue: Array<string>,
  +queueByID: {+[key: string]: QueueTrack},
  +totalQueue: number,
  +fetchingQueue: boolean,
  +fetchingContext: boolean,
  +liking: Array<string>,
  +deleting: Array<string>,
  +failed: Array<string>,
  +queueing: boolean,
  +unsubscribe: ?() => void,
  +error: ?Error,
  +context: {
    +id: string,
    +name: string,
    +type: string,
    +username: string,
    +position: string | number,
  },
};

/**
 * @callback unsubscribe
 */

/**
 * @constant
 * @alias singleQueueState
 * @type {object}
 * 
 * @property {string}  id=null      The Brassroots id of the queue track
 * @property {string}  trackID=null The Spotify id of the queue track
 * @property {string}  userID=null  The Brassroots id of the user who queued the track
 * @property {number}  totalLikes=0 The total amount of likes the queue track has
 * @property {boolean} liked=false  Whether the current user has liked the queue track
 */
const singleState: QueueTrack = {
  id: null,
  trackID: null,
  userID: null,
  totalLikes: 0,
  liked: false,
};

/**
 * @constant
 * @alias queueState
 * @type {object}
 * 
 * @property {string}          lastUpdated           The date/time the queue was last updated
 * @property {string[]}        userQueue             The Brassroots ids of the tracks next up in the queue
 * @property {string[]}        contextQueue          The Spotify ids of the tracks next up in the queue from the context
 * @property {object}          queueByID             The queue track objects with the Brassroots id as the key
 * @property {number}          totalQueue=0          The total amount of tracks in the queue
 * @property {boolean}         fetchingQueue=false   Whether the current user is fetching the queue of the session
 * @property {boolean}         fetchingContext=false Whether the current user is fetching the context queue of the session
 * @property {string[]}        liking                The Brassroots ids of the tracks in the queue the current user is liking
 * @property {string[]}        deleting              The Brassroots ids of the tracks in the queue the current user is deleting
 * @property {string[]}        failed                The Brassroots ids of the tracks in the queue which experienced an error
 * @property {boolean}         queueing=false        Whether the current user is queueing a track
 * @property {unsubscribe}     unsubscribe=null      The function to invoke to unsubscribe from the queue listener
 * @property {Error}           error=null            The error related to queue actions
 * @property {object}          context               The current context of the queue
 * @property {string}          context.id            The id of the current context
 * @property {string}          context.name          The name of the current context
 * @property {string}          context.type          The type of item the current context is
 * @property {string}          context.username      The username of the current context
 * @property {(number|string)} context.position=0    The position/cursor in the context the current track is located
 */
export const initialState: State = {
  lastUpdated,
  userQueue: [],
  contextQueue: [],
  queueByID: {},
  totalQueue: 0,
  fetchingQueue: false,
  fetchingContext: false,
  liking: [],
  deleting: [],
  failed: [],
  queueing: false,
  unsubscribe: null,
  error: null,
  context: {
    id: '',
    name: '',
    type: '',
    username: '',
    position: 0,
  },
};

function singleTrack(
  state: QueueTrack = singleState,
  action: {type: string},
): QueueTrack {
  switch (action.type) {
    default:
      return state;
  }
}

export default function reducer(
  state: State = initialState,
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}