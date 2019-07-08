'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/feedback';
import * as actions from '../SetReportMessage';

describe('set report message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_REPORT_MESSAGE', () => {
    const message: string = 'foo';

    expect(reducer(initialState, actions.setReportMessage(message)))
      .toEqual(
        {
          ...initialState,
          message,
        }
      );
  });
});