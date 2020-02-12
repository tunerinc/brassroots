'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/queue';
import * as actions from '../UpdateQueue';

describe('update queue reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_CONVERSATIONS', () => {
    const updates: State = {context: {position: 1}};
    const context = {...initialState.context, position: 1};
    const expectedState: State = {...initialState, context};
    expect(reducer(initialState, actions.updateQueue(updates))).toStrictEqual(expectedState);
  });
});