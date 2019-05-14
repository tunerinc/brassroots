'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetReportMessage';
import * as types from '../types';
import type {Action} from '../../../reducers/feedback';

describe('set report message action creator', () => {
  it('creates action setting the message for the report from the current user', () => {
    const message: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_REPORT_MESSAGE,
      message,
    };
    
    expect(actions.setReportMessage(message)).toEqual(expectedAction);
  });
});