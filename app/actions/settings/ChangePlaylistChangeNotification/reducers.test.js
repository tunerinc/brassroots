'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change playlist change notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changePlaylistChangeNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['playlist change']});

    expect(
      reducer(
        {...initialState, failed: ['playlist change']},
        actions.changePlaylistChangeNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['playlist change']});
  });

  it('should handle CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS', () => {
    const playlistChange: boolean = true;

    expect(
      reducer(
        {...initialState, saving: ['playlist change']},
        actions.changePlaylistChangeNotificationSuccess(playlistChange),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, playlistChange}});
  });

  it('should handle CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['playlist change']},
        actions.changePlaylistChangeNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['playlist change']});
  });
});