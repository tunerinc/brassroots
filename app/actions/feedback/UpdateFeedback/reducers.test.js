'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/feedback';
import * as actions from '../UpdateFeedback';

describe('update feedback reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_FEEDBACK', () => {
    const updates: State = {sending: true};
    const expectedState: State = {...initialState, sending: true};
    expect(reducer(initialState, actions.updateFeedback(updates))).toStrictEqual(expectedState);
  });
});