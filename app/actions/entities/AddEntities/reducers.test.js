'use strict';

import moment from 'moment';
import reducer, {initialState} from '../../../reducers/entities';
import * as actions from '../AddEntities';
import {lastUpdated as albumLast} from '../../../reducers/albums';
import {lastUpdated as artistLast} from '../../../reducers/artists';
import {lastUpdated as conversationLast} from '../../../reducers/conversations';
import {lastUpdated as playlistLast} from '../../../reducers/playlists';
import {lastUpdated as sessionLast} from '../../../reducers/sessions';
import {lastUpdated as userLast} from '../../../reducers/users';

describe('add entities reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles ADD_ENTITIES', () => {
    const artists = [{id: 'foo', name: 'foo'}];
    const album = {
      artists,
      id: 'foo',
      name: 'foo bar',
      small: 'foo',
      medium: 'foo',
      large: 'foo',
      userTracks: ['foo'],
      tracks: ['foo'],
    };

    const track = {
      artists,
      id: 'foo',
      name: 'foo',
      trackNumber: 1,
      durationMS: 0,
      album: {
        artists,
        id: 'foo',
        name: 'foo bar',
        small: 'foo',
        medium: 'foo',
        large: 'foo',
      },
    };

    const artist = {
      id: 'foo',
      name: 'foo',
      userTracks: [],
      tracks: ['foo'],
      userAlbums: [],
      albums: ['foo'],
      small: 'foo',
      medium: 'foo',
      large: 'foo',
    };

    const message = {
      id: 'foo',
      text: 'foo',
      sender: {
        id: 'foo',
        name: 'foo',
        image: 'foo',
      },
      timestamp: 'foo',
    };

    const playlist = {
      id: 'foo',
      name: 'foo',
      ownerID: 'foo',
      ownerType: 'foo',
      small: 'foo',
      medium: 'foo',
      large: 'foo',
      mode: 'foo',
      public: true,
      total: 1,
      tracks: ['foo'],
    };

    const playlistTrack = {
      id: 'foo-foo',
      trackID: 'foo',
      userID: 'foo',
    };

    const queueTrack = {
      id: 'foo',
      trackID: 'foo',
      userID: 'foo',
      totalLikes: 0,
      liked: false,
      seconds: 0,
      nanoseconds: 0,
      isCurrent: false,
    };

    const session = {
      id: 'foo',
      currentTrackID: 'foo',
      currentQueueID: 'foo',
      ownerID: 'foo',
      distance: 0,
      mode: 'foo',
      totalListeners: 0,
      totalPlayed: 0,
    };

    const user = {
      id: 'foo',
      displayName: 'foo',
      profileImage: 'foo',
      coverImage: 'foo',
      bio: '',
      location: '',
      website: '',
      followers: [],
      totalFollowers: 0,
      following: [],
      totalFollowing: 0,
      recentlyPlayed: [],
      mostPlayed: [],
      topPlaylists: [],
      favoriteTrackID: 'foo',
      currentSessionID: 'foo',
      spotifyAccountStatus: 'premium',
      coords: null,
    };

    const entities = {
      albums: {'foo': album},
      artists: {'foo': artist},
      messages: {'foo': message},
      playlists: {'foo': playlist},
      playlistTracks: {'foo-foo': playlistTrack},
      queueTracks: {'foo': queueTrack},
      sessions: {'foo': session},
      tracks: {
        'foo': track,
        'bar': {...track, id: 'bar'},
      },
      users: {'foo': user},
    };

    expect(
      reducer(
        {
          ...initialState,
          tracks: {
            allIDs: ['xyz'],
            total: 1,
            byID: {
              'xyz': {
                ...track,
                id: 'xyz',
                userPlays: 0,
                totalPlays: 0,
                saved: false,
              },
            },
          },
        },
        actions.addEntities(entities),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          albums: {
            allIDs: ['foo'],
            total: 1,
            byID: {
              'foo': {
                ...album,
                topListeners: [],
                topPlaylists: [],
                topTracks: [],
                totalPlays: 0,
                userPlays: 0,
                lastUpdated: albumLast,
              },
            },
          },
          artists: {
            allIDs: ['foo'],
            total: 1,
            byID: {
              'foo': {
                ...artist,
                topAlbums: [],
                topListeners: [],
                topPlaylists: [],
                topTracks: [],
                totalPlays: 0,
                userPlays: 0,
                userProfile: null,
                lastUpdated: artistLast,
              },
            },
          },
          messages: {
            allIDs: ['foo'],
            total: 1,
            byID: {
              'foo': {
                ...message,
                read: false,
                media: null,
                error: null,
                lastUpdated: conversationLast,
              },
            },
          },
          playlists: {
            allIDs: ['foo'],
            total: 1,
            byID: {
              'foo': {
                ...playlist,
                members: [],
                topTracks: [],
                totalPlays: 0,
                userPlays: 0,
                lastUpdated: playlistLast,
              },
            },
          },
          playlistTracks: {
            allIDs: ['foo-foo'],
            total: 1,
            byID: {
              'foo-foo': {
                ...playlistTrack,
                totalPlays: 0,
                userPlays: 0,
              },
            },
          },
          queueTracks: {
            allIDs: ['foo'],
            total: 1,
            byID: {
              'foo': queueTrack,
            },
          },
          sessions: {
            allIDs: ['foo'],
            total: 1,
            byID: {
              'foo': {
                ...session,
                timeLastPlayed: null,
                listeners: [],
                lastUpdated: sessionLast,
              },
            },
          },
          tracks: {
            allIDs: ['xyz', 'foo', 'bar'],
            total: 3,
            byID: {
              'foo': {
                ...track,
                userPlays: 0,
                totalPlays: 0,
                saved: false,
              },
              'bar': {
                ...track,
                id: 'bar',
                userPlays: 0,
                totalPlays: 0,
                saved: false,
              },
              'xyz': {
                ...track,
                id: 'xyz',
                userPlays: 0,
                totalPlays: 0,
                saved: false,
              },
            },
          },
          users: {
            allIDs: ['foo'],
            total: 1,
            byID: {
              'foo': {
                ...user,
                lastUpdated: userLast,
              },
            },
          },
        },
      );
  });
});