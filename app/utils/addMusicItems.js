'use strict';

/**
 * @module AddMusicItems
 */

import updateObject from './update_object';

/**
 * @constant
 * @type {object}
 * 
 * @property {object} tracks  The normalized track objects
 * @property {object} albums  The normalized album objects
 * @property {object} artists The normalized artist objects
 */
const defaultMusic = {
  tracks: {},
  albums: {},
  artists: {},
};

/**
 * Adds the individual music items by type (track, album, artist) to an object which gets returned at the end.
 * 
 * @function
 * 
 * @param   {object[]} tracksToAdd          The list of spotify tracks to split and add to the object
 * @param   {object}   [music]              The object containing tracks, albums, and artists separated out
 *                      add other shit here
 * @param   {string[]} [music.sortedTracks] *Optional* The list of library tracks in order retrieved from Spotify
 * 
 * @returns {object}                        The music object is returned containing all the aggregated data
 */
function addMusicItems(tracksToAdd, music = defaultMusic) {
  let tracks = [];
  let musicTracks = {};
  let musicAlbums = {};
  let musicArtists = {};

  if (tracksToAdd.items) {
    tracks = tracksToAdd.items;
  } else {
    tracks = tracksToAdd;
  }

  for (let item of tracks) {
    let track = {};

    if (item && item.track) {
      track = item.track;
    } else {
      track = item;      
    }
    
    const album = track.album;
    const {images, small, medium, large} = album;


    if (music.sortedTracks) {
      music = updateObject(music, {sortedTracks: music.sortedTracks.concat(track.id)});
    }
    
    musicTracks = updateObject(musicTracks, {
      [track.id]: {
        id: track.id,
        albumID: album.id,
        name: track.name,
        trackNumber: track.trackNumber || track.track_number,
        durationMS: track.durationMS || track.duration_ms,
        artists: track.artists.map(artist => ({
          id: artist.id,
          name: artist.name,
        })),
      },
    });
    
    musicAlbums = updateObject(musicAlbums, {
      [album.id]: {
        id: album.id,
        name: album.name,
        small: small ? small : images && images.length ? images[2].url : '',
        medium: medium ? medium : images && images.length ? images[1].url : '',
        large: large ? large : images && images.length ? images[0].url : '',
        totalPlays: 0,
        tracks: [],
        userTracks: album.userTracks ? album.userTracks : [],
        artists: album.artists.map(artist => ({
          id: artist.id,
          name: artist.name,
        })),
      },
    });

    track.artists.forEach(artist => {
      musicArtists = updateObject(musicArtists, {
        [artist.id]: {
          id: artist.id,
          name: artist.name,
          image: '',
          userTracks: [],
          userAlbums: [],
          tracks: [],
          albums: [],
        },
      });
    });

    if (album.artists) {
      album.artists.forEach(artist => {
        musicArtists = updateObject(musicArtists, {
          [artist.id]: {
            id: artist.id,
            name: artist.name,
            image: '',
            albums: [],
            userTracks: [],
            userAlbums: [],
          },
        });
      });
    }
  }

  return updateObject(music, {tracks: musicTracks, albums: musicAlbums, artists: musicArtists});
}

module.exports = addMusicItems;