'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopListeners
 */

// import {addPeople} from '../../users/AddPeople';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {
  type Action,
  type State,
  type ThunkAction,
} from '../../../reducers/albums';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

type Users = {
  [id: string]: {
    id: string,
    username: string,
    profileImage: string,
  },
};

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
    dispatch(actions.getAlbumTopListenersRequest());

    const firestore: FirestoreInstance = getFirestore();
    const albumUsersRef: FirestoreDocs = firestore.collection('albums').doc(albumID).collection('users');
    const usersRef: FirestoreRef = firestore.collection('users');

    try {
      const topUserDocs: FirestoreDocs = await albumUsersRef.orderBy('plays', 'desc').limit(3).get();

      if (topUserDocs.empty) {
        dispatch(actions.getAlbumTopListenersSuccess(albumID, []));
      } else {
        const promises: Array<FirestoreDoc> = topUserDocs.docs.map(doc => usersRef.doc(doc.id).get());
        const userDocs = await Promise.all(promises);
        const users: Users = userDocs.reduce((userList, userDoc) => {
          if (userDoc.exists) {
            const {id, username, profileImage} = userDoc.data();
            return updateObject(userList, {[id]: {id, username, profileImage}});
          } else {
            throw new Error('Unable to retrieve user from Brassroots');
          }
        }, {});

        // dispatch(addPeople(users));
        dispatch(actions.getAlbumTopListenersSuccess(albumID, topUserDocs.docs.map(doc => doc.id)));
      }
    } catch (err) {
      dispatch(actions.getAlbumTopListenersFailure(err));
    }
  };
}
