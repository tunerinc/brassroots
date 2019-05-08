'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change new follower notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_NEW_FOLLOWER_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changeNewFollowerNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['new follower']});

    expect(
      reducer(
        {...initialState, failed: ['new follower']},
        actions.changeNewFollowerNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['new follower']});
  });

  it('should handle CHANGE_NEW_FOLLOWER_NOTIFICATION_SUCCESS', () => {
    const newFollower: boolean = false;

    expect(
      reducer(
        {...initialState, saving: ['new follower']},
        actions.changeNewFollowerNotificationSuccess(newFollower),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, newFollower}});
  });

  it('should handle CHANGE_NEW_FOLLOWER_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['new follower']},
        actions.changeNewFollowerNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['new follower']});
  });
});