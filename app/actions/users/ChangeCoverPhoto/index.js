'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeCoverPhoto
 */

import ImageCropPicker from 'react-native-image-crop-picker';
import fetchRemoteURL from '../../../utils/fetchRemoteURL';
import selectPhoto from '../../../utils/selectPhoto';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/users';
import {type Blob} from '../../../utils/brassrootsTypes';
import {
  type FirebaseInstance,
  type FirestoreInstance,
  type StorageRef,
  type StorageUploadTask,
} from '../../../utils/firebaseTypes';

/**
 * Async function that changes the cover photo for the current user
 * 
 * @async
 * @function changeCoverPhoto
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 *
 * @returns  {Promise}
 * @resolves {string}         The cover photo uri for the current user
 * @rejects  {Error}          The error which caused the change cover photo failure
 */
export function changeCoverPhoto(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirebase, getFirestore}) => {
    const firebase: FirebaseInstance = getFirebase();
    const firestore: FirestoreInstance = getFirestore();
    const storage: StorageRef = firebase.storage().ref();

    try {
      const photoURI = await selectPhoto('Change Cover Photo');

      if (typeof photoURI === 'string' && photoURI !== 'cancelled') {
        dispatch(actions.request());

        const blob: Blob = await fetchRemoteURL(photoURI, 'blob');
        await storage.child(`coverImages/${userID}`).delete();
        const uploadTask: StorageUploadTask = storage.child(`coverImages/${userID}`).put(blob);
        await uploadTask;
        const coverImage: string = await uploadTask.snapshot.ref.getDownloadURL();
        const promises = [
          firestore.collection('users').doc(userID).update({coverImage}),
          ImageCropPicker.clean(),
        ];

        dispatch(addEntities({users: {[userID]: {id: userID, coverImage}}}));
        dispatch(actions.success());
        await Promise.all(promises);
      } else {
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}