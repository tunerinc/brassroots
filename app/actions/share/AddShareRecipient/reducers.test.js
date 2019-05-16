'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/share';
import * as actions from '../AddShareRecipient';
import * as types from '../types';

describe('add share recipient reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_SHARE_RECIPIENT', () => {
    const recipientIDOne: string = 'foo';
    const recipientIDTwo: string = 'bar';

    expect(reducer(initialState, actions.addShareRecipient(recipientIDOne)))
      .toEqual(
        {
          ...initialState,
          recipients: [recipientIDOne],
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          recipients: [recipientIDOne],
        },
        actions.addShareRecipient(recipientIDTwo)
      )
    )
      .toEqual(
        {
          ...initialState,
          recipients: [recipientIDOne, recipientIDTwo],
        }
      );
  });
});