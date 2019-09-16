'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/settings/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type Action as AlbumAction} from './albums';
import {type Action as ArtistAction} from './artists';
import {type Action as ChatAction} from './chat';
import {type Action as EntitiesAction} from './entities';
import {type Action as FeedbackAction} from './feedback';
import {type Action as OnboardingAction} from './onboarding';
import {type Action as PlayerAction} from './player';
import {type Action as PlaylistAction} from './playlists';
import {type Action as QueueAction} from './queue';
import {type Action as SearchAction} from './search';
import {type Action as SessionAction} from './sessions';
import {type Action as TrackAction} from './tracks';
import {type Action as UserAction} from './users';
import {type SpotifyError} from '../utils/spotifyAPI/types';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction =
  | Action
  | AlbumAction
  | ArtistAction
  | ChatAction
  | EntitiesAction
  | FeedbackAction
  | OnboardingAction
  | PlayerAction
  | PlaylistAction
  | QueueAction
  | SearchAction
  | SessionAction
  | TrackAction
  | UserAction;

type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<DispatchAction>) => any;

type Notify = {
  +session?: string,
  +chat?: string,
  +message?: boolean,
  +groupMessage?: string,
  +nearbySession?: string,
  +playlistChange?: boolean,
  +playlistJoin?: boolean,
  +likedTrack?: boolean,
  +newFollower?: boolean,
};

type Preference = {
  +playlist?: string,
  +session?: string,
  +message?: string,
  +muteNearby?: boolean,
};

type Settings = {
  +id?: string,
  +language?: string,
  +region?: string,
  +soundEffects?: boolean,
  +theme?: string,
  +version?: string,
  +notify?: Notify,
  +preference?: Preference,
};

type Action = {
  +type?: string,
  +error?: Error,
  +settings?: Settings,
  +status?: string | boolean,
  +theme?: string,
  +loggedIn?: boolean,
  +updates?: State,
};

type State = {
  ...Settings,
  +lastUpdated?: string,
  +initializing?: boolean,
  +loggingIn?: boolean,
  +loggedIn?: boolean,
  +loggingOut?: boolean,
  +saving?: Array<mixed>,
  +failed?: Array<mixed>,
  +fetchingSettings?: boolean,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Notify,
  Preference,
  Settings,
  Action,
  State,
};

/**
 * @constant
 * @alias settingsState
 * @type {object}
 * 
 * @property {string}   lastUpdated                   The date/time the settings were last updated
 * @property {boolean}  initializing=false            Whether the Spotify module is initializing
 * @property {boolean}  loggingIn=false               Whether the current user is logging in
 * @property {boolean}  loggedIn=false                Whether the current user is logged in
 * @property {boolean}  loggingOUt=false              Whether the current user is logging out
 * @property {string[]} saving                        The settings which are being saved
 * @property {string[]} failed                        The settings which failed to change
 * @property {boolean}  fetchingSettings=false        Whether the current user is fetching settings
 * @property {Error}    error=null                    The error related to settings actions
 * @property {string}   version                       The current version of the Brassroots app
 * @property {boolean}  soundEffects=true             Whether the current user has sound effects enabled
 * @property {string}   theme=dark                    The selected theme color by the current user
 * @property {string}   language=english              The language the current user has set for the app
 * @property {string}   region=us                     The region the current user is in
 * @property {object}   notify                        The notification settings for the current user
 * @property {string}   notify.session=following      The notification status for live sessions
 * @property {string}   notify.chat=mentions          The notification status for a session's chat
 * @property {boolean}  notify.message=true           The notification status for direct messages
 * @property {string}   notify.groupMessage=all       The notification status for group direct messages
 * @property {string}   notify.nearbySession=all      The notifcatio status for nearby sessions to the current user
 * @property {boolean}  notify.playlistChange=true    The notification status for changes made on the current user's playlists
 * @property {boolean}  notify.playlistJoin=true      The notification status for joins on the current user's playlists
 * @property {boolean}  notify.likedTrack=true        The notification status for likes on the current user's queued track
 * @property {boolean}  notify.newFollower=true       The notification status for new followers of the current user
 * @property {object}   preference                    The preferences for the current user
 * @property {string}   preference.playlist=limitless The mode preference to create new playlists in
 * @property {string}   preference.session=radio      The mode preference to create new sessions in
 * @property {string}   preference.message=anyone     The message preference as to who can send you direct messages
 * @property {boolean}  preference.muteNearby=true    The preference status to mute sessions you are nearby to
 */
export const initialState: State = {
  lastUpdated,
  version: '0.0.1',
  initializing: false,
  loggingIn: false,
  loggedIn: false,
  loggingOut: false,
  saving: [],
  failed: [],
  fetchingSettings: false,
  error: null,
  soundEffects: true,
  theme: 'dark',
  language: 'english',
  region: 'us',
  notify: {
    session: 'following',
    chat: 'mentions',
    message: true,
    groupMessage: 'all',
    nearbySession: 'all',
    playlistChange: true,
    playlistJoin: true,
    likedTrack: true,
    newFollower: true,
  },
  preference: {
    playlist: 'limitless',
    session: 'radio',
    message: 'anyone',
    muteNearby: true,
  },
};

