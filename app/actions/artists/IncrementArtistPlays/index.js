'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementArtistPlays
 */

import * as actions from '../IncrementArtistPlays/actions';
import * as types from '../types';
import {type ThunkAction} from '../../../reducers/artists';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';
import updateObject from '../../../utils/updateObject';
import { addEntities } from '../../entities/AddEntities/reducers';

/**
  * Async function which increments the number of plays for an artist
  * 
  * @async
  * @function incrementArtistPlays
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @param    {string[]} artistsToAdd The artist id to increment the number of plays for
  * @param    {string}   userID       The user id to increment artist plays for
  *
  * @returns  {Promise}
  * @resolves {object}                The new amount of plays for an artist
  * @rejects  {Error}                 The error which caused teh increment artist plays failure
  */
export function incrementArtistPlays(
  artistsToAdd: Array<string>,
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const userRef: FirestoreDoc = firestore.collection('users').doc(userID);

    try {
      const promises = artistsToAdd.map(artistID => {
        const artistRef: FirestoreDoc = userRef.collection('artists').doc(artistID);

        return firestore.runTransaction(async transaction => {
          const doc: FirestoreDoc = await transaction.get(artistRef);

          if (!doc.exists) {
            throw new Error('Unable to retrieve the artist from Brassroots');
          }

          const {plays} = doc.data();

          transaction.update(artistRef, {plays: plays + 1});

          return plays + 1;
        });
      });

      const totals: Array<number> = await Promise.all(promises);
      const artists = artistsToAdd.reduce((obj, artistID, index) => {
        const userPlays = totals[index];
        return updateObject(obj, {[artistID]: {userPlays, id: artistID}});
      }, {});
      
      dispatch(addEntities({artists}));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
