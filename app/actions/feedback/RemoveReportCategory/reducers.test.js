'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/feedback';
import * as actions from '../RemoveReportCategory';

describe('remove report category reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REMOVE_REPORT_CATEGORY', () => {
    const categoryOne: string = 'foo';
    const categoryTwo: string = 'bar';

    expect(
      reducer(
        {
          ...initialState,
          types: [categoryOne, categoryTwo],
        },
        actions.removeReportCategory(categoryOne)
      )
    )
      .toEqual(
        {
          ...initialState,
          types: [categoryTwo],
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          types: [categoryTwo],
        },
        actions.removeReportCategory(categoryTwo)
      )
    )
      .toEqual(initialState);
  });
});