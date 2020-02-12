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
import ImageCropPicker from 'react-native-image-crop-picker';

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
 * @resolves {string}        The uri of the image selected from the phone and cropped
 * @rejects  {Error}         The error which caused the failure
 */
function selectPhoto(
  title: string,
  includeBase64: boolean = false,
): Promise<string | {}> {
  return new Promise((resolve, reject) => {
    const options = {
      title,
      mediaType: 'photo',
      quality: 1,
      skipBackup: true,
    };

    ImagePicker.showImagePicker(options, async res => {
      if (res.didCancel) {
        resolve('cancelled');
      } else if (res.error) {
        reject(res.error);
      } else {
        const path: string = Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri;
        const croppedImage = await ImageCropPicker.openCropper(
          {
            path,
            includeBase64,
            width: 640,
            height: 640,
            cropperToolbarTitle: 'Crop Image',
          },
        );


        if (includeBase64) {
          await ImageCropPicker.clean();
          resolve(croppedImage);
        } else {
          resolve(croppedImage.path);
        }
      }
    });
  });
}

module.exports = selectPhoto;