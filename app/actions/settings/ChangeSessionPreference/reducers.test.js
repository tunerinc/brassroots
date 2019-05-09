'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change session preference reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_SESSION_PREFERENCE_REQUEST', () => {
    expect(reducer(initialState, actions.changeSessionPreferenceRequest()))
      .toStrictEqual({...initialState, saving: ['session pref']});

    expect(
      reducer(
        {...initialState, failed: ['session pref']},
        actions.changeSessionPreferenceRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['session pref']});
  });

  it('should handle CHANGE_SESSION_PREFERENCE_SUCCESS', () => {
    const session: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['session pref']},
        actions.changeSessionPreferenceSuccess(session),
      ),
    )
      .toStrictEqual({...initialState, preference: {...initialState.preference, session}});
  });

  it('should handle CHANGE_SESSION_PREFERENCE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['session pref']},
        actions.changeSessionPreferenceFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['session pref']});
  });
});