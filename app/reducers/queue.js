'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import getUnique from '../utils/getUnique';
import * as types from '../actions/queue/types';
import * as entitiesTypes from '../actions/entities/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type Action as AlbumAction} from './albums';
import {type Action as ArtistAction} from './artists';
import {type Action as PlayerAction} from './player';
import {type Action as TrackAction} from './tracks';
import {type Action as EntitiesAction} from './entities';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction =
  | Action
  | AlbumAction
  | ArtistAction
  | PlayerAction
  | TrackAction
  | EntitiesAction;

type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type Updates = {
  totalLikes?: number,
  changeLike?: boolean,
};

type Context = {
  +id?: string,
  +name?: string,
  +type?: string,
  +displayName?: string,
  +position?: string | number,
  +total?: number,
  +tracks?: Array<string>,
};

type QueueTrack = {
  +id?: ?string,
  +trackID?: ?string,
  +userID?: ?string,
  +totalLikes?: number,
  +liked?: boolean,
  +seconds?: ?number,
  +nanoseconds?: ?number,
  +isCurrent?: boolean,
};

type Action = {
  +type?: string,
  +error?: Error,
  +context?: Context,
  +tracks?: {+[id: string]: QueueTrack},
  +track?: QueueTrack,
  +queueID?: string,
  +queue?: ?Array<QueueTrack>,
  +contextQueue?: ?Array<string>,
  +unsubscribe?: () => void,
  +updates?: Updates,
  +removeTrack?: boolean,
  +updates?: State,
  +item?: QueueTrack,
};

type State = {
  +lastUpdated?: string,
  +userQueue?: Array<QueueTrack>,
  +totalUserQueue?: number,
  +contextQueue?: Array<string>,
  +fetching?: Array<string>,
  +liking?: Array<string>,
  +deleting?: Array<string>,
  +failed?: Array<string>,
  +queueing?: boolean,
  +unsubscribe?: ?() => any,
  +error?: ?Error,
  +context?: Context,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Updates,
  Context,
  QueueTrack,
  Action,
  State,
};

/**
 * @callback unsubscribe
 */

/**
 * @constant
 * @alias singleQueueState
 * @type {object}
 * 
 * @property {string}  id=null         The Brassroots id of the queue track
 * @property {string}  trackID=null    The Spotify id of the queue track
 * @property {string}  userID=null     The Brassroots id of the user who queued the track
 * @property {number}  totalLikes=0    The total amount of likes the queue track has
 * @property {boolean} liked=false     Whether the current user has liked the queue track
 * @property {number}  seconds=0       The seconds when the track was added
 * @property {number}  nanoseconds=0   The nanoseconds wehn the track was added
 * @property {boolean} isCurrent=false Whether the track is the currently playing track
 */
const singleState: QueueTrack = {
  id: null,
  trackID: null,
  userID: null,
  totalLikes: 0,
  liked: false,
  seconds: 0,
  nanoseconds: 0,
  isCurrent: false,
};

/**
 * @constant
 * @alias queueState
 * @type {object}
 * 
 * @property {string}          lastUpdated         The date/time the queue was last updated
 * @property {string[]}        userQueue           The Brassroots ids of the tracks next up in the queue
 * @property {number}          totalUserQueue=0    The total amount of tracks in the user queue
 * @property {string[]}        contextQueue        The Spotify ids of the tracks next up in the queue from the context
 * @property {boolean}         fetching=[]         Whether the current user is fetching any entity type
 * @property {string[]}        liking              The Brassroots ids of the tracks in the queue the current user is liking
 * @property {string[]}        deleting            The Brassroots ids of the tracks in the queue the current user is deleting
 * @property {string[]}        failed              The Brassroots ids of the tracks in the queue which experienced an error
 * @property {boolean}         queueing=false      Whether the current user is queueing a track
 * @property {unsubscribe}     unsubscribe=null    The function to invoke to unsubscribe from the queue listener
 * @property {Error}           error=null          The error related to queue actions
 * @property {object}          context             The current context of the queue
 * @property {string}          context.id          The id of the current context
 * @property {string}          context.name        The name of the current context
 * @property {string}          context.type        The type of item the current context is
 * @property {string}          context.displayName The display name of the current context
 * @property {(number|string)} context.position=0  The position/cursor in the context the current track is located
 */
export const initialState: State = {
  lastUpdated,
  userQueue: [],
  totalUserQueue: 0,
  contextQueue: [],
  fetching: [],
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
    displayName: '',
    position: 0,
  },
};

export function queueTrack(
  state: QueueTrack = singleState,
  action: Action,
): QueueTrack {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return updateObject(state, {...(action.item ? action.item : {})});
    default:
      return state;
  }
}

