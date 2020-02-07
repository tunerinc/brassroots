'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/sessions';
import * as actions from '../UpdateSessions';

describe('update sessions reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_SESSIONS', () => {
    const currentSessionID: string = 'foo';
    const updates: State = {currentSessionID, explore: {trendingIDs: ['foo']}};
    const explore = {...initialState.explore, trendingIDs: ['foo']};
    const expectedState: State = {...initialState, currentSessionID, explore};
    expect(reducer(initialState, actions.updateSessions(updates))).toStrictEqual(expectedState);
  });
});