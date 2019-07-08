'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change like track notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changeLikeTrackNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['liked track']});

    expect(
      reducer(
        {...initialState, failed: ['liked track']},
        actions.changeLikeTrackNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['liked track']});
  });

  it('should handle CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS', () => {
    const likedTrack: boolean = false;

    expect(
      reducer(
        {...initialState, saving: ['liked track']},
        actions.changeLikeTrackNotificationSuccess(likedTrack),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, likedTrack}});
  });

  it('should handle CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['liked track']},
        actions.changeLikeTrackNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['liked track']});
  });
});