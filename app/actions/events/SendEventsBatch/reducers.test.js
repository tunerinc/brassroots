'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/events';
import * as actions from './actions';

describe('send events batch reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle SEND_EVENTS_BATCH_REQUEST', () => {
    expect(reducer(initialState, actions.sendEventsBatchRequest()))
      .toStrictEqual({...initialState, uploading: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.sendEventsBatchRequest(),
      ),
    )
      .toStrictEqual({...initialState, uploading: true});
  });

  it('should handle SEND_EVENTS_BATCH_SUCCESS', () => {
    expect(
      reducer(
        {
          ...initialState,
          uploading: true,
          batch: [{id: 'foo'}, {id: 'bar'}],
        },
        actions.sendEventsBatchSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle SEND_EVENTS_BATCH_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, uploading: true},
        actions.sendEventsBatchFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});