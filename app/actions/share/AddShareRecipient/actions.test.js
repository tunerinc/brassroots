'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddShareRecipient';
import * as types from '../types';
import {type Action} from '../../../reducers/share';

describe('add share recipient action creator', () => {
  it('creates action adding a recipient for the current user to share with', () => {
    const recipientID: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_SHARE_RECIPIENT,
      recipientID,
    };
    
    expect(actions.addShareRecipient(recipientID)).toEqual(expectedAction);
  });
});