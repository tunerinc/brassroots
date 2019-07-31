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
   * @param    {number}  amt The number of individual users/sessions to create in Firestore
   * 
   * @returns  {Promise}
   * @resolves {number}      The status code of the response
   * @rejects  {Error}       The error which caused the failure
   */
  async createSessions(amt) {
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

      for (let i = 0; i < amt; i++) {
        const newPlaylistDoc = playlistsRef.doc();
        const newSessionDoc = sessionsRef.doc();
        const newUserDoc = usersRef.doc();
        const currentTrackID = songIDs[Math.floor(Math.random() * songIDs.length)];
  
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
            owner: {
              id: newUserDoc.id,
              name: internet.userName(),
              image: internet.avatar(),
              followers: [],
            },
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
      };

      await batch.commit();
      console.log('success');
    } catch (err) {
      console.log(err);
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
      console.log('success');
    } catch (err) {
      console.log(err);
    };
  },
};

module.exports = FakerAPI;