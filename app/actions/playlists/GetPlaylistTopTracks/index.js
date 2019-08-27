'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTopTracks
 */

import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/playlists';
import {type FirestoreInstance} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the top tracks from a playlist
 * 
 * @async
 * @function getPlaylistTopTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  playlistID The playlist id to get top tracks from
 *
 * @returns  {Promise}
 * @resolves {object}             The top tracks getd from a playlist
 * @rejects  {Error}              The error which caused the get playlist top tracks failure
 */
export function getPlaylistTopTracks(
  playlistID: string,
): ThunkAction {
  return (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
  };
}
