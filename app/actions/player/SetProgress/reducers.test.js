'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from '../SetProgress';

describe('set progress reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle SET_PROGRESS', () => {
    const progress: number = 1000;

    expect(reducer(initialState, actions.setProgress(progress)))
      .toStrictEqual({...initialState, progress});
  });
});