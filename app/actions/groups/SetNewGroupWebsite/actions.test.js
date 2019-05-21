'use strict';

/**
 * @format
 * @flow
 */

import isURL from '../../../utils/isURL';
import * as actions from '../SetNewGroupWebsite';
import * as types from '../types';
import {type Action} from '../../../reducers/groups';

describe('set new group website action creator', () => {
  it('creates action setting the website for the new group being created by the current user', () => {
    const website: string = 'www.foo.com';
    const expectedAction: Action = {
      type: types.SET_NEW_GROUP_WEBSITE,
      websiteValid: isURL(website),
      website,
    };

    expect(actions.setNewGroupWebsite(website)).toEqual(expectedAction);
  });
});