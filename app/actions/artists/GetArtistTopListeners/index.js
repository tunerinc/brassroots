'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopListeners
 */

import {addPeople} from '../../users/AddPeople';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/artists';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

type Users = {
  [id: string]: {
    +id: string,
    +name: string,
    +profileImage: string,
  },
};

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
  dispatch(actions.getArtistTopListenersRequest());

    const firestore: FirestoreInstance = getFirestore();
    const artistUsersRef: FirestoreDocs = firestore.collection('artists').doc(artistID).collection('users');
    const usersRef: FirestoreRef = firestore.collection('users');

    try {
      const topUserDocs: FirestoreDocs = await artistUsersRef
        .orderBy('plays', 'desc')
        .limit(3)
        .get();

      if (topUserDocs.empty) {
        dispatch(actions.getArtistTopListenersSuccess(artistID, []));
      } else {
        const promises: Array<Promise<FirestoreDoc>> = topUserDocs.docs.map(doc => usersRef.doc(doc.id).get());
        const userDocs: Array<FirestoreDoc> = await Promise.all(promises);
        const users: Users = userDocs.reduce((userList, userDoc) => {
          if (userDoc.exists) {
            const {id, username, profileImage} = userDoc.data();
            return updateObject(userList, {[id]: {id, username, profileImage}});
          } else {
            throw new Error('Unable to retrieve user from Ultrasound');
          }
        }, {});

        dispatch(addPeople(users));
        dispatch(actions.getArtistTopListenersSuccess(artistID, topUserDocs.docs.map(doc => doc.id)));
      }
    } catch (err) {
      dispatch(actions.getArtistTopListenersFailure(err));
    }
  };
}