/**
 * Updates any of the values in the settings state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.updates The updatees to make to the state
 * @param   {string} action.type    The type to add/remove from saving/failed props
 * 
 * @returns {object}                The state with the new information added/updated
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {saving, failed, notify: oldNotify, preference: oldPref} = state;
  const {error} = action;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const notify = oldNotify && action.updates && action.updates.notify
    ? updateObject(oldNotify, action.updates.notify)
    : oldNotify;

  const preference = oldPref && action.updates && action.updates.preference
    ? updateObject(oldPref, action.updates.preference)
    : oldPref;

  const updates: State = Array.isArray(saving) && Array.isArray(failed)
    ? {
      ...(action.updates ? action.updates : {}),
      notify,
      preference,
      error: error ? error : null,
      saving: type && add ? saving.concat(type) : saving.filter(t => t !== type),
      failed: type && haveError ? failed.concat(type) : failed.filter(t => t !== type),
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
      case types.AUTHORIZE_USER_REQUEST:
        return updateObject(state, {loggingIn: true, error: null});
      case types.AUTHORIZE_USER_SUCCESS:
        return updateObject(state, {lastUpdated, loggingIn: false, loggedIn: true, error: null});
      case types.AUTHORIZE_USER_FAILURE:
        return updateObject(state, {error: action.error, loggingIn: false});
      case types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_REQUEST:
      case types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_SUCCESS:
      case types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_FAILURE:
        return update(state, action, 'direct message');
      case types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST:
      case types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS:
      case types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE:
        return update(state, action, 'group message');
      case types.CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST:
      case types.CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS:
      case types.CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE:
        return update(state, action, 'liked track');
      case types.CHANGE_MESSAGE_PREFERENCE_REQUEST:
      case types.CHANGE_MESSAGE_PREFERENCE_SUCCESS:
      case types.CHANGE_MESSAGE_PREFERENCE_FAILURE:
        return update(state, action, 'message pref');
      case types.CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST:
      case types.CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS:
      case types.CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE:
        return update(state, action, 'nearby session');
      case types.CHANGE_NEW_FOLLOWER_NOTIFICATION_REQUEST:
      case types.CHANGE_NEW_FOLLOWER_NOTIFICATION_SUCCESS:
      case types.CHANGE_NEW_FOLLOWER_NOTIFICATION_FAILURE:
        return update(state, action, 'new follower');
      case types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST:
      case types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS:
      case types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE:
        return update(state, action, 'playlist change');
      case types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST:
      case types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS:
      case types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE:
        return update(state, action, 'playlist join');
      case types.CHANGE_PLAYLIST_PREFERENCE_REQUEST:
      case types.CHANGE_PLAYLIST_PREFERENCE_SUCCESS:
      case types.CHANGE_PLAYLIST_PREFERENCE_FAILURE:
        return update(state, action, 'playlist pref');
      case types.CHANGE_SESSION_CHAT_NOTIFICATION_REQUEST:
      case types.CHANGE_SESSION_CHAT_NOTIFICATION_SUCCESS:
      case types.CHANGE_SESSION_CHAT_NOTIFICATION_FAILURE:
        return update(state, action, 'session chat');
      case types.CHANGE_SESSION_PREFERENCE_REQUEST:
      case types.CHANGE_SESSION_PREFERENCE_SUCCESS:
      case types.CHANGE_SESSION_PREFERENCE_FAILURE:
        return update(state, action, 'session pref');
      case types.CHANGE_SESSIONS_NOTIFICATION_REQUEST:
      case types.CHANGE_SESSIONS_NOTIFICATION_SUCCESS:
      case types.CHANGE_SESSIONS_NOTIFICATION_FAILURE:
        return update(state, action, 'sessions');
      case types.CHANGE_SOUND_EFFECTS_REQUEST:
      case types.CHANGE_SOUND_EFFECTS_SUCCESS:
      case types.CHANGE_SOUND_EFFECTS_FAILURE:
        return update(state, action, 'sound effects');
      case types.CHANGE_THEME_COLOR_REQUEST:
      case types.CHANGE_THEME_COLOR_SUCCESS:
      case types.CHANGE_THEME_COLOR_FAILURE:
        return update(state, action, 'theme');
      case types.GET_USER_SETTINGS_REQUEST:
        return updateObject(state, {fetchingSettings: true, error: null});
      case types.GET_USER_SETTINGS_SUCCESS:
        return updateObject(state, {lastUpdated, fetchingSettings: false, error: null});
      case types.GET_USER_SETTINGS_FAILURE:
        return updateObject(state, {error: action.error, fetchingSettings: false});
      case types.INITIALIZE_SPOTIFY_REQUEST:
        return updateObject(state, {initializing: true, error: null});
      case types.INITIALIZE_SPOTIFY_SUCCESS:
        return updateObject(state, {lastUpdated, loggedIn: action.loggedIn, initializing: false});
      case types.INITIALIZE_SPOTIFY_FAILURE:
        return updateObject(state, {error: action.error, initializing: false});
      case types.LOG_OUT_REQUEST:
        return updateObject(state, {loggingOut: true, error: null});
      case types.LOG_OUT_SUCCESS:
        return updateObject(initialState, {initialized: true});
      case types.LOG_OUT_FAILURE:
        return updateObject(state, {error: action.error, loggingOut: false});
      case types.RESET_SETTINGS:
        return initialState;
      case types.UPDATE_SETTINGS:
        return update(state, action);
      default:
        return state;
    }
  }

  return state;
}