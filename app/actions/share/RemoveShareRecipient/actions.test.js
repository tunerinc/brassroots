'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemoveShareRecipient';
import * as types from '../types';
import {type Action} from '../../../reducers/share';

describe('remove share recipient action creator', () => {
  it('creates action removing a recipient for the current user to share with', () => {
    const recipientID: string = 'foo';
    const expectedAction: Action = {
      type: types.REMOVE_SHARE_RECIPIENT,
      recipientID,
    };
    
    expect(actions.removeShareRecipient(recipientID)).toEqual(expectedAction);
  });
});