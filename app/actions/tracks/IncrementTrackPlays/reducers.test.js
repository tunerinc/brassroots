'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  lastUpdated,
  type Track,
} from '../../../reducers/tracks';
import * as actions from './actions';

describe('increment track plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_TRACK_PLAYS_REQUEST', () => {
    expect(reducer(initialState, actions.incrementTrackPlaysRequest()))
      .toStrictEqual({...initialState, incrementingCount: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.incrementTrackPlaysRequest(),
      ),
    )
      .toStrictEqual({...initialState, incrementingCount: true});
  });

  it('should handle INCREMENT_TRACK_PLAYS_SUCCESS', () => {
    const userPlays: number = 1;
    const trackID: string = 'foo';
    const track: Track = {
      id: 'foo',
      name: 'foo',
      albumID: 'foo',
      artists: [],
      trackNumber: 0,
      durationMS: 0,
      totalPlays: 0,
      userPlays: 0,
    };

    expect(
      reducer(
        {
          ...initialState,
          incrementingCount: true,
          tracksByID: {[trackID]: track},
        },
        actions.incrementTrackPlaysSuccess(trackID, userPlays),
      ),
    )
      .toStrictEqual({...initialState, tracksByID: {[trackID]: {...track, userPlays, lastUpdated}}});
  });

  it('should handle INCREMENT_TRACK_PLAYS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, incrementingCount: true},
        actions.incrementTrackPlaysFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});