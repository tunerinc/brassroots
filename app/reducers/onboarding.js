'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../utils/updateObject';
import * as types from '../actions/onboarding/types';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';

// Case Functions
import * as createProfile from '../actions/onboarding/CreateProfile/reducers';
import {setOnboarding} from '../actions/onboarding/SetOnboarding/reducers';

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type Action = {
  +type?: string,
  +error?: Error,
  +status?: boolean,
};

type State = {
  +onboarding: boolean,
  +creatingUser: boolean,
  +profileCreated: boolean,
  +error: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Action,
  State,
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
export const initialState: State = {
  onboarding: false,
  creatingUser: false,
  profileCreated: false,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.CREATE_PROFILE_REQUEST:
        return createProfile.request(state);
      case types.CREATE_PROFILE_SUCCESS:
        return createProfile.success(state);
      case types.CREATE_PROFILE_FAILURE:
        return createProfile.failure(state, action);
      case types.RESET_ONBOARDING:
        return initialState;
      case types.SET_ONBOARDING:
        return setOnboarding(state, action);
      default:
        return state;
    }
  }

  return state;
}