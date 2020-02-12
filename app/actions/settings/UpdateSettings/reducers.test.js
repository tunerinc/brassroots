'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/settings';
import * as actions from '../UpdateSettings';

describe('update settings reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_ALBUMS', () => {
    const updates: State = {notify: {playlistJoin: false}, preference: {muteNearby: false}};
    const expectedState: State = {
      ...initialState,
      notify: {...initialState.notify, playlistJoin: false},
      preference: {...initialState.preference, muteNearby: false},
    };

    expect(reducer(initialState, actions.updateSettings(updates))).toStrictEqual(expectedState);
  });
});