'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change playlist preference reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_PLAYLIST_PREFERENCE_REQUEST', () => {
    expect(reducer(initialState, actions.changePlaylistPreferenceRequest()))
      .toStrictEqual({...initialState, saving: ['playlist pref']});

    expect(
      reducer(
        {...initialState, failed: ['playlist pref']},
        actions.changePlaylistPreferenceRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['playlist pref']});
  });

  it('should handle CHANGE_PLAYLIST_PREFERENCE_SUCCESS', () => {
    const playlist: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['playlist pref']},
        actions.changePlaylistPreferenceSuccess(playlist),
      ),
    )
      .toStrictEqual({...initialState, preference: {...initialState.preference, playlist}});
  });

  it('should handle CHANGE_PLAYLIST_PREFERENCE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['playlist pref']},
        actions.changePlaylistPreferenceFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['playlist pref']});
  });
});