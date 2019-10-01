'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/sessions/types';
import * as entitiesTypes from '../actions/entities/types';
import {type Firebase} from '../utils/firebaseTypes';
import type {SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as PlayerAction} from './player';
import {type Action as QueueAction} from './queue';
import {type Action as AlbumAction} from './albums';
import {type Action as ArtistAction} from './artists';
import {type Action as UserAction} from './users';
import {type Action as PlaylistAction} from './playlists';
import {type Action as TrackAction} from './tracks';
import {type Action as ChatAction} from './chat';
import {type Action as EntitiesAction} from './entities';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;
type DispatchAction =
  | Action
  | PlayerAction
  | QueueAction
  | AlbumAction
  | ArtistAction
  | PlaylistAction
  | UserAction
  | TrackAction
  | ChatAction
  | EntitiesAction;

type Session = {
  +lastUpdated?: string,
  +id?: ?string,
  +currentTrackID?: ?string,
  +currentQueueID?: ?string,
  +ownerID?: ?string,
  +distance?: number,
  +mode?: ?string,
  +listeners?: Array<string>,
  +totalListeners?: number,
  +totalPlayed?: number,
  +timeLastPlayed?: ?string,
  +followingID?: string,
};

type Action = {
  +type?: string,
  +error?: Error,
  +sessions?: {+[id: string]: Session} | Array<string>,
  +sessionID?: string,
  +followingIDs?: Array<string>,
  +followingCanPaginate?: boolean,
  +nearbyIDs?: Array<string>,
  +nearbyCanPaginate?: boolean,
  +trendingIDs?: Array<string>,
  +trendingCanPaginate?: boolean,
  +unsubscribe?: () => void,
  +userID?: string,
  +totalListeners?: number,
  +sessionID?: string,
  +updates?: Session,
  +isOwner?: boolean,
  +updates?: State,
  +item?: Session,
  +refreshing?: boolean,
};

type State = {
  +lastUpdated?: string,
  +currentSessionID?: ?string,
  +fetching?: Array<string>,
  +saving?: boolean,
  +paginating?: boolean,
  +refreshing?: boolean,
  +joining?: boolean,
  +leaving?: boolean,
  +selectedSession?: ?string,
  +infoUnsubscribe?: ?() => void,
  +error?: ?Error | SpotifyError,
  +explore?: {
    +trendingIDs?: Array<string>,
    +trendingCanPaginate?: boolean,
    +trendingLastUpdated?: string,
    +followingIDs?: Array<string>,
    +followingCanPaginate?: boolean,
    +followingLastUpdated?: string,
    +nearbyIDs?: Array<string>,
    +nearbyCanPaginate?: boolean,
    +nearbyLastUpdated?: string,
  },
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Session,
  Action,
  State,
};

/**
 * @callback infoUnsub
 */

/**
 * @constant
 * @alias singleSessionState
 * @type {object}
 * 
 * @property {string}   lastUpdated         The date/time the session was last updated
 * @property {string}   id=null             The Brassroots id of the session
 * @property {string}   currentTrackID=null The Spotify id of the current track playing
 * @property {string}   currentQueueID=null The Brassroots id of the current track playing in the queue
 * @property {string}   ownerID=null        The Brassroots id of the user who is the owner of the session
 * @property {number}   distance=0          The distance of the session to the current user, if permissions allow
 * @property {string}   mode=null           The mode the session is currently in
 * @property {string[]} listeners           The Brassroots ids of the listeners in the session
 * @property {number}   totalListeners=0    The total amount of listeners in the session
 * @property {number}   totalPlayed=0       The total amount of tracks that have been played
 * @property {string}   timeLastPlayed=null The last time the current track was played
 */
const singleState: Session = {
  lastUpdated,
  id: null,
  currentTrackID: null,
  currentQueueID: null,
  ownerID: null,
  distance: 0,
  mode: null,
  listeners: [],
  totalListeners: 0,
  totalPlayed: 0,
  timeLastPlayed: null,
};

