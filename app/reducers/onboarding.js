'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../utils/updateObject';
import * as types from '../actions/onboarding/types';
import {type Action as EntitiesAction} from './entities';
import {type Action as UserAction} from './users';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';

type DispatchAction = Action | UserAction | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<DispatchAction>) => any;

type Action = {
  +type?: string,
  +error?: Error,
  +status?: boolean,
  +updates?: State | {currentUserID: string},
};

type State = {
  +onboarding?: boolean,
  +creating?: boolean,
  +created?: boolean,
  +error?: ?Error | SpotifyError,
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
 * @property {boolean} onboarding=false Whether the current user is onboarding
 * @property {boolean} creating=false   Whether the current user is creating their profile
 * @property {boolean} created=false    Whether the current user's profile was created
 * @property {Error}   error=null       The error related to onboarding actions
 */
export const initialState: State = {
  onboarding: false,
  creating: false,
  created: false,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.CREATE_PROFILE_REQUEST:
        return updateObject(state, {creating: true, error: null});
      case types.CREATE_PROFILE_SUCCESS:
        return updateObject(state, {creating: false, created: true, error: null});
      case types.CREATE_PROFILE_FAILURE:
        return updateObject(state, {error: action.error, creating: false});
      case types.RESET_ONBOARDING:
        return initialState;
      case types.UPDATE_ONBOARDING:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}