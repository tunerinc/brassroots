'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/queue';
import * as actions from './actions';

describe('toggle track like reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles TOGGLE_TRACK_LIKE_REQUEST', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const state: State = {...initialState, failed: [queueIDOne], error: new Error('error')};
    const stateTwo: State = {...initialState, liking: [queueIDOne]};
    const newState: State = {...initialState, liking: [queueIDOne]};
    const newStateTwo: State = {...initialState, liking: [queueIDTwo], failed: [queueIDOne]};
    const newStateThree: State = {...initialState, liking: [queueIDOne, queueIDTwo]};
    expect(reducer(initialState, actions.request(queueIDOne))).toStrictEqual(newState);
    expect(reducer(state, actions.request(queueIDOne))).toStrictEqual(newState);
    expect(reducer(state, actions.request(queueIDTwo))).toStrictEqual(newStateTwo);
    expect(reducer(stateTwo, actions.request(queueIDTwo))).toStrictEqual(newStateThree);
  });

  it('handles TOGGLE_TRACK_LIKE_SUCCESS', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const state: State = {...initialState, liking: [queueIDOne]};
    const stateTwo: State = {...initialState, liking: [queueIDOne, queueIDTwo]};
    expect(reducer(state, actions.success(queueIDOne))).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success(queueIDTwo))).toStrictEqual(state);
  });

  it('handles TOGGLE_TRACK_LIKE_FAILURE', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const state: State = {...initialState, liking: [queueIDOne]};
    const stateTwo: State = {...initialState, liking: [queueIDOne, queueIDTwo]};
    const stateThree: State = {...initialState, liking: [queueIDOne], failed: [queueIDTwo]};
    const error: Error = new Error('error');
    const newState: State = {...initialState, error, failed: [queueIDOne]};
    const newStateTwo: State = {...newState, liking: [queueIDOne], failed: [queueIDTwo]};
    const newStateThree: State = {...newState, failed: [queueIDTwo, queueIDOne]};
    expect(reducer(state, actions.failure(queueIDOne, error))).toStrictEqual(newState);
    expect(reducer(stateTwo, actions.failure(queueIDTwo, error))).toStrictEqual(newStateTwo);
    expect(reducer(stateThree, actions.failure(queueIDOne, error))).toStrictEqual(newStateThree);
  });
});