'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetChat
 */

import moment from 'moment';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/chat';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the now playing session's chat messages
 * 
 * @async
 * @function getChat
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string}  userID    The Spotify id of the current user
 * @param  {string}  sessionID The session id to get the chat messages from
 *
 * @return {Promise}
 * @fulfil {object}            The chat messages from the now playing session
 * @reject {Error}             The error which caused the get chat failure
 */
export function getChat(
  userID: string,
  sessionID: string,
): ThunkAction {
  return (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const chatRef: FirestoreDocs = sessionRef.collection('messages');

    try {
      const unsubscribe = chatRef.orderBy('timeAdded', 'desc')
        .onSnapshot(
          {includeMetadataChanges: false},
          snapshot => {
            const messageIDs: Array<string> = snapshot.docs.map(m => m.data().id);
            const users = snapshot.docs.reduce((obj, doc) => {
              const {owner} = doc.data();
              if (owner.id === userID) return obj;
              return updateObject(obj, {[owner.id]: owner});
            }, {});

            const messages = snapshot.docs.reduce((obj, doc) => {
              const {...msg} = doc.data();
              const timestamp: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

              return updateObject(obj, {
                [msg.id]: {
                  id: msg.id,
                  text: msg.text,
                  read: msg.read.includes(userID),
                  timestamp: msg.timestamp ? msg.timestamp: timestamp,
                  sender: {
                    id: msg.owner.id,
                    name: msg.owner.displayName,
                    image: msg.owner.profileImage,
                  },
                },
              });
            }, {});

            dispatch(addEntities({users, messages}));
            dispatch(actions.success(messageIDs, unsubscribe));
          },
          error => {throw error},
        );
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
