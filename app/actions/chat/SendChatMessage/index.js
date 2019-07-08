'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SendChatMessage
 */

import moment from 'moment';
import {addChatMessages} from '../AddChatMessages';
import * as actions from './actions';
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
  message: string,
  user: User,
  id: string,
  timestamp: string,
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
 * @param    {string}  message           The message the current user is sending in the session
 * @param    {object}  user              The user object for the current user
 * @param    {string}  user.id           The id of the current user
 * @param    {string}  user.displayName  The display name of the current user
 * @param    {string}  user.profileImage The profile image URL of the current user
 * @param    {number}  total             The new total amount of chat messages
 *
 * @return   {Promise}
 * @resolves {object}                    The message object the current user successfully sent in the session
 * @rejects  {Error}                     The error which caused the send chat message failure
 */
export function sendChatMessage(
  sessionID: string,
  message: string,
  user: User,
  total: number,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.sendChatMessageRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const chatMessagesRef: FirestoreDocs = sessionRef.collection('messages');
    
    let batch: FirestoreBatch = firestore.batch();

    try {
      const messageDoc: FirestoreDoc = chatMessagesRef.doc();
      const messageID: string = messageDoc.id;
      const newMessage: Message = {
        message,
        user,
        id: messageID,
        timestamp: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
      };

      batch.set(chatMessagesRef.doc(messageID), newMessage);
      batch.update(sessionRef, {'totals.messages': total});

      await batch.commit();
      dispatch(addChatMessages({[messageID]: newMessage}));
      dispatch(actions.sendChatMessageSuccess());
    } catch (err) {
      dispatch(actions.sendChatMessageFailure(err))
    }
  };
}
