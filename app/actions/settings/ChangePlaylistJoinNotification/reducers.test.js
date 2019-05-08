'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change playlist join notification reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST', () => {
    expect(reducer(initialState, actions.changePlaylistJoinNotificationRequest()))
      .toStrictEqual({...initialState, saving: ['playlist join']});

    expect(
      reducer(
        {...initialState, failed: ['playlist join']},
        actions.changePlaylistJoinNotificationRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['playlist join']});
  });

  it('should handle CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS', () => {
    const playlistJoin: boolean = false;

    expect(
      reducer(
        {...initialState, saving: ['playlist join']},
        actions.changePlaylistJoinNotificationSuccess(playlistJoin),
      ),
    )
      .toStrictEqual({...initialState, notify: {...initialState.notify, playlistJoin}});
  });

  it('should handle CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['playlist join']},
        actions.changePlaylistJoinNotificationFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['playlist join']});
  });
});