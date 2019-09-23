'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistImages
 */

import Spotify from 'rn-spotify-sdk';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {
  type ThunkAction,
  type Artist,
} from '../../../reducers/artists';

/**
 * 
 */
export function getArtistImages(
  artistIDs: Array<string>,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.request());

    try {
      const {artists: artistsToAdd} = await Spotify.getArtists(artistIDs);
      const artists = artistsToAdd.reduce((artistList, {id, images}) => {
        const large: string = Array.isArray(images) && images.length ? images[0].url : '';
        const medium: string = Array.isArray(images) && images.length === 3 ? images[1].url : large;
        const small: string = Array.isArray(images) && images.length === 3 ? images[2].url : large;
        return updateObject(artistList, {[id]: {id, small, medium, large}});
      }, {});

      dispatch(addEntities({artists}));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}