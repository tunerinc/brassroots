'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTracks
 */

import getMySavedTracks from "../../../utils/spotifyAPI/getMySavedTracks";
import addMusicItems from '../../../utils/addMusicItems';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../AddTracks';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/tracks';

/**
 * Async function that fetches the user's tracks from Spotify
 * 
 * @async
 * @function getTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {boolean}  [refreshing=false] Whether the current user is refreshing the tracks
 * @param    {number}   [existingTracks=0] The current number of existing tracks that have been retrieved
 *
 * @returns  {Promise}
 * @resolves {object}                      The current user's saved tracks
 * @rejects  {Error}                       The error which caused the get tracks failure
 */
export function getTracks(
  refreshing: boolean = false,
  existingTracks: number = 0,
): ThunkAction {
  const options: {
    limit: number,
    offset: number,
    market: string,
  } = {
    limit: 50,
    offset: existingTracks,
    market: 'US',
  };

  return async dispatch => {
    dispatch(actions.getTracksRequest(refreshing));

    try {
      const {items, total} = await getMySavedTracks(options);
      const music = addMusicItems(items);
      const tracks: Array<string> = items.map(item => item.track.id)
      dispatch(addArtists(music.artists));
      dispatch(addAlbums(music.albums));
      dispatch(addTracks(music.tracks));
      dispatch(actions.getTracksSuccess(tracks, total));
    } catch (err) {
      dispatch(actions.getTracksFailure(err));
    }
  };
}
