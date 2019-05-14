'use strict';

/**
 * @format
 * @flow
 */

import isURL from '../../../utils/isURL';
import reducer, { initialState } from '../../../reducers/groups';
import * as actions from '../SetNewGroupWebsite';
import * as types from '../types';

describe('set new group website reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_GROUP_WEBSITE', () => {
    const website: string = 'www.foo.com';
    
    expect(reducer(initialState, actions.setNewGroupWebsite(website)))
      .toEqual(
        {
          ...initialState,
          newGroup: {
            ...initialState.newGroup,
            website,
          },
          websiteValid: isURL(website),
        }
      );
  });
});