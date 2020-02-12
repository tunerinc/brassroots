'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/groups';
import * as actions from '../UpdateGroups';

describe('update groups reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_GROUPS', () => {
    const updates: State = {newGroup: {website: 'foo', members: ['foo']}};
    const newGroup = {...initialState.newGroup, website: 'foo', members: ['foo']};
    const expectedState: State = {...initialState, newGroup};
    expect(reducer(initialState, actions.updateGroups(updates))).toStrictEqual(expectedState);
  });
});