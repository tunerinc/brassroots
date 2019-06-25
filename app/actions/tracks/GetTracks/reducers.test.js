'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from './actions';

describe('get tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_TRACKS_REQUEST', () => {
    const refreshingTracks: boolean = true;

    expect(reducer(initialState, actions.getTracksRequest(refreshingTracks)))
      .toStrictEqual({...initialState, refreshingTracks, fetchingTracks: true});

    expect(reducer(initialState, actions.getTracksRequest(!refreshingTracks)))
      .toStrictEqual({...initialState, fetchingTracks: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getTracksRequest(refreshingTracks),
      ),
    )
      .toStrictEqual({...initialState, refreshingTracks, fetchingTracks: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getTracksRequest(!refreshingTracks),
      ),
    )
      .toStrictEqual({...initialState, fetchingTracks: true});
  });

  it('should handle GET_TRACKS_SUCCESS', () => {
    const userTracks: Array<string> = ['bar', 'xyz'];
    const replace: boolean = true;

    expect(
      reducer(
        {...initialState, fetchingTracks: true},
        actions.getTracksSuccess(userTracks),
      ),
    )
      .toStrictEqual({...initialState, userTracks});

    expect(
      reducer(
        {...initialState, fetchingTracks: true, userTracks: ['foo']},
        actions.getTracksSuccess(userTracks),
      ),
    )
      .toStrictEqual({...initialState, userTracks: ['foo', ...userTracks]});

    expect(
      reducer(
        {...initialState, fetchingTracks: true, userTracks: ['foo']},
        actions.getTracksSuccess(userTracks, replace),
      ),
    )
      .toStrictEqual({...initialState, userTracks});

    expect(
      reducer(
        {...initialState, refreshingTracks: true, fetchingTracks: true, userTracks: ['foo']},
        actions.getTracksSuccess(userTracks),
      ),
    )
      .toStrictEqual({...initialState, userTracks});
  });

  it('should handle GET_TRACKS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, refreshingTracks: true, fetchingTracks: true},
        actions.getTracksFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});