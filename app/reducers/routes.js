'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../utils/updateObject';

export type State = {
  +scene: {},
};

/**
 * @constant
 * @alias routesState
 * @type {object}
 * 
 * @property {object} scene The current scene based on the route stack
 */
export const initialState: State = {scene: {}};

export default function reducer(
  state: State = initialState,
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}