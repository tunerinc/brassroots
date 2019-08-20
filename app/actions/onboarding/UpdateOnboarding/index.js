'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateOnboarding
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/onboarding';

/**
 * Updates any of the values in the onboarding state
 * 
 * @function updateOnboarding
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the onboarding state
 * 
 * @returns {object}         Redux action with the type of UPDATE_ONBOARDING and the updates to make
 */
export function updateOnboarding(
  updates: State,
): Action {
  return {
    type: types.UPDATE_ONBOARDING,
    updates,
  };
}