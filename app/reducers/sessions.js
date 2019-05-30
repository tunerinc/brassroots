'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/sessions/types';
import {type Firebase} from '../utils/firebaseTypes';
import type {SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as PlayerAction} from './player';
import {type Action as QueueAction} from './queue';
import {type Action as AlbumAction} from './albums';
import {type Action as ArtistAction} from './artists';
import {type Action as UserAction} from './users';
import {type Action as PlaylistAction} from './playlists';
import {type Action as TrackAction} from './tracks';

// Case Functions
import {addSingleSession, addSessions} from '../actions/sessions/AddSessions/reducers';
import * as changeSessionMode from '../actions/sessions/ChangeSessionMode/reducers';
import * as createSession from '../actions/sessions/CreateSession/reducers';
import * as getFollowingSessions from '../actions/sessions/GetFollowingSessions/reducers';
import * as getNearbySessions from '../actions/sessions/GetNearbySessions/reducers';
import * as getSessionInfo from '../actions/sessions/GetSessionInfo/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
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
  | TrackAction;

type Session = {
  +lastUpdated?: string,
  +id?: ?string,
  +currentTrackID?: ?string,
  +currentQueueID?: ?string,
  +ownerID?: ?string,
  +followingID?: string,
  +distance?: number,
  +mode?: ?string,
  +listeners?: Array<string>,
  +totalListeners?: number,
  +timeLastPlayed?: ?string,
};

type Action = {
  +type?: string,
  +error?: Error,
  +sessions?: {+[id: string]: Session},
  +session?: Session,
  +followingSessions?: Array<string>,
  +followingCanPaginate?: boolean,
  +nearbySessions?: Array<string>,
  +nearbyCanPaginate?: boolean,
  +unsubscribe?: () => Promise<void>,
};

