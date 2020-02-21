'use strict';

const envConfig = require('../../env.json');
const Firestore = require('@google-cloud/firestore');
const {random, address, internet} = require('faker');

const firestore = new Firestore({
  projectId: envConfig.FIREBASE_PROJECT_ID,
  keyFilename: '../../Downloads/brassroots-eae79e34a66d.json',
});

firestore.settings({timestampsInSnapshots: true});

const FakerAPI = {
  
  /**
   * A module for using Faker and creating fake data in Firestore
   * @module FakerAPI
   */

  /**
   * Creates fake live session data in Firestore
   * 
   * @async
   * @alias module:FakerAPI
   * @function createSessions
   * 
   * @author Aldo Gonzalez <aldo@tunerinc.com>
   * 
   * @returns  {Promise}
   * @resolves {number}  The status code of the response
   * @rejects  {Error}   The error which caused the failure
   */
  async createSessions() {
    try {
      const playlistsRef = firestore.collection('playlists');
      const sessionsRef = firestore.collection('sessions');
      const usersRef = firestore.collection('users');
      const songIDs = [
        '5DVVw9e4D656vURT3pfnjg',
        '4tH7y3blkt051mLmvdXQbC',
        '4M2WwfwrE3e8iamCQg0oo3',
        '0K1WwjtcGwZMmzSclUnfNT',
        '2lifSBX7a9Zd1JTe7zVSeR',
        '5sWDLm19LmSnJmGSKR930x',
        '0tnFKjEEsjD3AVShRgtIun',
        '4KUNxFojq2RwjdTImuvtcy',
        '7ngSZ7ph9KdW3vJwwXd2Cd',
        '1ef1LzbsqzusEb5R9Ue5Sx',
        '4JkcLC5ijQvzCCZB9Pkenz',
        '1MxHfmlgRau4xEcuIh5CCb',
        '50aeJUmtwDth4DB682Jbvm',
        '1AKYsnvzWOilr0Jx7PdcvF',
        '66wD6d1uYijcKGYEiOGFHW',
        '5rqMHzcFDzEVcBNnCisSOS',
        '0VH7wmxrvFD1VBU701vueP',
        '396owgAZjAMeOP5Z3PG7Mb',
        '2yUgGLEWVyLUd7DPP7sil3',
        '5bFV9ewiHQdYmSChUm9Vca',
        '2seQDuGUv6VWc8qjCJwSwb',
        '5inhK4JERlKpAjlbX27MT2',
        '3F1TIgyzrfdU4dF8c4C75U',
        '4JtbYEYHNTZcw1jCCIsivM',
        '4Zmaxj6zSojrdHec49lFgh',
        '6xGAsiAWakeejeuprysYGo',
        '2UwefveAkmyD3vuK405LBp',
        '6VKcxguyeTaFprrIdkvFMc',
        '5ByuRt9qGth2HLJFMs1CRS',
        '2rneRKYC9q2THVsivZwHsk',
      ];

      let batch = firestore.batch();

      for (let i = 0; i < 1; i++) {
        const newPlaylistDoc = playlistsRef.doc();
        const newSessionDoc = sessionsRef.doc();
        const newUserDoc = usersRef.doc();
        const currentTrackID = i < 30 ? songIDs[i] : songIDs[i - 30];
        const nextTrackID = i < 29 ? songIDs[i + 1] : songIDs[i - 29];
        const owner = {
          id: newUserDoc.id,
          name: internet.userName(),
          image: internet.avatar(),
        };

        batch.set(
          newSessionDoc,
          {
            currentTrackID,
            id: newSessionDoc.id,
            progress: random.number(),
            currentQueueID: currentTrackID,
            timeLastPlayed: null,
            mode: 'radio',
            live: true,
            paused: false,
            repeat: false,
            seeking: false,
            shuffle: false,
            coords: {
              lat: parseFloat(address.latitude()),
              lon: parseFloat(address.longitude()),
            },
            context: {
              id: newPlaylistDoc.id,
              name: random.words(2),
              type: 'playlist',
              displayName: null,
              position: 0,
              tracks: [],
            },
            owner: {...owner, followers: []},
            totals: {
              context: 1,
              followers: 0,
              listeners: random.number(),
              messages: 1,
              previouslyPlayed: 0,
              queue: 1,
              users: random.number(),
            },
          }
        );

        batch.set(
          newSessionDoc.collection('queue').doc(currentTrackID),
          {
            nextTrackID,
            id: currentTrackID,
            prevQueueID: null,
            prevTrackID: null,
            nextQueueID: nextTrackID,
            totalLikes: random.number(),
            likes: [],
            timeAdded: {
              seconds: 1,
              nanoseconds: 1,
            },
            isCurrent: true,
            user: {
              id: owner.id,
              displayName: owner.name,
              profileImage: owner.image,
            },
            track: {
              id: currentTrackID,
              name: 'No Place',
              durationMS: 237986,
              trackNumber: 1,
              artists: [
                {
                  id: '5Pb27ujIyYb33zBqVysBkj',
                  name: 'RÜFÜS DU SOL',
                }
              ],
              album: {
                id: '5BvrJjbQqxu8YbcT4F6SwO',
                name: 'No Place',
                small: 'https://i.scdn.co/image/9bfb43b2c0d87c2f1a9194311bb17d6eb8f4e023',
                medium: 'https://i.scdn.co/image/d5708728a744d9f8c6277fd8f43a3768c58f7548',
                large: 'https://i.scdn.co/image/0210a425ae18443bf878a877c48e45bc328676c5',
                artists: [
                  {
                    id: '5Pb27ujIyYb33zBqVysBkj',
                    name: 'RÜFÜS DU SOL',
                  }
                ],
              },
            },
          }
        );
  
        batch.set(
          newSessionDoc.collection('queue').doc(nextTrackID),
          {
            id: nextTrackID,
            prevQueueID: currentTrackID,
            prevTrackID: currentTrackID,
            nextQueueID: null,
            nextTrackID: null,
            totalLikes: random.number(),
            likes: [],
            timeAdded: {
              seconds: 2,
              nanoseconds: 2,
            },
            isCurrent: false,
            user: {
              id: owner.id,
              displayName: owner.name,
              profileImage: owner.image,
            },
            track: {
              id: nextTrackID,
              name: 'Pearl Magnolia',
              durationMS: 241540,
              trackNumber: 7,
              artists: [
                {
                  id: '1XwAo9UCt90soyw5V7U6LV',
                  name: 'Alexander Lewis',
                },
                {
                  id: '5sKvgmG84C0bIMWeS2SRPr',
                  name: 'Brasstracks',
                },
                {
                  id: '2qAwMsiIjTzlmfAkXKvhVA',
                  name: 'Armani White',
                },
                {
                  id: '5aqZZKgeZ8UxRseZWBhc7D',
                  name: 'BXRBER',
                },
              ],
              album: {
                id: '17My8qJrxLwS53OR6VmU5Y',
                name: 'OMNI.',
                small: 'https://i.scdn.co/image/86c8f155d9433501ebedb5a5f58937380db0fc83',
                medium: 'https://i.scdn.co/image/9028f522cde33e9be840616b8f08c12a0d218605',
                large: 'https://i.scdn.co/image/4f07a188aa3ee5e47578d8c080d7ba3247fe5627',
                artists: [
                  {
                    id: '1XwAo9UCt90soyw5V7U6LV',
                    name: 'Alexander Lewis',
                  }
                ],
              },
            },
          }
        );

        batch.set(
          newSessionDoc.collection('messages').doc('test'),
          {
            id: 'test',
            text: 'Test out the chat by typing something below.',
            timestamp: null,
            read: [owner.id],
            timeAdded: Firestore.FieldValue.serverTimestamp(),
            owner: {
              id: owner.id,
              displayName: owner.name,
              profileImage: owner.image,
            },
          },
        );
      };

      await batch.commit();
    } catch (err) {
    };
  },

  /**
   * Creates fake play data inside of Firestore
   * 
   * @async
   * @alias module:FakerAPI
   * @function createPlayData
   * 
   * @author Aldo Gonzalez <aldo@tunerinc.com>
   * 
   * @returns  {Promise}
   * @resolves {number}  The status code of the response
   * @rejects  {Error}   The error which caused the failure
   */
  async createPlayData() {
    try {
      const albumsRef = firestore.collection('albums');
      const artistsRef = firestore.collection('artists');
      const usersRef = firestore.collection('users');
      const newAlbumDoc = albumsRef.doc();
      const newArtistDoc = artistsRef.doc();
      const albumID = '6QPkyl04rXwTGlGlcYaRoW';
      const artistID = '13ubrt8QOOCPljQ2FL1Kca';
      const albumTracks = ['0aj2QKJvz6CePykmlTApiD', '1AWQoqb9bSvzTjaLralEkT', '7Lf7oSEVdzZqTA0kEDSlS5'];
      const albumPlaylistsRef = newAlbumDoc.collection('playlists');
      const albumTracksRef = newAlbumDoc.collection('tracks');
      const albumUsersRef = newAlbumDoc.collection('users');
      const artistAlbums = ['3MATDdrpHmQCmuOcozZjDa', '3arNdjotCvtiiLFfjKngMc', '1E1eyI5uGllppJZCxNoF9w'];
      const artistTracks = ['4XoP1AkbOurU9CeZ2rMEz2', '4S7YHmlWwfwArgd8LfSPud', '22Mme5vsZ688TMUieIHdx3'];
      const artistAlbumsRef = artistsRef.collection('albums');
      const artistPlaylistsRef = artistsRef.collection('playlists');
      const artistTracksRef = artistsRef.collection('tracks');
      const artistUsersRef = artistsRef.collection('users');
      const playlists = ['2MPFnpqutHrOylKkG7yspu', '2XOdDQ41vtM2bN09NWwoSD', '3tyo9RTPMGeA0rBkN8KWEj'];

      let batch = firestore.batch();

      batch.set(
        newAlbumDoc,
        {
          id: albumID,
          plays: random.number(),
        }
      );

      batch.set(
        newArtistDoc,
        {
          id: artistID,
          plays: random.number(),
        }
      );

      playlists.forEach(playlistID => {
        batch.set(
          albumPlaylistsRef.doc(playlistID),
          {
            id: playlistID,
            plays: random.number(),
          }
        );

        batch.set(
          artistPlaylistsRef.doc(playlistID),
          {
            id: playlistID,
            plays: random.number(),
          }
        );
      });

      albumTracks.forEach(trackID => {
        batch.set(
          albumTracksRef.doc(trackID),
          {
            id: trackID,
            plays: random.number(),
          }
        );
      });

      artistAlbums.forEach(albumID => {
        batch.set(
          artistAlbumsRef.doc(albumID),
          {
            id: albumID,
            plays: random.number(),
          }
        );
      });

      artistTracks.forEach(trackID => {
        batch.set(
          artistTracksRef.doc(trackID),
          {
            id: trackID,
            plays: random.number(),
          }
        );
      });

      for (let i = 0; i < 3; i++) {
        const newUserDoc = usersRef.doc();

        batch.set(
          newUserDoc,
          {
            id: newUserDoc.id,
            username: internet.userName(),
            profileImage: internet.avatar(),
          }
        );

        batch.set(
          albumUsersRef.doc(newUserDoc.id),
          {
            id: newUserDoc.id,
            plays: random.number(),
          }
        );

        batch.set(
          artistUsersRef.doc(newUserDoc.id),
          {
            id: newUserDoc.id,
            plays: random.number(),
          }
        );
      };

      await batch.commit();
    } catch (err) {
    };
  },
};

module.exports = FakerAPI;