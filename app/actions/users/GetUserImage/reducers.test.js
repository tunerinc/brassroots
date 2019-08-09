'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/users';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('get user image reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_USER_IMAGE_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingImages: true};
    expect(reducer(initialState, actions.getUserImageRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getUserImageRequest())).toStrictEqual(expectedState);
  });

  it('handles GET_USER_IMAGE_SUCCESS', () => {
    const state: State = {...initialState, fetchingImages: true};
    expect(reducer(state, actions.getUserImageSuccess())).toStrictEqual(initialState);
  });

  it('handles GET_USER_IMAGE_FAILURE', () => {
    const state: State = {...initialState, fetchingImages: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getUserImageFailure(error))).toStrictEqual(expectedState);
  });
});