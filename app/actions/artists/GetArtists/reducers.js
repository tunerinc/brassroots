'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type State,
  type Action,
} from '../../../reducers/artists';

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function request(
  state: State,
  action: Action,
): State {
  const {refreshing: refreshingArtists} = action;
  const updates = typeof refreshingArtists === 'boolean'
    ? {
      refreshingArtists,
      fetchingArtists: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function success(
  state: State,
  action: Action,
): State {
  const {artists: userArtists} = action;
  const updates = Array.isArray(userArtists)
    ? {
      lastUpdated,
      userArtists,
      refreshingArtists: false,
      fetchingArtists: false,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingArtists: false, refreshingArtists: false});
}