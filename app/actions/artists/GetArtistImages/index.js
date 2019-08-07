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
import {
  type ThunkAction,
  type Artist,
} from '../../../reducers/artists';

type Artists = {+[id: string]: Artist};

/**
 * 
 */
export function getArtistImages(
  artistIDs: Array<string>,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.getArtistImagesRequest());

    try {
      const {artists} = await Spotify.getArtists(artistIDs);
      const artistsToAdd: Artists = artists.reduce((artistList, {id, images}) => {
        const large: string = Array.isArray(images) && images.length ? images[0].url : '';
        const medium: string = Array.isArray(images) && images.length === 3 ? images[1].url : large;
        const small: string = Array.isArray(images) && images.length === 3 ? images[2].url : large;
        return updateObject(artistList, {[id]: {small, medium, large}});
      }, {});

      dispatch(actions.getArtistImagesSuccess());
    } catch (err) {
      dispatch(actions.getArtistImagesFailure(err));
    }
  };
}