'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/artists';
import * as actions from '../UpdateArtists';

describe('update artists reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_ALBUMS', () => {
    const updates: State = {refreshing: true};
    const expectedState: State = {...initialState, refreshing: true};
    expect(reducer(initialState, actions.updateArtists(updates))).toStrictEqual(expectedState);
  });
});