'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change message preference reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_MESSAGE_PREFERENCE_REQUEST', () => {
    expect(reducer(initialState, actions.changeMessagePreferenceRequest()))
      .toStrictEqual({...initialState, saving: ['message pref']});

    expect(
      reducer(
        {...initialState, failed: ['message pref']},
        actions.changeMessagePreferenceRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['message pref']});
  });

  it('should handle CHANGE_MESSAGE_PREFERENCE_SUCCESS', () => {
    const message: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['message pref']},
        actions.changeMessagePreferenceSuccess(message),
      ),
    )
      .toStrictEqual({...initialState, preference: {...initialState.preference, message}});
  });

  it('should handle CHANGE_MESSAGE_PREFERENCE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['message pref']},
        actions.changeMessagePreferenceFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['message pref']});
  });
});