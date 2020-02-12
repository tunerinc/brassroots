'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetFavoriteTrack
 */

import Spotify from 'rn-spotify-sdk';
import addMusicItems from '../../../utils/addMusicItems';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {
  type ThunkAction,
  type Track,
} from '../../../reducers/tracks';
import {type FullTrack} from '../../../utils/spotifyAPI/types';
import {type Album} from '../../../reducers/albums';
import {type Artist} from '../../../reducers/artists';

type Music = {|
  +tracks: {+[id: string]: Track},
  +albums: {+[id: string]: Album},
  +artists: {+[id: string]: Artist},
|};

/**
 * Async function that gets the current user's favorite song from Ultrasound
 * 
 * @async
 * @function getFavoriteTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  favoriteTrackID The track id of the current user's favorite song
 * @param    {string}  userID          The Spotify id of the current user
 *
 * @returns  {Promise}
 * @resolves {object}                  The current user's favorite track from Ultrasound
 * @rejects  {Error}                   The error which caused the get favorite track failure
 */
export function getFavoriteTrack(
  favoriteTrackID: string,
  userID: string,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.request());

    try {
      const track: FullTrack = await Spotify.getTrack(favoriteTrackID, {});
      const music: Music = addMusicItems([track]);
      dispatch(addEntities(music));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}