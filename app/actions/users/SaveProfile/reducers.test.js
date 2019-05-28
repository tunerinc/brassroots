'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/users';
import * as actions from './actions';

type User = {
  +id: string,
  +bio?: string,
  +location?: string,
  +website?: string,
};

describe('save profile reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle SAVE_PROFILE_REQUEST', () => {
    expect(reducer(initialState, actions.saveProfileRequest()))
      .toStrictEqual({...initialState, savingUser: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.saveProfileRequest(),
      ),
    )
      .toStrictEqual({...initialState, savingUser: true});
  });

  it('should handle SAVE_PROFILE_SUCCESS', () => {
    const user: User = {
      id: 'foo',
      bio: 'bar',
      location: 'bar',
      website: 'bar',
    };

    expect(
      reducer(
        {
          ...initialState,
          currentUserID: user.id,
          usersByID: {
            [user.id]: {
              ...user,
              bio: 'foo',
              location: 'foo',
              website: 'foo',
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
        actions.saveProfileSuccess(user),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentUserID: user.id,
          usersByID: {[user.id]: {...user, lastUpdated: initialState.lastUpdated}},
        },
      );
  });

  it('should handle SAVE_PROFILE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, savingUser: true},
        actions.saveProfileFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});