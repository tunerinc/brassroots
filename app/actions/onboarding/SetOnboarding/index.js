'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetOnboarding
 */

import * as types from '../types';
import {type Action} from '../../../reducers/onboarding';

/**
 * Sets the onboarding status for the current user
 * 
 * @alias module:SetOnboarding
 * @function setOnboarding
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} status The new onboarding status for the current user
 * 
 * @returns {object}         Redux action with the type of SET_ONBOARDING and the new onboarding status
 */
export function setOnboarding(
  status: boolean,
): Action {
  return {
    type: types.SET_ONBOARDING,
    status,
  };
}
