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

describe('change cover photo reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_COVER_PHOTO_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, changingImage: 'cover'};
    expect(reducer(initialState, actions.changeCoverPhotoRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.changeCoverPhotoRequest())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_COVER_PHOTO_SUCCESS', () => {
    const state: State = {...initialState, changingImage: 'cover'};
    expect(reducer(state, actions.changeCoverPhotoSuccess())).toStrictEqual(initialState);
  });

  it('handles CHANGE_COVER_PHOTO_FAILURE', () => {
    const state: State = {...initialState, changingImage: 'cover'};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.changeCoverPhotoFailure(error))).toStrictEqual(expectedState);
  });
});