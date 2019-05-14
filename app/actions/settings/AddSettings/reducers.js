'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddSettingsReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Notify, Preference, Settings, Action, State} from '../../../reducers/settings';

/**
 * Adds the settings of the current user retrieved from Firestore
 * 
 * @function addSettings
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state                                         The Redux state
 * @param   {object}  action                                        The Redux action
 * @param   {string}  action.type                                   The type of Redux action
 * @param   {object}  action.settings                               The current user's settings object
 * @param   {string}  action.settings.version                       The current version of the Brassroots app
 * @param   {boolean} action.settings.soundEffects=true             Whether the current user has sound effects enabled
 * @param   {string}  action.settings.theme=dark                    The selected theme color by the current user
 * @param   {string}  action.settings.language=english              The language the current user has set for the app
 * @param   {string}  action.settings.region=us                     The region the current user is in
 * @param   {object}  action.settings.notify                        The notification settings for the current user
 * @param   {string}  action.settings.notify.session=following      The notification status for live sessions
 * @param   {string}  action.settings.notify.chat=mentions          The notification status for a session's chat
 * @param   {boolean} action.settings.notify.message=true           The notification status for direct messages
 * @param   {string}  action.settings.notify.groupMessage=all       The notification status for group direct messages
 * @param   {string}  action.settings.notify.nearbySession=all      The notifcatio status for nearby sessions to the current user
 * @param   {boolean} action.settings.notify.playlistChange=true    The notification status for changes made on the current user's playlists
 * @param   {boolean} action.settings.notify.playlistJoin=true      The notification status for joins on the current user's playlists
 * @param   {boolean} action.settings.notify.likedTrack=true        The notification status for likes on the current user's queued track
 * @param   {boolean} action.settings.notify.newFollower=true       The notification status for new followers of the current user
 * @param   {object}  action.settings.preference                    The preferences for the current user
 * @param   {string}  action.settings.preference.playlist=limitless The mode preference to create new playlists in
 * @param   {string}  action.settings.preference.session=radio      The mode preference to create new sessions in
 * @param   {string}  action.settings.preference.message=anyone     The message preference as to who can send you direct messages
 * @param   {boolean} action.settings.preference.muteNearby=true    The preference status to mute sessions you are nearby to
 * 
 * @returns {object}                                                The state with the updated settings retrieved from Firestore
 */
export function addSettings(
  state: State,
  action: Action,
): State {
  const {settings} = action;
  const updates: {} = typeof settings === 'object'
    ? {
      ...settings,
      notify: updateObject(state.notify, settings.notify),
      preference: updateObject(state.preference, settings.preference),
    }
    : {};
  
  return updateObject(state, updates);
}