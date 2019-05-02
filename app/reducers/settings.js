'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/settings/types';
import type {SpotifyError} from '../utils/spotifyAPI/types';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type State = {
  +lastUpdated: string,
  +version: string,
  +initializing: boolean,
  +loggingIn: boolean,
  +loggedIn: boolean,
  +loggingOut: boolean,
  +soundEffects: boolean,
  +theme: string,
  +language: string,
  +region: string,
  +saving: Array<string>,
  +failed: Array<string>,
  +fetchingSettings: boolean,
  +error: ?Error | SpotifyError,
  +notify: {
    +session: string,
    +chat: string,
    +message: boolean,
    +groupMessage: string,
    +nearbySession: string,
    +playlistChange: boolean,
    +playlistJoin: boolean,
    +likedTrack: boolean,
    +newFollower: boolean,
  },
  +preference: {
    +playlist: string,
    +session: string,
    +message: string,
    +muteNearby: boolean,
  },
};

/**
 * @constant
 * @alias settingsState
 * @type {object}
 * 
 * @property {string}   lastUpdated                   The date/time the settings were last updated
 * @property {string}   version                       The current version of the Brassroots app
 * @property {boolean}  initializing=false            Whether the Spotify module is initializing
 * @property {boolean}  loggingIn=false               Whether the current user is logging in
 * @property {boolean}  loggedIn=false                Whether the current user is logged in
 * @property {boolean}  loggingOUt=false              Whether the current user is logging out
 * @property {boolean}  soundEffects=true             Whether the current user has sound effects enabled
 * @property {string}   theme=dark                    The selected theme color by the current user
 * @property {string}   language=english              The language the current user has set for the app
 * @property {string}   region=us                     The region the current user is in
 * @property {string[]} saving                        The settings which are being saved
 * @property {string[]} failed                        The settings which failed to change
 * @property {boolean}  fetchingSettings=false        Whether the current user is fetching settings
 * @property {Error}    error=null                    The error related to settings actions
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
  soundEffects: true,
  theme: 'dark',
  language: 'english',
  region: 'us',
  saving: [],
  failed: [],
  fetchingSettings: false,
  error: null,
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
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}