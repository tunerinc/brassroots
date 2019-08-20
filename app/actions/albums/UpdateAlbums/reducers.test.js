'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/albums';
import * as actions from '../UpdateAlbums';

describe('update albums reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_ALBUMS', () => {
    const updates: State = {refreshing: true};
    const expectedState: State = {...initialState, refreshing: true};
    expect(reducer(initialState, actions.updateAlbums(updates))).toStrictEqual(expectedState);
  });
});