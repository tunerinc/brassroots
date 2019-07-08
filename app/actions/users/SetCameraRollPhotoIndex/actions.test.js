'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetCameraRollPhotoIndex';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('set camera roll photo index action creator', () => {
  it('creates action setting the selected photo index in the camera roll', () => {
    const index: number = 1;
    const expectedAction: Action = {
      type: types.SET_CAMERA_ROLL_PHOTO_INDEX,
      index,
    };
    
    expect(actions.setCameraRollPhotoIndex(index)).toEqual(expectedAction);
  });
});