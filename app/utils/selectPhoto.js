'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SelectPhoto
 */

import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';

/**
 * Opens the image picker to select a photo from the phone
 * 
 * @function selectPhoto
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  title The title of the view when selecting the image
 * 
 * @returns  {Promise}
 * @resolves {string}        The uri of the image selected from the phone
 * @rejects  {Error}         The error which caused the failure
 */
function selectPhoto(
  title: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      title,
      mediaType: 'photo',
      quality: 1,
      skipBackup: true,
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

module.exports = selectPhoto;