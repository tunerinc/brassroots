'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../utils/updateObject';

export type Scene = {
  +children?: ?[],
  +index?: ?number,
};

export type Action = {
  +type?: string,
  +scene?: Scene,
};

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

/**
 * Fix the route index when focusing on a different view
 * 
 * @function fixFocus
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {object} action.scene The route scene the current user is on
 * 
 * @returns {object}              The state with the route scene fixed
 */
function fixFocus(
  state: State,
  action: Action,
): State {
  const {scene} = action;

  return updateObject(state, {
    scene: scene && scene.children && scene.index
      ? scene.children[scene.index]
      : scene,
  });
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case 'focus':
        return fixFocus(state, action);
      default:
        return state;
    }
  }

  return state;
}