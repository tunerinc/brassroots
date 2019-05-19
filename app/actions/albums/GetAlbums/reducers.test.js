'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/albums';
import * as actions from './actions';

describe('get albums reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ALBUMS_REQUEST', () => {
    const refreshingAlbums: boolean = true;

    expect(reducer(initialState, actions.getAlbumsRequest(refreshingAlbums)))
      .toStrictEqual({...initialState, refreshingAlbums, fetchingAlbums: true});

    expect(reducer(initialState, actions.getAlbumsRequest(!refreshingAlbums)))
      .toStrictEqual({...initialState, fetchingAlbums: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getAlbumsRequest(refreshingAlbums),
      ),
    )
      .toStrictEqual({...initialState, refreshingAlbums, fetchingAlbums: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getAlbumsRequest(!refreshingAlbums),
      ),
    )
      .toStrictEqual({...initialState, fetchingAlbums: true});
  });

  it('should handle GET_ALBUMS_SUCCESS', () => {
    const userAlbums: Array<string> = ['bar', 'xyz'];

    expect(
      reducer(
        {...initialState, fetchingAlbums: true},
        actions.getAlbumsSuccess(userAlbums),
      ),
    )
      .toStrictEqual({...initialState, userAlbums});

    expect(
      reducer(
        {...initialState, userAlbums: ['xyz'], fetchingAlbums: true},
        actions.getAlbumsSuccess(userAlbums),
      ),
    )
      .toStrictEqual({...initialState, userAlbums: ['xyz', ...userAlbums]});

    expect(
      reducer(
        {...initialState, userAlbums: ['xyz'], refreshingAlbums: true, fetchingAlbums: true},
        actions.getAlbumsSuccess(userAlbums),
      ),
    )
      .toStrictEqual({...initialState, userAlbums});
  });

  it('should handle GET_ALBUMS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingAlbums: true},
        actions.getAlbumsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});