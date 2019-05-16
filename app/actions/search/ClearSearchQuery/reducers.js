'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ClearSearchQueryReducers
 */

import updateObject from '../../../utils/updateObject';
import type {State} from '../../../reducers/search';

/**
 * Clears the search query
 * 
 * @function clearSearchQuery
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the search query cleared
 */
export function clearSearchQuery(
  state: State,
): State {
  const updates = typeof state.query === 'string'
    ? {query: ''}
    : {};

  return updateObject(state, updates);
}