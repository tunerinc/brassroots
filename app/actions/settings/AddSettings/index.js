'use strict';

/**
 * @format
 * @flow
 */

import * as types from '../types';
import type {Settings, Action} from '../../../reducers/settings';

/**
 * @module AddSettings
 */

/**
 * Adds the settings of the current user
 * 
 * @alias module:AddSettings
 * @function addSettings
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param {object}  settings                               The current user's settings object retrieved from Firestore
 * @param {string}  settings.version                       The current version of the Brassroots app
 * @param {boolean} settings.soundEffects=true             Whether the current user has sound effects enabled
 * @param {string}  settings.theme=dark                    The selected theme color by the current user
 * @param {string}  settings.language=english              The language the current user has set for the app
 * @param {string}  settings.region=us                     The region the current user is in
 * @param {object}  settings.notify                        The notification settings for the current user
 * @param {string}  settings.notify.session=following      The notification status for live sessions
 * @param {string}  settings.notify.chat=mentions          The notification status for a session's chat
 * @param {boolean} settings.notify.message=true           The notification status for direct messages
 * @param {string}  settings.notify.groupMessage=all       The notification status for group direct messages
 * @param {string}  settings.notify.nearbySession=all      The notifcatio status for nearby sessions to the current user
 * @param {boolean} settings.notify.playlistChange=true    The notification status for changes made on the current user's playlists
 * @param {boolean} settings.notify.playlistJoin=true      The notification status for joins on the current user's playlists
 * @param {boolean} settings.notify.likedTrack=true        The notification status for likes on the current user's queued track
 * @param {boolean} settings.notify.newFollower=true       The notification status for new followers of the current user
 * @param {object}  settings.preference                    The preferences for the current user
 * @param {string}  settings.preference.playlist=limitless The mode preference to create new playlists in
 * @param {string}  settings.preference.session=radio      The mode preference to create new sessions in
 * @param {string}  settings.preference.message=anyone     The message preference as to who can send you direct messages
 * @param {boolean} settings.preference.muteNearby=true    The preference status to mute sessions you are nearby to
 * 
 * @returns {object}                                       Redux action with the type of ADD_SETTINGS and the current user's settings object
 */
export function addSettings(
  settings: Settings,
): Action {
  return {
    type: types.ADD_SETTINGS,
    settings,
  };
}