type State = {
  +lastUpdated?: string,
  +currentSessionID?: ?string,
  +sessionsByID?: {+[key: string]: Session},
  +totalSessions?: number,
  +fetchingListeners?: boolean,
  +changingMode?: boolean,
  +fetchingInfo?: boolean,
  +fetchingSessions?: boolean,
  +paginatingSessions?: boolean,
  +refreshingSessions?: boolean,
  +joiningSession?: boolean,
  +leavingSession?: boolean,
  +selectedSession?: ?string,
  +infoUnsubscribe?: ?() => void,
  +error?: ?Error | SpotifyError,
  +explore?: {
    +trendingSessions?: Array<string>,
    +trendingCanPaginate?: boolean,
    +trendingLastUpdated?: string,
    +followingSessions?: Array<string>,
    +followingCanPaginate?: boolean,
    +followingLastUpdated?: string,
    +nearbySessions?: Array<string>,
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
  timeLastPlayed: null,
};

/**
 * @constant
 * @alias sessionsState
 * @type {object}
 * 
 * @property {string}    lastUpdated                       The date/time the sessions were last updated
 * @property {string}    currentSessionID=null             The Brassroots id of the session the current user is in
 * @property {object}    sessionsByID                      The session objects with the session id as the keey
 * @property {number}    totalSessions=0                   The total amount of sessions
 * @property {boolean}   fetchingListeners=false           Whether the current user is fetching the lisetners of a session
 * @property {boolean}   changingMode=false                Whether the current user is changing the mode of a session
 * @property {boolean}   fetchingInfo=false                Whether the current user is fetching session info
 * @property {boolean}   fetchingSessions=false            Whether the current user is fetching sessions
 * @property {boolean}   paginatingSessions=false          Whether the current user is paginating sessions
 * @property {boolean}   refreshingSessions=false          Whether the current user is refreshing sessions
 * @property {boolean}   joiningSession=false              Whether the current user is joining a session
 * @property {boolean}   leavingSession=false              Whether the current user is leaving a session
 * @property {string}    selectedSession=null              The selected session to view
 * @property {infoUnsub} infoUnsubscribe=null              The function to invoke to unsubscribe the session info listener
 * @property {Error}     error=null                        The error related to sessions actions
 * @property {object}    explore                           The explore view
 * @property {string[]}  explore.trendingSessions          The Brassroots ids of the sessions trending on the app
 * @property {boolean}   explore.trendingCanPaginate=true  Whether the trending sessions can paginate
 * @property {string}    explore.trendingLastUpdated       The date/time the trending sessions were last updated
 * @property {string[]}  explore.followingSessions         The Brassroots ids of the sessions of users the current user follows
 * @property {boolean}   explore.followingCanPaginate=true Whether the following sessions can paginate
 * @property {string}    explore.followingLastUpdated      The date/time the following sessions were last updated
 * @property {string[]}  explore.nearbySessions            The Brassroots ids of the sessions nearby to the current user
 * @property {boolean}   explore.nearbyCanPaginate=true    Whether the nearby sessions can paginate
 * @property {string}    explore.nearbyLastUpdated         The date/time the nearby sessions were last updated
 */
export const initialState: State = {
  lastUpdated,
  currentSessionID: null,
  sessionsByID: {},
  totalSessions: 0,
  fetchingListeners: false,
  changingMode: false,
  fetchingInfo: false,
  fetchingSessions: false,
  paginatingSessions: false,
  refreshingSessions: false,
  joiningSession: false,
  leavingSession: false,
  selectedSession: null,
  infoUnsubscribe: null,
  error: null,
  explore: {
    trendingSessions: [],
    trendingCanPaginate: true,
    trendingLastUpdated: lastUpdated,
    followingSessions: [],
    followingCanPaginate: true,
    followingLastUpdated: lastUpdated,
    nearbySessions: [],
    nearbyCanPaginate: true,
    nearbyLastUpdated: lastUpdated,
  },
};

export function singleSession(
  state: Session = singleState,
  action: Action,
): Session {
  switch (action.type) {
    case types.ADD_SESSIONS:
      return addSingleSession(state, action);
    case types.CREATE_SESSION_SUCCESS:
      return addSingleSession(state, action);
    case types.GET_SESSION_INFO_SUCCESS:
      return addSingleSession(state, action);
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
      case types.ADD_SESSIONS:
        return addSessions(state, action);
      case types.CHANGE_SESSION_MODE_REQUEST:
        return changeSessionMode.request(state);
      case types.CHANGE_SESSION_MODE_SUCCESS:
        return changeSessionMode.success(state);
      case types.CHANGE_SESSION_MODE_FAILURE:
        return changeSessionMode.failure(state, action);
      case types.CREATE_SESSION_REQUEST:
        return createSession.request(state);
      case types.CREATE_SESSION_SUCCESS:
        return createSession.success(state, action);
      case types.CREATE_SESSION_FAILURE:
        return createSession.failure(state, action);
      case types.GET_FOLLOWING_SESSIONS_REQUEST:
        return getFollowingSessions.request(state);
      case types.GET_FOLLOWING_SESSIONS_SUCCESS:
        return getFollowingSessions.success(state, action);
      case types.GET_FOLLOWING_SESSIONS_FAILURE:
        return getFollowingSessions.failure(state, action);
      case types.GET_NEARBY_SESSIONS_REQUEST:
        return getNearbySessions.request(state);
      case types.GET_NEARBY_SESSIONS_SUCCESS:
        return getNearbySessions.success(state, action);
      case types.GET_NEARBY_SESSIONS_FAILURE:
        return getNearbySessions.failure(state, action);
      case types.GET_SESSION_INFO_REQUEST:
        return getSessionInfo.request(state);
      case types.GET_SESSION_INFO_SUCCESS:
        return getSessionInfo.success(state, action);
      case types.GET_SESSION_INFO_FAILURE:
        return getSessionInfo.failure(state, action);
      default:
        return state;
    }
  }

  return state;
}