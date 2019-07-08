'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/feedback';
import * as actions from '../AddReportCategory';

describe('add report category reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_REPORT_CATEGORY', () => {
    const categoryOne: string = 'foo';
    const categoryTwo: string = 'bar';

    expect(reducer(initialState, actions.addReportCategory(categoryOne)))
      .toStrictEqual(
        {
          ...initialState,
          types: [categoryOne],
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          types: [categoryOne],
        },
        actions.addReportCategory(categoryTwo)
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          types: [categoryOne, categoryTwo],
        }
      );
  });
});