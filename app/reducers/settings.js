'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/settings/types';
import type {SpotifyError} from '../utils/spotifyAPI/types';

// Case Functions
import {addSettings} from '../actions/settings/AddSettings/reducers';
import * as authorizeUser from '../actions/settings/AuthUser/reducers';
import * as changeDirectMessageNotification from '../actions/settings/ChangeDirectMessageNotification/reducers';
import * as changeGroupDirectMessageNotification from '../actions/settings/ChangeGroupDirectMessageNotification/reducers';
import * as changeLikeTrackNotification from '../actions/settings/ChangeLikeTrackNotification/reducers';
import * as changeMessagePreference from '../actions/settings/ChangeMessagePreference/reducers';
import * as changeNearbySessionNotification from '../actions/settings/ChangeNearbySessionNotification/reducers';
import * as changeNewFollowerNotification from '../actions/settings/ChangeNewFollowerNotification/reducers';
import * as changePlaylistChangeNotification from '../actions/settings/ChangePlaylistChangeNotification/reducers';
import * as changePlaylistJoinNotification from '../actions/settings/ChangePlaylistJoinNotification/reducers';
import * as changePlaylistPreference from '../actions/settings/ChangePlaylistPreference/reducers';
import * as changeSessionChatNotification from '../actions/settings/ChangeSessionChatNotification/reducers';
import * as changeSessionPreference from '../actions/settings/ChangeSessionPreference/reducers';
import * as changeSessionsNotification from '../actions/settings/ChangeSessionsNotification/reducers';
import * as changeSoundEffects from '../actions/settings/ChangeSoundEffects/reducers';
import * as changeThemeColor from '../actions/settings/ChangeThemeColor/reducers';
import * as getUserSettings from '../actions/settings/GetUserSettings/reducers';
import * as initializeSpotify from '../actions/settings/InitializeSpotify/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type Notify = {
  +session: string,
  +chat: string,
  +message: boolean,
  +groupMessage: string,
  +nearbySession: string,
  +playlistChange: boolean,
  +playlistJoin: boolean,
  +likedTrack: boolean,
  +newFollower: boolean,
};

export type Preference = {
  +playlist: string,
  +session: string,
  +message: string,
  +muteNearby: boolean,
};

export type Settings = {
  +id?: string,
  +language?: string,
  +region?: string,
  +soundEffects?: boolean,
  +theme?: string,
  +version?: string,
  +notify?: Notify,
  +preference?: Preference,
};

export type Action = {
  +type?: string,
  +error?: Error,
  +settings?: Settings,
  +status?: string | boolean,
  +theme?: string,
  +loggedIn?: boolean,
};