/**
 * @constant
 * @alias sessionsState
 * @type {object}
 * 
 * @property {string}    lastUpdated                       The date/time the sessions were last updated
 * @property {string}    currentSessionID=null             The Brassroots id of the session the current user is in
 * @property {string[]}  fetching=[]                       Whether the current user is fetching session info
 * @property {boolean}   saving=false                      Whether the current user is saving a session
 * @property {boolean}   paginating=false                  Whether the current user is paginating sessions
 * @property {boolean}   refreshing=false                  Whether the current user is refreshing sessions
 * @property {boolean}   joining=false                     Whether the current user is joining a session
 * @property {boolean}   leaving=false                     Whether the current user is leaving a session
 * @property {string}    selectedSession=null              The selected session to view
 * @property {infoUnsub} infoUnsubscribe=null              The function to invoke to unsubscribe the session info listener
 * @property {Error}     error=null                        The error related to sessions actions
 * @property {object}    explore                           The explore view
 * @property {string[]}  explore.trendingIDs               The Brassroots ids of the sessions trending on the app
 * @property {boolean}   explore.trendingCanPaginate=true  Whether the trending sessions can paginate
 * @property {string}    explore.trendingLastUpdated       The date/time the trending sessions were last updated
 * @property {string[]}  explore.followingIDs              The Brassroots ids of the sessions of users the current user follows
 * @property {boolean}   explore.followingCanPaginate=true Whether the following sessions can paginate
 * @property {string}    explore.followingLastUpdated      The date/time the following sessions were last updated
 * @property {string[]}  explore.nearbyIDs                 The Brassroots ids of the sessions nearby to the current user
 * @property {boolean}   explore.nearbyCanPaginate=true    Whether the nearby sessions can paginate
 * @property {string}    explore.nearbyLastUpdated         The date/time the nearby sessions were last updated
 */
export const initialState: State = {
  lastUpdated,
  currentSessionID: null,
  fetching: [],
  saving: false,
  paginating: false,
  refreshing: false,
  joining: false,
  leaving: false,
  selectedSession: null,
  infoUnsubscribe: null,
  error: null,
  explore: {
    trendingIDs: [],
    trendingCanPaginate: true,
    trendingLastUpdated: lastUpdated,
    followingIDs: [],
    followingCanPaginate: true,
    followingLastUpdated: lastUpdated,
    nearbyIDs: [],
    nearbyCanPaginate: true,
    nearbyLastUpdated: lastUpdated,
  },
};

/**
 * Adds or updates a single session
 * 
 * @function addOrUpdateSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {object} action.item The session object to add or update
 * 
 * @returns {object}             The single session added or updated with the new information
 */
function addOrUpdateSession(
  state: Session,
  action: Action,
): Session {
  const {listeners} = state;
  const {item, refreshing} = action;
  const updates: Session = item && Array.isArray(listeners)
    ? {
      ...item,
      lastUpdated,
      listeners: item.listeners && refreshing
        ? [...item.listeners]
        : item.listeners
        ? [...listeners, ...item.listeners]
        : [...listeners],
    }
    : {};

  return updateObject(state, updates);
}

export function session(
  state: Session = singleState,
  action: Action,
): Session {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return addOrUpdateSession(state, action);
    default:
      return state;
  }
}

