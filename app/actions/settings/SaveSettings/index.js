'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveSettings
 */

import {Actions, ActionConst} from 'react-native-router-flux';
import {updateSettings} from '../UpdateSettings';
import * as actions from './actions';
import {
  type ThunkAction,
  type State,
} from '../../../reducers/settings';
import {
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that saves the settings for the current user
 * 
 * @async
 * @function saveSettings
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  settings                         The settings to update for the current user
 * @param   {string}  settings.id                      The Spotify id of the current user
 * @param   {string}  [settings.language]              The language the current user wants to set
 * @param   {string}  [settings.region]                The region the current user is located in
 * @param   {boolean} [settings.soundEffects]          Whether the current user wants sound effects
 * @param   {string}  [settings.theme]                 The theme the current user wants to set
 * @param   {object}  [settings.notify]                The notification settings for the current user
 * @param   {string}  [settings.notify.session]        Whether the current user wants to be notified of a session
 * @param   {string}  [settings.notify.chat]           Whether the current user wants to be notified of a chat message
 * @param   {boolean} [settings.notify.message]        Whether the current user wants to be notified of a direct message
 * @param   {string}  [settings.notify.groupMessage]   Whether the current user wants to be notified of group messages
 * @param   {string}  [settings.notify.nearbySession]  Whether the current user wants to be notified of a nearby session
 * @param   {boolean} [settings.notify.playlistChange] Whether the current user wants to be notified of a change in their playlist
 * @param   {boolean} [settings.notify.playlistJoin]   Whether the current user wants to be notified of someone joining their playlist
 * @param   {boolean} [settings.notify.likedTrack]     Whether the current user wants to be notified of a liked track
 * @param   {boolean} [settings.notify.newFollower]    Whether the current user wants to be notified of a new follower
 * @param   {object}  [settings.preference]            The preferences for the current user to save
 * @param   {string}  [settings.preference.playlist]   The mode to create a playlist in
 * @param   {string}  [settings.preference.session]    The mode to start a session in
 * @param   {string}  [settings.preference.message]    The preference for receiving messages
 * @param   {boolean} [settings.preference.muteNearby] Whether the current user wants to mute nearby sessions they join
 * 
 * @returns  {Promise}
 * @resolves {object}                                  The settings object that was saved for the current user
 * @rejects  {Error}                                   The error which caused the save settings failure
 */
export function saveSettings(
  settings: State,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      dispatch(updateSettings(settings));
      dispatch(actions.success());
      await settingsRef.doc(settings.id).update({...settings});
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}