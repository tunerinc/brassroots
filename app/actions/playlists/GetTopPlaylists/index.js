'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTopPlaylists
 */

import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/playlists';
import {type FirestoreInstance} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the top 3 most played playlists for a user
 * 
 * @async
 * @function getTopPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id to fetch the most played playlists of
 *
 * @returns  {Promise}
 * @resolves {object}         The top 3 most played playlists for the given user
 * @rejects  {Error}          The error which caused the get top playlists failure
 */
export function getTopPlaylists(
  userID: string,
): ThunkAction {
  return (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
  };
}