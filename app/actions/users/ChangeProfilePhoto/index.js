'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeProfilePhoto
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
 * Async function that changes the profile photo for the current user
 * 
 * @async
 * @function changeProfilePhoto
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 *
 * @returns  {Promise}
 * @resolves {string}         The profile photo uri to save for the current user
 * @rejects  {Error}          The error which caused the change profile photo failure
 */
export function changeProfilePhoto(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirebase, getFirestore}) => {
    const firebase: FirebaseInstance = getFirebase();
    const firestore: FirestoreInstance = getFirestore();
    const storage: StorageRef = firebase.storage().ref();

    try {
      // Promise.resolve(selectPhoto('Change Profile Photo')).then(function(value) {
      //   photoURI = value;
      // })
     const photoURI = await selectPhoto('Change Profile Photo');
      
      if (typeof photoURI === 'string' && photoURI !== 'cancelled') {
        dispatch(actions.request());

        const blob: Blob = await fetchRemoteURL(photoURI, 'blob');
        await storage.child(`profileImages/${userID}`).delete();
        const uploadTask: StorageUploadTask = storage.child(`profileImages/${userID}`).put(blob);
        await uploadTask;
        const profileImage: string = await uploadTask.snapshot.ref.getDownloadURL();
        const promises = [
          firestore.collection('users').doc(userID).update({ profileImage }),
          ImageCropPicker.clean(),
        ];

        dispatch(addEntities({users: {[userID]: {id: userID, profileImage}}}));
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
