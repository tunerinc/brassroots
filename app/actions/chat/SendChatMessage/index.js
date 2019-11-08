'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SendChatMessage
 */

import moment from 'moment';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/chat';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type User = {
  +id: string,
  +displayName: string,
  +profileImage: string,
};

type Message = {
  text: string,
  id: string,
  timestamp: string,
  sender: {
    id: string,
    name: string,
    image: string,
  },
};

/**
 * Async function that sends a chat message for the current user in the session
 * 
 * @async
 * @function sendChatMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  sessionID         The session id to send a chat message inside of for the current user
 * @param    {string}  text              The message the current user is sending in the session
 * @param    {object}  owner              The user object for the current user
 * @param    {string}  owner.id           The id of the current user
 * @param    {string}  owner.displayName  The display name of the current user
 * @param    {string}  owner.profileImage The profile image URL of the current user
 * @param    {number}  total             The new total amount of chat messages
 *
 * @return   {Promise}
 * @resolves {object}                    The message object the current user successfully sent in the session
 * @rejects  {Error}                     The error which caused the send chat message failure
 */
export function sendChatMessage(
  sessionID: string,
  text: string,
  owner: User,
  total: number,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const chatRef: FirestoreDocs = sessionRef.collection('messages');
    
    let batch: FirestoreBatch = firestore.batch();

    try {
      const messageDoc: FirestoreDoc = chatRef.doc();
      const messageID: string = messageDoc.id;
      const newMessage = {
        text,
        owner,
        id: messageID,
        timestamp: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
        timeAdded: firestore.FieldValue.serverTimestamp(),
        read: [owner.id],
      };

      batch.set(chatRef.doc(messageID), newMessage);
      batch.update(sessionRef, {'totals.messages': total});

      dispatch(actions.success());
      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err))
    }
  };
}