/**
 * Updates any of the values in the queue state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.updates The updates to make to the state
 * @param   {string} type           The type of add/remove from the fetching array
 * 
 * @returns {object}                The state updated with the new information
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {userQueue, totalUserQueue, context, unsubscribe, liking, deleting, failed, fetching} = state;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const uniqueQueue = action.queue && userQueue ? getUnique([...userQueue, ...action.queue], 'id') : [];
  const newQueue = action.queue && userQueue
    ? uniqueQueue.sort((a, b) => {
      if (
        typeof a.seconds === 'number'
        && typeof a.nanoseconds === 'number'
        && typeof b.seconds === 'number'
        && typeof b.nanoseconds === 'number'
      ) {
        const {seconds: secA, nanoseconds: nanA} = a;
        const {seconds: secB, nanoseconds: nanB} = b;
        return secA < secB ? -1 : secA > secB ? 1 : nanA < nanB ? -1 : nanA > nanB ? 1 : 0;
      } else {
        return 0;
      }
    })
  : userQueue
  ? [...userQueue]
  : [];

  const updates: State = (
    context
    && Array.isArray(userQueue)
    && Array.isArray(liking)
    && Array.isArray(deleting)
    && Array.isArray(failed)
    && Array.isArray(fetching)
    && typeof totalUserQueue === 'number'
    && action.type
  )
    ? {
      ...(action.updates ? action.updates : {}),
      lastUpdated,
      fetching: add && type ? fetching.concat(type) : type ? fetching.filter(t => t !== type) : fetching,
      error: haveError ? action.error : null,
      userQueue: action.type === 'REMOVE_QUEUE_TRACK' && typeof action.queueID === 'string'
        ? userQueue.filter(o => o.id !== action.queueID)
        : [...newQueue],
      totalUserQueue: action.type === 'REMOVE_QUEUE_TRACK' ? totalUserQueue - 1 : newQueue.length,
      liking: type === 'toggle' && add && action.queueID
        ? liking.concat(action.queueID)
        : action.type.includes('TOGGLE_TRACK_LIKE') && action.queueID
        ? liking.filter(id => id !== action.queueID)
        : [...liking],
      deleting: type === 'delete' && add && action.queueID
        ? deleting.concat(action.queueID)
        : action.type.includes('DELETE_QUEUE') && action.queueID
        ? deleting.filter(id => id !== action.queueID)
        : [...deleting],
      failed: (type === 'toggle' || type === 'delete') && haveError && action.queueID
        ? failed.concat(action.queueID)
        : (type === 'toggle' || type === 'delete') && typeof action.queueID === 'string'
        ? failed.filter(id => id !== action.queueID)
        : [...failed],
      unsubscribe: action.type === 'STOP_QUEUE_LISTENER_SUCCESS'
        ? null
        : typeof action.unsubscribe === 'function'
        ? action.unsubscribe
        : unsubscribe,
      context: action.updates && action.updates.context
        ? updateObject(context, action.updates.context)
        : {...context},
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
      case types.DELETE_QUEUE_TRACK_REQUEST:
      case types.DELETE_QUEUE_TRACK_SUCCESS:
      case types.DELETE_QUEUE_TRACK_FAILURE:
        return update(state, action, 'delete');
      case types.GET_USER_QUEUE_REQUEST:
      case types.GET_USER_QUEUE_FAILURE:
        return update(state, action, 'queue');
      case types.QUEUE_TRACK_REQUEST:
        return updateObject(state, {queueing: true, error: null});
      case types.QUEUE_TRACK_SUCCESS:
        return updateObject(state, {queueing: false, error: null});
      case types.QUEUE_TRACK_FAILURE:
        return updateObject(state, {error: action.error, queueing: false});
      case types.RESET_QUEUE:
        return initialState;
      case types.STOP_QUEUE_LISTENER_REQUEST:
        return state;
      case types.STOP_QUEUE_LISTENER_SUCCESS:
      case types.STOP_QUEUE_LISTENER_FAILURE:
        return update(state, action, 'queue');
      case types.TOGGLE_TRACK_LIKE_REQUEST:
      case types.TOGGLE_TRACK_LIKE_SUCCESS:
      case types.TOGGLE_TRACK_LIKE_FAILURE:
        return update(state, action, 'toggle');
      case types.GET_USER_QUEUE_SUCCESS:
      case types.REMOVE_QUEUE_TRACK:
      case types.UPDATE_QUEUE:
        return update(state, action);
      default:
        return state;
    }
  };

  return state;
}