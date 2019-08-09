'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/users';
import * as actions from './actions';

describe('change profile photo reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_COVER_PHOTO_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, changingImage: 'profile'};
    expect(reducer(initialState, actions.changeProfilePhotoRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.changeProfilePhotoRequest())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_COVER_PHOTO_SUCCESS', () => {
    const state: State = {...initialState, changingImage: 'profile'};
    expect(reducer(state, actions.changeProfilePhotoSuccess())).toStrictEqual(initialState);
  });

  it('handles CHANGE_COVER_PHOTO_FAILURE', () => {
    const state: State = {...initialState, changingImage: 'profile'};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.changeProfilePhotoFailure(error))).toStrictEqual(expectedState);
  });
});