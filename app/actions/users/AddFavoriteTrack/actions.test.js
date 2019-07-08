'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddFavoriteTrack';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add favorite track action creator', () => {
  it('creates action to add the favorite track of the current user', () => {
    const favoriteTrackID: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_FAVORITE_TRACK,
      favoriteTrackID,
    };

    expect(actions.addFavoriteTrack(favoriteTrackID)).toStrictEqual(expectedAction);
  });
});