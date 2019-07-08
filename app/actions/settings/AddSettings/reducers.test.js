'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Settings,
} from '../../../reducers/settings';
import * as actions from '../AddSettings';

describe('add settings reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_SETTINGS', () => {
    const settings: Settings = {
      version: 'foo',
      soundEffects: true,
      theme: 'foo',
      language: 'foo',
      region: 'foo',
      notify: {
        session: 'foo',
        chat: 'foo',
        message: true,
        groupMessage: 'foo',
        nearbySession: 'foo',
        playlistChange: true,
        playlistJoin: true,
        likedTrack: true,
        newFollower: true,
      },
      preference: {
        playlist: 'foo',
        session: 'foo',
        message: 'foo',
        muteNearby: true,
      },
    };

    expect(reducer(initialState, actions.addSettings(settings)))
      .toStrictEqual(
        {
          ...initialState,
          version: settings.version,
          soundEffects: settings.soundEffects,
          theme: settings.theme,
          language: settings.language,
          region: settings.region,
          notify: {...settings.notify},
          preference: {...settings.preference},
        }
      );
  });
});