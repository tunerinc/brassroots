'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change group direct message notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changeGroupDirectMessageNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['group message']})

    expect(
      reducer(
        {...initialState, failed: ['group message']},
        actions.changeGroupDirectMessageNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['group message']})
  });

  it('should handle CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS', () => {
    const groupMessage: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['group message']},
        actions.changeGroupDirectMessageNotificationSuccess(groupMessage),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, groupMessage}});
  });

  it('should handle CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['group message']},
        actions.changeGroupDirectMessageNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['group message']});
  });
});