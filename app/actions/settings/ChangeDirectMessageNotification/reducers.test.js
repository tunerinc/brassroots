'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change direct message notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_DIRECT_MESSAGE_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changeDirectMessageNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['direct message']});

    expect(
      reducer(
        {...initialState, failed: ['direct message']},
        actions.changeDirectMessageNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['direct message']});
  });

  it('should handle CHANGE_DIRECT_MESSAGE_NOTIFICATION_SUCCESS', () => {
    const message: boolean = true;

    expect(
      reducer(
        {...initialState, notify: {message: false, ...initialState.notify}, saving: ['direct message']},
        actions.changeDirectMessageNotificationSuccess(message),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, message}});
  });

  it('should handle CHANGE_DIRECT_MESSAGE_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['direct message']},
        actions.changeDirectMessageNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['direct message']});
  });
});