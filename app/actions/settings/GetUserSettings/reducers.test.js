'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('get user settings reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_USER_SETTINGS_REQUEST', () => {
    expect(reducer(initialState, actions.getUserSettingsRequest()))
      .toStrictEqual({...initialState, fetchingSettings: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getUserSettingsRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingSettings: true});
  });

  it('should handle GET_USER_SETTINGS_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, fetchingSettings: true},
        actions.getUserSettingsSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle GET_USER_SETTINGS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingSettings: true},
        actions.getUserSettingsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});