/**
 * Updates any of the values in the sessions state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.updates The updates to make to the state
 * @param   {string} type           The type to add/remove from fetching array
 * 
 * @returns {object}                The state updated with the new information
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {
    currentSessionID,
    joining,
    fetching,
    refreshing,
    infoUnsubscribe,
    explore: explore,
  } = state;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const updates: State = (
    explore
    && typeof action.type === 'string'
    && Array.isArray(fetching)
    && Array.isArray(explore.trendingIDs)
  )
    ? {
      ...(action.updates ? action.updates : {}),
      lastUpdated,
      fetching: add && type ? fetching.concat(type) : type ? fetching.filter(t => t !== type) : fetching,
      refreshing: add && type === 'trending' && explore.trendingIDs.length !== 0 ? true : false,
      currentSessionID: action.type === 'LEAVE_SESSION_SUCCESS'
        ? null
        : action.updates && typeof action.updates.currentSessionID === 'string'
        ? action.updates.currentSessionID
        : currentSessionID,
      infoUnsubscribe: action.type === 'STOP_SESSION_INFO_LISTENER_SUCCESS'
        ? null
        : typeof action.unsubscribe === 'function'
        ? action.unsubscribe
        : infoUnsubscribe,
      joining: action.type === 'CREATE_SESSION_REQUEST' || action.type === 'JOIN_SESSION_REQUEST'
        ? true
        : false,
      leaving: action.type === 'LEAVE_SESSION_REQUEST' ? true : false,
      saving: action.type === 'SAVE_SESSION_REQUEST' ? true : false,
      error: haveError ? action.error : null,
      explore: action.isOwner && Array.isArray(explore.trendingIDs)
        ? updateObject(explore, {
          trendingLastUpdated: lastUpdated,
          trendingIDs: explore.trendingIDs.filter(id => id !== currentSessionID),
        })
        : action.updates && action.updates.explore
        ? updateObject(explore, {
          trendingLastUpdated: lastUpdated,
          trendingCanPaginate: typeof action.updates.explore.trendingCanPaginate === 'boolean'
            ? action.updates.explore.trendingCanPaginate
            : explore.trendingCanPaginate,
          trendingIDs: action.updates.explore.trendingIDs && refreshing
            ? [...action.updates.explore.trendingIDs]
            : action.updates.explore.trendingIDs
            ? [...explore.trendingIDs, ...action.updates.explore.trendingIDs]
            : [...explore.trendingIDs],
        })
        : {...explore},
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
      case types.CREATE_SESSION_REQUEST:
      case types.CREATE_SESSION_SUCCESS:
      case types.CREATE_SESSION_FAILURE:
      case types.JOIN_SESSION_REQUEST:
      case types.JOIN_SESSION_SUCCESS:
      case types.JOIN_SESSION_FAILURE:
      case types.LEAVE_SESSION_REQUEST:
      case types.LEAVE_SESSION_SUCCESS:
      case types.LEAVE_SESSION_FAILURE:
      case types.SAVE_SESSION_REQUEST:
      case types.SAVE_SESSION_SUCCESS:
      case types.SAVE_SESSION_FAILURE:
      case types.UPDATE_SESSIONS:
        return update(state, action);

      case types.GET_SESSION_INFO_REQUEST:
      case types.GET_SESSION_INFO_SUCCESS:
      case types.GET_SESSION_INFO_FAILURE:
        return update(state, action, 'info');
      case types.GET_TRENDING_SESSIONS_REQUEST:
      case types.GET_TRENDING_SESSIONS_SUCCESS:
      case types.GET_TRENDING_SESSIONS_FAILURE:
        return update(state, action, 'trending');
      case types.PAGINATE_TRENDING_SESSIONS_REQUEST:
        return updateObject(state, {paginating: true, error: null});
      case types.PAGINATE_TRENDING_SESSIONS_SUCCESS:
        return updateObject(state, {paginating: false, error: null});
      case types.PAGINATE_TRENDING_SESSIONS_FAILURE:
        return updateObject(state, {error: action.error, paginating: false});

      case types.RESET_SESSIONS:
        return initialState;

      case types.STOP_SESSION_INFO_LISTENER_REQUEST:
        return state;

      case types.STOP_SESSION_INFO_LISTENER_SUCCESS:
      case types.STOP_SESSION_INFO_LISTENER_FAILURE:
        return update(state, action, 'info');

      default:
        return state;
    }
  }

  return state;
}