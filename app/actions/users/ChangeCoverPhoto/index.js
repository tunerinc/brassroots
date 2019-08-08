'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeCoverPhoto
 */

import {Platform} from 'react-native';
import fetchRemoteURL from '../../../utils/fetchRemoteURL';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import * as actions from './actions';
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
      const photoURI: string = await selectPhoto();

      if (photoURI !== 'cancelled') {
        const croppedImage = await ImageCropPicker.openCropper(
          {
            path: photoURI,
            width: 640,
            height: 640,
            cropperToolbarTitle: 'Crop Image',
          }
        );

        dispatch(actions.changeCoverPhotoRequest());

        const blob: Blob = await fetchRemoteURL(croppedImage.path, 'blob');
        await storage.child(`coverImages/${userID}`).delete();
        const uploadTask: StorageUploadTask = storage.child(`coverImages/${userID}`).put(blob);
        await uploadTask;
        const coverImage: string = await uploadTask.snapshot.ref.getDownloadURL();
        const promises = [
          firestore.collection('users').doc(userID).update({ coverImage }),
          ImageCropPicker.clean(),
        ];

        await Promise.all(promises);
      }

      dispatch(actions.changeCoverPhotoSuccess());
    } catch (err) {
      dispatch(actions.changeCoverPhotoFailure(err));
    }
  };
}

function selectPhoto(): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      title: 'Change Cover Photo',
      mediaType: 'photo',
      quality: 1,
      skipBackup: true,
      allowsEditing: false,
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        resolve('cancelled');
      } else if (res.error) {
        reject(res.error);
      } else {
        const uri: string = Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri;
        resolve(uri);
      }
    });
  });
}