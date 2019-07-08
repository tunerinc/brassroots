'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/users';
import * as actions from '../SetCameraRollPhotoIndex';
import * as types from '../types';

describe('set camera roll photo index reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_CAMERA_ROLL_PHOTO_INDEX', () => {
    const index: number = 0;

    expect(reducer(initialState, actions.setCameraRollPhotoIndex(index)))
      .toEqual(
        {
          ...initialState,
          selectedCameraRollPhotoIndex: index,
        }
      );
  });
});