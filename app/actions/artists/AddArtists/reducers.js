'use strict';

/**
 * @module AddArtistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleArtist, lastUpdated} from '../../../reducers/artists';

/**
 * Adds a single artists to the Redux state
 * 
 * @function addSingleArtist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                    The Redux state of the single artist
 * @param   {object}   action                   The Redux action
 * @param   {string}   action.type              The type of Redux action
 * @param   {object}   action.artists           The Spotify artists to add
 * @param   {string}   action.artist            The artist object o add
 * @param   {string}   action.artist.id         The Spotify id of the artist
 * @param   {string}   action.artist.name       The name of the artist
 * @param   {string}   [action.artist.image=''] The image url for the artist, if available
 * @param   {string[]} action.artist.albums     The Spotify ids of the albums from the artist in order by release date
 * @param   {number}   action.artist.totalPlays The total amount of plays for the artist
 * @param   {string[]} action.artist.userTracks The Spotify ids of the tracks the current user saved from the artist
 * @param   {string[]} action.artist.userAlbums The Spotify ids of the albums the current user has saved from the artist
 * 
 * @returns {object}                            The state of newly added artist
 */
export function addSingleArtist(state, action) {
  const {
    albums,
    small: oldSmall,
    medium: oldMedium,
    large: oldLarge,
    userAlbums: oldAlbums,
    userTracks: oldTracks,
  } = state;
  const {artist} = action;
  const {images, small, medium, large, userAlbums, userTracks, ...restOfArtist} = artist;
  const hasBothAlbums = albums && artist.albums;
  const hasBothUserAlbums = oldAlbums && userAlbums;
  const hasBothTracks = oldTracks && userTracks;

  return updateObject(state, {
    ...restOfArtist,
    lastUpdated,
    large: large ? large : oldLarge ? oldLarge : images && images.length ? images[0].url : '',
    medium: medium ? medium : oldMedium ? oldMedium : images && images.length ? images[1].url : '',
    small: small ? small : oldSmall ? oldSmall : images && images.length ? images[2].url : '',
    albums: hasBothAlbums ? [...albums, ...artist.albums] : artist.albums ? [...artist.albums] : [],
    userAlbums: hasBothUserAlbums
      ? [...oldAlbums, ...userAlbums]
      : userAlbums
      ? [...userAlbums]
      : [...oldAlbums],
    userTracks: hasBothTracks
      ? [...oldTracks, ...userTracks]
      : userTracks
      ? [...userTracks]
      : [...oldTracks],
  });
}

/**
 * Adds multiple artists to Redux
 * 
 * @function addArtists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.artists The artists to add to Redux
 * 
 * @returns {object}                The state with the artistsByID prop updated
 */
export function addArtists(state, action) {
  const {artists} = action;

  let {artistsByID} = state;

  Object.values(artists).forEach(artist => {
    const addedArtist = singleArtist(artistsByID[artist.id], {...action, artist});
    artistsByID = updateObject(artistsByID, {[artist.id]: addedArtist});
  });

  return updateObject(state, {
    artistsByID,
    lastUpdated,
    totalArtists: Object.keys(artistsByID).length,
    error: null,
  });
}