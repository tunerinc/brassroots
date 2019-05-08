'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change nearby session notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changeNearbySessionNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['nearby session']});

    expect(
      reducer(
        {...initialState, failed: ['nearby session']},
        actions.changeNearbySessionNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['nearby session']});
  });

  it('should handle CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS', () => {
    const nearbySession: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['nearby session']},
        actions.changeNearbySessionNotificationSuccess(nearbySession),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, nearbySession}});
  });

  it('should handle CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['nearby session']},
        actions.changeNearbySessionNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['nearby session']});
  });
});