export type State = {
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

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.ADD_SETTINGS:
        return addSettings(state, action);
      case types.AUTHORIZE_USER_REQUEST:
        return authorizeUser.request(state);
      case types.AUTHORIZE_USER_SUCCESS:
        return authorizeUser.success(state);
      case types.AUTHORIZE_USER_FAILURE:
        return authorizeUser.failure(state, action);
      case types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_REQUEST:
        return changeDirectMessageNotification.request(state);
      case types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_SUCCESS:
        return changeDirectMessageNotification.success(state, action);
      case types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_FAILURE:
        return changeDirectMessageNotification.failure(state, action);
      case types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST:
        return changeGroupDirectMessageNotification.request(state);
      case types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS:
        return changeGroupDirectMessageNotification.success(state, action);
      case types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE:
        return changeGroupDirectMessageNotification.failure(state, action);
      case types.CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST:
        return changeLikeTrackNotification.request(state);
      case types.CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS:
        return changeLikeTrackNotification.success(state, action);
      case types.CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE:
        return changeLikeTrackNotification.failure(state, action);
      case types.CHANGE_MESSAGE_PREFERENCE_REQUEST:
        return changeMessagePreference.request(state);
      case types.CHANGE_MESSAGE_PREFERENCE_SUCCESS:
        return changeMessagePreference.success(state, action);
      case types.CHANGE_MESSAGE_PREFERENCE_FAILURE:
        return changeMessagePreference.failure(state, action);
      case types.CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST:
        return changeNearbySessionNotification.request(state);
      case types.CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS:
        return changeNearbySessionNotification.success(state, action);
      case types.CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE:
        return changeNearbySessionNotification.failure(state, action);
      case types.CHANGE_NEW_FOLLOWER_NOTIFICATION_REQUEST:
        return changeNewFollowerNotification.request(state);
      case types.CHANGE_NEW_FOLLOWER_NOTIFICATION_SUCCESS:
        return changeNewFollowerNotification.success(state, action);
      case types.CHANGE_NEW_FOLLOWER_NOTIFICATION_FAILURE:
        return changeNewFollowerNotification.failure(state, action);
      case types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST:
        return changePlaylistChangeNotification.request(state);
      case types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS:
        return changePlaylistChangeNotification.success(state, action);
      case types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE:
        return changePlaylistChangeNotification.failure(state, action);
      case types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST:
        return changePlaylistJoinNotification.request(state);
      case types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS:
        return changePlaylistJoinNotification.success(state, action);
      case types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE:
        return changePlaylistJoinNotification.failure(state, action);
      case types.CHANGE_PLAYLIST_PREFERENCE_REQUEST:
        return changePlaylistPreference.request(state);
      case types.CHANGE_PLAYLIST_PREFERENCE_SUCCESS:
        return changePlaylistPreference.success(state, action);
      case types.CHANGE_PLAYLIST_PREFERENCE_FAILURE:
        return changePlaylistPreference.failure(state, action);
      case types.CHANGE_SESSION_CHAT_NOTIFICATION_REQUEST:
        return changeSessionChatNotification.request(state);
      case types.CHANGE_SESSION_CHAT_NOTIFICATION_SUCCESS:
        return changeSessionChatNotification.success(state, action);
      case types.CHANGE_SESSION_CHAT_NOTIFICATION_FAILURE:
        return changeSessionChatNotification.failure(state, action);
      case types.CHANGE_SESSION_PREFERENCE_REQUEST:
        return changeSessionPreference.request(state);
      case types.CHANGE_SESSION_PREFERENCE_SUCCESS:
        return changeSessionPreference.success(state, action);
      case types.CHANGE_SESSION_PREFERENCE_FAILURE:
        return changeSessionPreference.failure(state, action);
      case types.CHANGE_SESSIONS_NOTIFICATION_REQUEST:
        return changeSessionsNotification.request(state);
      case types.CHANGE_SESSIONS_NOTIFICATION_SUCCESS:
        return changeSessionsNotification.success(state, action);
      case types.CHANGE_SESSIONS_NOTIFICATION_FAILURE:
        return changeSessionsNotification.failure(state, action);
      case types.CHANGE_SOUND_EFFECTS_REQUEST:
        return changeSoundEffects.request(state);
      case types.CHANGE_SOUND_EFFECTS_SUCCESS:
        return changeSoundEffects.success(state, action);
      case types.CHANGE_SOUND_EFFECTS_FAILURE:
        return changeSoundEffects.failure(state, action);
      case types.CHANGE_THEME_COLOR_REQUEST:
        return changeThemeColor.request(state);
      case types.CHANGE_THEME_COLOR_SUCCESS:
        return changeThemeColor.success(state, action);
      case types.CHANGE_THEME_COLOR_FAILURE:
        return changeThemeColor.failure(state, action);
      case types.GET_USER_SETTINGS_REQUEST:
        return getUserSettings.request(state);
      case types.GET_USER_SETTINGS_SUCCESS:
        return getUserSettings.success(state);
      case types.GET_USER_SETTINGS_FAILURE:
        return getUserSettings.failure(state, action);
      case types.INITIALIZE_SPOTIFY_REQUEST:
        return initializeSpotify.request(state);
      case types.INITIALIZE_SPOTIFY_SUCCESS:
        return initializeSpotify.success(state, action);
      case types.INITIALIZE_SPOTIFY_FAILURE:
        return initializeSpotify.failure(state, action);
      default:
        return state;
    }
  }

  return state;
}