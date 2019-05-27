'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetFavoriteTrack
 */

import Spotify from 'rn-spotify-sdk';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../AddTracks';
// import {addFavoriteTrack} from '../../users/AddFavoriteTrack';
import addMusicItems from '../../../utils/addMusicItems';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/tracks';
import {type FullTrack} from '../../../utils/spotifyAPI/types';

/**
 * Async function that gets the current user's favorite song from Ultrasound
 * 
 * @async
 * @function getFavoriteTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  trackID The track id of the current user's favorite song
 *
 * @returns  {Promise}
 * @resolves {object}          The current user's favorite track from Ultrasound
 * @rejects  {Error}           The error which caused the get favorite track failure
 */
export function getFavoriteTrack(
  trackID: string,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.getFavoriteTrackRequest());

    try {
      const track: FullTrack = await Spotify.getTrack(trackID, {});
      const music = addMusicItems([track]);
      
      dispatch(addArtists(music.artists));
      dispatch(addAlbums(music.albums));
      dispatch(addTracks(music.tracks));
      // dispatch(addFavoriteTrack(track.id));
      dispatch(actions.getFavoriteTrackSuccess());
    } catch (err) {
      dispatch(actions.getFavoriteTrackFailure(err));
    }
  };
}