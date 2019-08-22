'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopListeners
 */

import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/artists';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the top listeners of an artist
 * 
 * @async
 * @function getArtistTopListeners
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  artistID The artist id to get top listeners for
 *
 * @returns  {Promise}
 * @resolves {object}           The top listeners of an artist
 * @rejects  {Error}            The error which caused teh get artist top listeners failure
 */
export function getArtistTopListeners(
  artistID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
  dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const artistsRef: FirestoreRef = firestore.collection('artists');
    const artistUsersRef: FirestoreDocs = artistsRef.doc(artistID).collection('users');
    const usersRef: FirestoreRef = firestore.collection('users');

    let topListeners: Array<string> = [];

    try {
      const topUserDocs: FirestoreDocs = await artistUsersRef
        .orderBy('plays', 'desc')
        .limit(3)
        .get();

      if (topUserDocs.empty) {
        dispatch(actions.success());
      } else {
        const promises: Array<Promise<FirestoreDoc>> = topUserDocs.docs.map(doc => {
          return usersRef.doc(doc.id).get();
        });

        const userDocs: Array<FirestoreDoc> = await Promise.all(promises);
        const users = userDocs.reduce((userList, userDoc) => {
          if (userDoc.exists) {
            const {id, username, profileImage} = userDoc.data();
            topListeners = topListeners.concat(id);
            return updateObject(userList, {[id]: {id, username, profileImage}});
          } else {
            throw new Error('Unable to retrieve user from Ultrasound');
          }
        }, {});

        dispatch(addEntities({users, artists: {[artistID]: {topListeners, id: artistID}}}));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
