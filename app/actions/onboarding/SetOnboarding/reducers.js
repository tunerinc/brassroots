'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetOnboardingReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/onboarding';

/**
 * Sets the onboarding status for the current user
 * 
 * @function setOnboarding
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state         The Redux state
 * @param   {object}  action        The Redux action
 * @param   {string}  action.type   The type of Redux action
 * @param   {boolean} action.status The onboarding status for the current user
 * 
 * @returns {object}                The state with the onboarding prop updated
 */
export function setOnboarding(
  state: State,
  action: Action,
): State {
  const {status: onboarding} = action;
  const updates = typeof onboarding === 'boolean'
    ? {onboarding}
    : {};

  return updateObject(state, updates);
}