'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/legal';
import * as actions from './actions';

describe('get policy reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_POLICY_REQUEST', () => {
    const refreshingPrivacy: boolean = true;

    expect(reducer(initialState, actions.getPolicyRequest(!refreshingPrivacy)))
      .toStrictEqual({...initialState, privacy: {...initialState.privacy, fetchingPrivacy: true}});

    expect(reducer(initialState, actions.getPolicyRequest(refreshingPrivacy)))
      .toStrictEqual(
        {
          ...initialState,
          privacy: {...initialState.privacy, refreshingPrivacy, fetchingPrivacy: true},
        },
      );

    expect(
      reducer(
        {...initialState, privacy: {...initialState.privacy, error: new Error('error')}},
        actions.getPolicyRequest(!refreshingPrivacy),
      ),
    )
      .toStrictEqual({...initialState, privacy: {...initialState.privacy, fetchingPrivacy: true}});

    expect(
      reducer(
        {...initialState, privacy: {...initialState.privacy, error: new Error('error')}},
        actions.getPolicyRequest(refreshingPrivacy),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          privacy: {...initialState.privacy, refreshingPrivacy, fetchingPrivacy: true},
        },
      );
  });

  it('should handle GET_POLICY_SUCCESS', () => {
    const text: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          privacy: {...initialState.privacy, refreshingPrivacy: true, fetchingPrivacy: true},
        },
        actions.getPolicySuccess(text),
      ),
    )
      .toStrictEqual({...initialState, privacy: {...initialState.privacy, text}});
  });

  it('should handle GET_POLICY_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {
          ...initialState,
          privacy: {...initialState.privacy, refreshingPrivacy: true, fetchingPrivacy: true},
        },
        actions.getPolicyFailure(error),
      ),
    )
      .toStrictEqual({...initialState, privacy: {...initialState.privacy, error}});
  });
});