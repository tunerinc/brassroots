'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewPlaylistPhoto
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Sets the photo uri for the new playlist being created by the current user
 * 
 * @alias module:SetNewPlaylistPhoto
 * @function setNewPlaylistPhoto
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} uri The photo uri to set for the new playlist
 * 
 * @returns {object}     Redux action with the type of SET_NEW_PLAYLIST_PHOTO and the new photo's uri
 */
export function setNewPlaylistPhoto(
  uri: string,
): Action {
  return {
    type: types.SET_NEW_PLAYLIST_PHOTO,
    uri,
  };
}