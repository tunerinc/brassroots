'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemoveReportCategory';
import * as types from '../types';
import type {Action} from '../../../reducers/feedback';

describe('remove report category action creator', () => {
  it('creates action removing a category from the report from the current user', () => {
    const category: string = 'foo';
    const expectedAction: Action = {
      type: types.REMOVE_REPORT_CATEGORY,
      category,
    };
    
    expect(actions.removeReportCategory(category)).toEqual(expectedAction);
  });
});