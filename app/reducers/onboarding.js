'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../utils/updateObject';
import * as types from '../actions/onboarding/types';
import type {SpotifyError} from '../utils/spotifyAPI/types';

export type State = {
  +onboarding: boolean,
  +creatingUser: boolean,
  +profileCreated: boolean,
  +error: ?Error | SpotifyError,
};

/**
 * @constant
 * @alias onboardingState
 * @type {object}
 * 
 * @property {boolean} onboarding=false       Whether the current user is onboarding
 * @property {boolean} creatingUser=false     Whether the current user is creating their profile
 * @property {boolean} profileCreated=false   Whether the current user's profile was created
 * @property {Error}   error=null             The error related to onboarding actions
 */
export const initialState = {
  onboarding: false,
  creatingUser: false,
  profileCreated: false,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}