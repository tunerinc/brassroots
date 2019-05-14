'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddReportCategory';
import * as types from '../types';
import type {Action} from '../../../reducers/feedback';

describe('add report category action creator', () => {
  it('creates action adding a category to the report from the current user', () => {
    const category: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_REPORT_CATEGORY,
      category,
    };
    
    expect(actions.addReportCategory(category)).toEqual(expectedAction);
  });
});