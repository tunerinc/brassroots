'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

const infoUnsubscribe: () => void = () => {return};

describe('stop session info listener reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle STOP_SESSION_INFO_LISTENER_REQUEST', () => {
    expect(
      reducer(
        {...initialState, infoUnsubscribe},
        actions.stopSessionInfoListenerRequest(),
      ),
    )
      .toStrictEqual({...initialState, infoUnsubscribe});
  });

  it('should handle STOP_SESSION_INFO_LISTENER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, infoUnsubscribe},
        actions.stopSessionInfoListenerSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle STOP_SESSION_INFO_LISTENER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, infoUnsubscribe},
        actions.stopSessionInfoListenerFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, infoUnsubscribe});
  });
});