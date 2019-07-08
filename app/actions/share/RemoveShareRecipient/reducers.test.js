'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/share';
import * as actions from '../RemoveShareRecipient';
import * as types from '../types';

describe('remove share recipient reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REMOVE_SHARE_RECIPIENT', () => {
    const recipientIDOne: string = 'foo';
    const recipientIDTwo: string = 'bar';

    expect(
      reducer(
        {
          ...initialState,
          recipients: [recipientIDOne, recipientIDTwo],
        },
        actions.removeShareRecipient(recipientIDOne)
      ),
    )
      .toEqual(
        {
          ...initialState,
          recipients: [recipientIDTwo],
        }
      );
    
    expect(
      reducer(
        {
          ...initialState,
          recipients: [recipientIDTwo],
        },
        actions.removeShareRecipient(recipientIDTwo)
      )
    )
      .toEqual(
        {
          ...initialState,
          recipients: [],
        }
      );
  });
});