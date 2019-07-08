'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylists
 */

import getUserPlaylists from '../../../utils/spotifyAPI/getUserPlaylists';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addPlaylists} from '../AddPlaylists';
import {addPeople} from '../../users/AddPeople';
import {
  type ThunkAction,
  type Playlist,
} from '../../../reducers/playlists';

type Users = {
  +[id: string]: {|
    +id: string,
    +displayName: string,
  |},
};

type Playlists = {
  +[id: string]: Playlist,
};

type Options = {|
  +limit: number,
  +offset: number,
|};

/**
 * Async function that fetches the user's playlists from Spotify
 * 
 * @async
 * @function getPlaylists
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  spotifyUserID         The Spotify id of the current user
 * @param    {boolean} [refreshing=false]    Whether the current user is refreshing their saved playlists
 * @param    {number}  [existingPlaylists=0] The number of existing playlists that have been retrieved already
 *
 * @returns  {Promise}
 * @resolves {object}                        The playlists the current user has saved
 * @rejects  {Error}                         The error which caused the get playlists failure
 */

export function getPlaylists(
  spotifyUserID: string,
  refreshing?: boolean = false,
  existingPlaylists?: number = 0,
): ThunkAction {
  const options: Options = {
    limit: 20,
    offset: existingPlaylists,
  };

  return async dispatch => {
    dispatch(actions.getPlaylistsRequest(refreshing));

    try {
      const {items} = await getUserPlaylists(spotifyUserID, options);
      const playlistsFromSpotify: Playlists = items.reduce((obj, playlist) => {
        const large: string = playlist.images.length ? playlist.images[0].url : '';
        const medium: string = playlist.images.length === 3 ? playlist.images[1].url : large;
        const small: string = playlist.images.length === 3 ? playlist.images[2].url : large;

        return updateObject(obj, {
          [playlist.id]: {
            small,
            medium,
            large,
            id: playlist.id,
            name: playlist.name,
            ownerID: playlist.owner.id,
            ownerType: playlist.owner.type,
            public: playlist.public,
            total: playlist.tracks.total,
          },
        });
      }, {});

      const users: Users = items.reduce((obj, playlist) => {
        return updateObject(obj, {
          [playlist.owner.id]: {
            id: playlist.owner.id,
            displayName: playlist.owner.display_name,
          },
        });
      }, {});

      dispatch(addPeople(users));
      dispatch(addPlaylists(playlistsFromSpotify));
      dispatch(actions.getPlaylistsSuccess(items.map(p => p.id)));
    } catch (err) {
      dispatch(actions.getPlaylistsFailure(err));
    }
  };
}