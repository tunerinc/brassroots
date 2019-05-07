'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddSettings';
import * as types from '../types';
import type {Settings, Action} from '../../../reducers/settings';

describe('add settings action creator', () => {
  it('creates action to add the current user\'s settings object', () => {
    const settings: Settings = {
      version: 'foo',
      soundEffects: true,
      theme: 'foo',
      language: 'foo',
      region: 'foo',
      notify: {
        session: 'following',
        chat: 'mentions',
        message: true,
        groupMessage: 'all',
        nearbySession: 'all',
        playlistChange: true,
        playlistJoin: true,
        likedTrack: true,
        newFollower: true,
      },
      preference: {
        playlist: 'limitless',
        session: 'radio',
        message: 'anyone',
        muteNearby: true,
      },
    };

    const expectedAction: Action = {
      type: types.ADD_SETTINGS,
      settings,
    };

    expect(actions.addSettings(settings)).toStrictEqual(expectedAction);
  });
});