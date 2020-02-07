'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/tracks';
import * as actions from '../UpdateTracks';

describe('update tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_ALBUMS', () => {
    const updates: State = {refreshing: true};
    const expectedState: State = {...initialState, refreshing: true};
    expect(reducer(initialState, actions.updateTracks(updates))).toStrictEqual(expectedState);
  });
});