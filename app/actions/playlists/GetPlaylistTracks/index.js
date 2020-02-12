'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTracks
 */

import getSpotifyPlaylistTracks from '../../../utils/spotifyAPI/getPlaylistTracks';
import addMusicItems from '../../../utils/addMusicItems';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/playlists';

/**
 * Async function that gets tracks from a playlist
 * 
 * @async
 * @function getPlaylistTracks
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  playlistID         The Spotify id of the playlist
 * @param    {boolean} [refreshing=false] Whether the current user is refreshing the playlist tracks
 * @param    {number}  [offset=0]         The total number of existing tracks in the playlist
 * 
 * @returns  {Promise}
 * @resolves {object}                     The tracks retrieved from the Spotify playlist
 * @rejects  {Error}                      The error which caused the get playlist tracks failure
 */
export function getPlaylistTracks(
  playlistID: string,
  refreshing?: boolean = false,
  offset?: number = 0,
): ThunkAction {
  const limit: number = 100;

  return async dispatch => {
    dispatch(actions.request(refreshing));

    try {
      const fields = 'items(added_by(id,type),track(id,name,track_number,duration_ms,album(id,name,images,artists),artists)),total';
      const options = {limit, offset, fields, market: 'US'};
      const res = await getSpotifyPlaylistTracks(playlistID, options);
      const items = res.items.filter(item => !item.is_local && typeof item.track.id === 'string');
      const music = addMusicItems(items);
      const tracks = items.map(i => i.track.id);
      const playlists = {[playlistID]: {id: playlistID, tracks}};
      const playlistTracks = items.reduce((obj, item) => {
        const {added_by, track} = item;
        const playlistTrackID = `${playlistID}-${track.id}`;
        
        return updateObject(obj, {
          [playlistTrackID]: {
            playlistTrackID,
            trackID: track.id,
            userID: added_by.id,
          },
        });
      }, {});

      dispatch(addEntities({...music, playlistTracks, playlists}));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}