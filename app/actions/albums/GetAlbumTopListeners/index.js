'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopListeners
 */

import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/albums';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the top listeners of an album
 * 
 * @async
 * @function getAlbumTopListeners
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  albumID The album id to get top listeners for
 *
 * @returns  {Promise}
 * @resolves {object}          The getd top listeners of an album
 * @rejects  {Error}           The error which caused the get album top listeners failure
 */
export function getAlbumTopListeners(
  albumID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const albumUsersRef: FirestoreDocs = firestore.collection('albums').doc(albumID).collection('users');
    const usersRef: FirestoreRef = firestore.collection('users');

    let topListeners: Array<string> = [];

    try {
      const topUserDocs: FirestoreDocs = await albumUsersRef.orderBy('plays', 'desc').limit(3).get();

      if (topUserDocs.empty) {
        dispatch(actions.success());
      } else {
        const promises: Array<FirestoreDoc> = topUserDocs.docs.map(doc => usersRef.doc(doc.id).get());
        const userDocs = await Promise.all(promises);
        const users = userDocs.reduce((userList, userDoc) => {
          if (userDoc.exists) {
            const {id, displayName, profileImage} = userDoc.data();
            topListeners = topListeners.concat(id);
            return updateObject(userList, {[id]: {id, displayName, profileImage}});
          } else {
            throw new Error('Unable to retrieve user from Brassroots');
          }
        }, {});

        dispatch(addEntities({users, albums: {[albumID]: {topListeners, id: albumID}}}));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
