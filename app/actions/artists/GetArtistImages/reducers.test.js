'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Artist,
  type State,
} from '../../../reducers/artists';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('get artist images reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_IMAGES_REQUEST', () => {
    const expectedState: State = {...initialState, fetchingImages: true, error: null};
    expect(reducer(initialState, actions.getArtistImagesRequest())).toStrictEqual(expectedState);
  });

  it('should handle GET_ARTIST_IMAGES_SUCCESS', () => {
    const state: State = {...initialState, fetchingImages: true};
    expect(reducer(state, actions.getArtistImagesSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_IMAGES_FAILURE', () => {
    const state: State = {...initialState, fetchingImages: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getArtistImagesFailure(error))).toStrictEqual(expectedState);
  });
});