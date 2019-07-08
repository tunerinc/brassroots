'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewPlaylistPhoto
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Sets the photo url for the new playlist being created
 * 
 * @function setNewPlaylistPhoto
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} action.uri  The image uri to set the new playlist's photo
 * 
 * @returns {object}             The state with the newPlaylist updated
 */
export function setNewPlaylistPhoto(
  state: State,
  action: Action,
): State {
  const {newPlaylist} = state;
  const {uri: image} = action;
  const updates: State = newPlaylist && typeof image === 'string'
    ? {
      newPlaylist: updateObject(newPlaylist, {image}),
    }
    : {};

  return updateObject(state, updates);
}