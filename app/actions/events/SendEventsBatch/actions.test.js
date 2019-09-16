'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/events';

describe('send events batch synchronous action creators', () => {
  it('creates send events batch request action', () => {
    const expectedAction: Action = {
      type: types.SEND_EVENTS_BATCH_REQUEST,
    };

    expect(actions.sendEventsBatchRequest()).toStrictEqual(expectedAction);
  });

  it('creates send events batch success action', () => {
    const expectedAction: Action = {
      type: types.SEND_EVENTS_BATCH_SUCCESS,
    };

    expect(actions.sendEventsBatchSuccess()).toStrictEqual(expectedAction);
  });

  it('creates send events batch failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.SEND_EVENTS_BATCH_FAILURE,
      error,
    };

    expect(actions.sendEventsBatchFailure(error)).toStrictEqual(expectedAction);
  });
});