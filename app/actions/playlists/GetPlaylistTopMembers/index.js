'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTopMembers
 */

import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/playlists';
import {type FirestoreInstance} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the top 3 members with the most plays from a playlist
 * 
 * @async
 * @function getPlaylistTopMembers
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID     The user id of the current user
 * @param    {string}  playlistID The playlist id to fetch the top 3 members with the most plays from
 *
 * @returns  {Promise}
 * @resolves {object}             The top 3 members with the most plays from the playlist
 * @rejects  {Error}              The error which caused the get playlist top members failure
 */
export function getPlaylistTopMembers(
  userID: string,
  playlistID: string,
): ThunkAction {
  return (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
  };
}