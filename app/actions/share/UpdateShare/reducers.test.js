'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/share';
import * as actions from '../UpdateShare';

describe('update share reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_SHARE', () => {
    const updates: State = {sharedItem: {id: 'foo', type: 'foo'}};
    const sharedItem = {...initialState.sharedItem, id: 'foo', type: 'foo'};
    const expectedState: State = {...initialState, sharedItem};
    expect(reducer(initialState, actions.updateShare(updates))).toStrictEqual(expectedState);
  });
});