'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/queue/types';
import * as entitiesTypes from '../actions/entities/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type Action as AlbumAction} from './albums';
import {type Action as ArtistAction} from './artists';
import {type Action as PlayerAction} from './player';
import {type Action as TrackAction} from './tracks';
import {type Action as EntitiesAction} from './entities';

// Case Functions
import {addCurrentContext} from '../actions/queue/AddCurrentContext/reducers';
import {addSingleTrack, addQueueTracks} from '../actions/queue/AddQueueTracks/reducers';
import * as deleteQueueTrack from '../actions/queue/DeleteQueueTrack/reducers';
import * as getContextQueue from '../actions/queue/GetContextQueue/reducers';
import * as getUserQueue from '../actions/queue/GetUserQueue/reducers';
import * as queueTrack from '../actions/queue/QueueTrack/reducers';
import {removeQueueTrack} from '../actions/queue/RemoveQueueTrack/reducers';
import * as stopQueueListener from '../actions/queue/StopQueueListener/reducers';
import * as toggleTrackLike from '../actions/queue/ToggleTrackLike/reducers';

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
};

type State = {
  +lastUpdated?: string,
  +userQueue?: Array<QueueTrack>,
  +totalUserQueue?: number,
  +contextQueue?: Array<string>,
  +fetchingQueue?: boolean,
  +fetchingContext?: boolean,
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
 * @property {string}          lastUpdated           The date/time the queue was last updated
 * @property {string[]}        userQueue             The Brassroots ids of the tracks next up in the queue
 * @property {number}          totalUserQueue=0      The total amount of tracks in the user queue
 * @property {string[]}        contextQueue          The Spotify ids of the tracks next up in the queue from the context
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
 * @property {string}          context.displayName   The display name of the current context
 * @property {(number|string)} context.position=0    The position/cursor in the context the current track is located
 */
export const initialState: State = {
  lastUpdated,
  userQueue: [],
  totalUserQueue: 0,
  contextQueue: [],
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
    displayName: '',
    position: 0,
  },
};

export function singleQueueTrack(
  state: QueueTrack = singleState,
  action: Action,
): QueueTrack {
  switch (action.type) {
    case types.ADD_QUEUE_TRACKS:
    case entitiesTypes.ADD_ENTITIES:
      return addSingleTrack(state, action);
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
      case types.ADD_CURRENT_CONTEXT:
        return addCurrentContext(state, action);
      case types.ADD_QUEUE_TRACKS:
        return addQueueTracks(state, action);
      case types.DELETE_QUEUE_TRACK_REQUEST:
        return deleteQueueTrack.request(state, action);
      case types.DELETE_QUEUE_TRACK_SUCCESS:
        return deleteQueueTrack.success(state, action);
      case types.DELETE_QUEUE_TRACK_FAILURE:
        return deleteQueueTrack.failure(state, action);
      case types.GET_CONTEXT_QUEUE_REQUEST:
        return getContextQueue.request(state);
      case types.GET_CONTEXT_QUEUE_SUCCESS:
        return getContextQueue.success(state, action);
      case types.GET_CONTEXT_QUEUE_FAILURE:
        return getContextQueue.failure(state, action);
      case types.GET_USER_QUEUE_REQUEST:
        return getUserQueue.request(state);
      case types.GET_USER_QUEUE_SUCCESS:
        return getUserQueue.success(state, action);
      case types.GET_USER_QUEUE_FAILURE:
        return getUserQueue.failure(state, action);
      case types.QUEUE_TRACK_REQUEST:
        return queueTrack.request(state);
      case types.QUEUE_TRACK_SUCCESS:
        return queueTrack.success(state);
      case types.QUEUE_TRACK_FAILURE:
        return queueTrack.failure(state, action);
      case types.REMOVE_QUEUE_TRACK:
        return removeQueueTrack(state, action);
      case types.RESET_QUEUE:
        return initialState;
      case types.STOP_QUEUE_LISTENER_REQUEST:
        return state;
      case types.STOP_QUEUE_LISTENER_SUCCESS:
        return stopQueueListener.success(state);
      case types.STOP_QUEUE_LISTENER_FAILURE:
        return stopQueueListener.failure(state, action);
      case types.TOGGLE_TRACK_LIKE_REQUEST:
        return toggleTrackLike.request(state, action);
      case types.TOGGLE_TRACK_LIKE_SUCCESS:
        return toggleTrackLike.success(state, action);
      case types.TOGGLE_TRACK_LIKE_FAILURE:
        return toggleTrackLike.failure(state, action);
      default:
        return state;
    }
  };

  return state;
}