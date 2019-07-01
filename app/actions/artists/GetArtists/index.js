'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtists
 */

import Spotify from 'rn-spotify-sdk';
import getMySavedAlbums from "../../../utils/spotifyAPI/getMySavedAlbums";
import getMySavedTracks from "../../../utils/spotifyAPI/getMySavedTracks";
import addMusicItems from '../../../utils/addMusicItems';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {getArtistImages} from '../GetArtistImages';
import {getAlbumsSuccess} from '../../albums/GetAlbums/actions';
import {getTracksSuccess} from '../../tracks/GetTracks/actions';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import {type ThunkAction} from '../../../reducers/artists';

/**
 * Async function that gets the artists in the current user's library
 * 
 * @async
 * @function getArtists
 * 
 * @author Ben Howdle
 * @author Aldo Gonzalez <aldo@tuenrinc.com>
 * 
 * @param    {boolean} [refreshing=false] Whether the current user is refreshing the artists
 * 
 * @returns  {Promise}
 * @resolves {object}                     The artists in the current user's library
 * @rejects  {Error}                      The error which caused the get artists failure
 */
export function getArtists(
  refreshing?: boolean = false,
): ThunkAction {
  const albumLimit = 50;
  const trackLimit = 50;
  const artistLimit = 20;
  const market = 'US';

  return async dispatch => {
    dispatch(actions.getArtistsRequest(refreshing));

    let albumsFromSpotify = [];
    let tracksFromSpotify = [];
    let albumTracks = [];

    try {
      const fetchAlbumsFromSpotify = async (limit, offset) => {
        const {items, next} = await getMySavedAlbums({limit, offset, market});
        albumsFromSpotify = [...albumsFromSpotify, ...items];
        if (next) await fetchAlbumsFromSpotify(limit, offset + albumsFromSpotify.length);
      };

      const fetchTracksFromSpotify = async (limit, offset) => {
        const {items, next} = await getMySavedTracks({limit, offset, market});
        tracksFromSpotify = [...tracksFromSpotify, ...items];
        if (next) await fetchTracksFromSpotify(limit, offset + tracksFromSpotify.length);
      };

      await fetchAlbumsFromSpotify(albumLimit, 0);
      await fetchTracksFromSpotify(trackLimit, 0);

      albumsFromSpotify.forEach(({album: a}) => {
        albumTracks = [
          ...albumTracks,
          ...a.tracks.items.map(t => {
            return updateObject(t, {
              album: {...a, tracks: null, userTracks: a.tracks.items.map(t => t.id)},
            });
          }),
        ];
      });

      let music = addMusicItems([...tracksFromSpotify, ...albumTracks]);

      Object.keys(music.tracks).forEach(trackID => {
        music.tracks[trackID].artists.forEach(({id: artistID}) => {
          const artist = music.artists[artistID];
          const updatedArtist = updateObject(artist, {
            userTracks: [...artist.userTracks, trackID]
              .sort((a, b) => {
                const albumA = music.albums[music.tracks[a].albumID].name.toLowerCase();
                const albumB = music.albums[music.tracks[b].albumID].name.toLowerCase();
                const trackNumberA = music.tracks[a].trackNumber;
                const trackNumberB = music.tracks[b].trackNumber;

                return albumA < albumB
                  ? -1
                  : albumA > albumB
                  ? 1
                  : (albumA === albumB && trackNumberA < trackNumberB)
                  ? -1
                  : (albumA === albumB && trackNumberA > trackNumberB)
                  ? 1
                  : 0;
              }),
          });

          const updatedArtists = updateObject(music.artists, {[artistID]: updatedArtist});
          music = updateObject(music, {artists: updatedArtists});
        });
      });

      albumsFromSpotify.forEach(({album}) => {
        album.artists.forEach(a => {
          const artist = music.artists[a.id];
          const updatedArtist = updateObject(artist, {
            userAlbums: [...artist.userAlbums, album.id]
              .filter((el, i, arr) => i === arr.indexOf(el))
              .sort((a, b) => {
                const nameA = music.albums[a].name.toLowerCase();
                const nameB = music.albums[b].name.toLowerCase();
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
              }),
          });

          const updatedArtists = updateObject(music.artists, {[artist.id]: updatedArtist});
          music = updateObject(music, {artists: updatedArtists});
        });
      });

      const sortedArtists = Object.keys(music.artists)
        .sort((a, b) => {
          const nameA = music.artists[a].name.toLowerCase();
          const nameB = music.artists[b].name.toLowerCase();
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });

      for (let i = 0; i < (Math.ceil(sortedArtists.length / 50)); i++) {
        const res = await Spotify.getArtists(sortedArtists.slice(i*50, i*50+50));
        const artistsToAdd = res.artists.forEach(({id, images}) => {
          const large: string = Array.isArray(images) && images.length ? images[0].url : '';
          const medium: string = Array.isArray(images) && images.length === 3 ? images[1].url : large;
          const small: string = Array.isArray(images) && images.length === 3 ? images[2].url : large;
          const updatedArtist = updateObject(music.artists[id], {small, medium, large});
          const updatedArtists = updateObject(music.artists, {[id]: updatedArtist});
          music = updateObject(music, {artists: updatedArtists});
        });
      }

      dispatch(addArtists(music.artists));
      dispatch(addAlbums(music.albums));
      dispatch(addTracks(music.tracks));
      dispatch(actions.getArtistsSuccess(sortedArtists));
      dispatch(getAlbumsSuccess(albumsFromSpotify.map(a => a.album.id), true));
      dispatch(getTracksSuccess(tracksFromSpotify.map(t => t.track.id), true));
    } catch (err) {
      dispatch(actions.getArtistsFailure(err));
    }
  };
}