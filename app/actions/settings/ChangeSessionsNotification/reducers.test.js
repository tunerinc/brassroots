'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change sessions notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_SESSIONS_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changeSessionsNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['sessions']});

    expect(
      reducer(
        {...initialState, failed: ['sessions']},
        actions.changeSessionsNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['sessions']});
  });

  it('should handle CHANGE_SESSIONS_NOTIFICATION_SUCCESS', () => {
    const session: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['sessions']},
        actions.changeSessionsNotificationSuccess(session),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, session}});
  });

  it('should handle CHANGE_SESSIONS_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['sessions']},
        actions.changeSessionsNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['sessions']});
  });
});