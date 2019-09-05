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

describe('delete queue track reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles DELETE_QUEUE_TRACK_REQUEST', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const state: State = {...initialState, failed: [queueIDOne], error: new Error('error')};
    const stateTwo: State = {...initialState, deleting: [queueIDOne]};
    const newState: State = {...initialState, deleting: [queueIDOne]};
    const newStateTwo: State = {...initialState, deleting: [queueIDTwo], failed: [queueIDOne]};
    const newStateThree: State = {...initialState, deleting: [queueIDOne, queueIDTwo]};
    expect(reducer(initialState, actions.request(queueIDOne))).toStrictEqual(newState);
    expect(reducer(state, actions.request(queueIDOne))).toStrictEqual(newState);
    expect(reducer(state, actions.request(queueIDTwo))).toStrictEqual(newStateTwo);
    expect(reducer(stateTwo, actions.request(queueIDTwo))).toStrictEqual(newStateThree);
  });

  it('handles DELETE_QUEUE_TRACK_SUCCESS', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const state: State = {...initialState, deleting: [queueIDOne]};
    const stateTwo: State = {...initialState, deleting: [queueIDOne, queueIDTwo]};
    const newState: State = {...initialState, deleting: [queueIDOne]};
    expect(reducer(state, actions.success(queueIDOne))).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success(queueIDTwo))).toStrictEqual(newState);
  });

  it('handles DELETE_QUEUE_TRACK_FAILURE', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const state: State = {...initialState, deleting: [queueIDOne]};
    const stateTwo: State = {...initialState, deleting: [queueIDOne, queueIDTwo]};
    const stateThree: State = {...initialState, deleting: [queueIDOne], failed: [queueIDTwo]};
    const error: Error = new Error('error');
    const newState: State = {...initialState, error, failed: [queueIDOne]};
    const newStateTwo: State = {...initialState, error, deleting: [queueIDOne], failed: [queueIDTwo]};
    const newStateThree: State = {...initialState, error, failed: [queueIDTwo, queueIDOne]};
    expect(reducer(state,actions.failure(queueIDOne, error)),).toStrictEqual(newState);
    expect(reducer(stateTwo,actions.failure(queueIDTwo, error)),).toStrictEqual(newStateTwo);
    expect(reducer(stateThree,actions.failure(queueIDOne, error)),).toStrictEqual(newStateThree);
  });
});