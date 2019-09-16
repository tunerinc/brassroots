'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetOnboarding
 */

import * as types from '../types';
import {type Action} from '../../../reducers/onboarding';

/**
 * Resets the redux onboarding state object
 * 
 * @alias module:ResetOnboarding
 * @function resetOnboarding
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @function resetOnboarding
 * 
 * @returns {object} Redux action with the type of RESET_ONBOARDING
 */
export function resetOnboarding(): Action {
  return {
    type: types.RESET_ONBOARDING,
  };
}