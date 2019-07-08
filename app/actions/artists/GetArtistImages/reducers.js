'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistImagesReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleArtist,
  type Action,
  type State,
  type Artist,
} from '../../../reducers/artists';

/**
 * Adds the different sized images for an artist
 * 
 * @alias GetArtistImagesReducers
 * @function addImages
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                   The Redux state for a single artist
 * @param   {object} action                  The Redux action
 * @param   {string} action.type             The type of Redux action
 * @param   {object} action.artists          The images of the artists to add
 * @param   {string} action.artists[].small  120x120 size image of the artist, if available
 * @param   {string} action.artists[].medium 320x320 size image of the artist, if available
 * @param   {string} action.artists[].large  640x640 size image of the artist, if available
 * @param   {string} action.artistID         The Spotify id of the artist to add images for individually
 * 
 * @returns {object}                         The state of the single artist updated with the images
 */
export function addImages(
  state: Artist,
  action: Action,
) {
  const {artistID, artists} = action;
  const updates: Artist = (
    typeof artists === 'object'
    && typeof artistID === 'string'
    && !Array.isArray(artists)
  )
    ? {...artists[artistID]}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to fetch images of artists from Spotify
 * 
 * @alias GetArtistImagesReducers
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingImages prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingImages: true, error: null});
}

/**
 * Confirms the success of fetching the images of the artists
 * 
 * @alias GetArtistImagesReducers
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                   The Redux state
 * @param   {object} action                  The Redux action
 * @param   {string} action.type             The type of Redux action
 * @param   {object} action.artists          The images of the artists to add
 * @param   {string} action.artists[].small  64x64 size image of the artist, if available
 * @param   {string} action.artists[].medium 300x300 size image of the artist, if available
 * @param   {string} action.artists[].large  640x640 size image of the artist, if available
 * 
 * @returns {object}                         The state with the images added for the artists
 */
export function success(
  state: State,
  action: Action,
): State {
  const {artists} = action;

  let {artistsByID} = state;

  if (typeof artists === 'object' && !Array.isArray(artists)) {
    Object.keys(artists).forEach(artistID => {
      if (typeof artistsByID === 'object' && artistsByID[artistID]) {
        const updatedArtist: Artist = singleArtist(artistsByID[artistID], {
          ...action,
          artistID,
        });
  
        artistsByID = updateObject(artistsByID, {[artistID]: updatedArtist});
      }
    });
  }

  return updateObject(state, {artistsByID, fetchingImages: false, error: null});
}

/**
 * Adds the error which caused the get artist images failure
 * 
 * @alias GetArtistImagesReducers
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get artist images failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingImages: false});
}