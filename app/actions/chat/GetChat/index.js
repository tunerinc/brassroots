'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetChat
 */

import {addUsers} from '../../users/AddUsers';
import {addChatMessages} from '../AddChatMessages';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/chat';
import {type FirebaseInstance} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the now playing session's chat messages
 * 
 * @async
 * @function getChat
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string}  sessionID The session id to get the chat messages from
 *
 * @return {Promise}
 * @fulfil {object}            The chat messages from the now playing session
 * @reject {Error}             The error which caused the get chat failure
 */
export function getChat(
  sessionID: string,
): ThunkAction {
  return (dispatch, _, {getFirebase, getFirestore}) => {
    dispatch(actions.getChatRequest());

    const firebase: FirebaseInstance = getFirebase();

    let people = {};

    const unsubscribe = firebase.database()
      .ref(`sessions/live/${sessionID}/messages`)
      .limitToLast(100)
      .on('value', dbMessages => {
        if (dbMessages && dbMessages.val()) {
          const messages = dbMessages.reduce((obj, msg) => {
            const {user} = msg.val();
            people = updateObject(people, {[user.id]: {...user}});
            return updateObject(obj, {[msg.val().id]: {...msg.val()}});
          }, {});

          if (Object.keys(people).length !== 0) {
            dispatch(addUsers(people));
          };

          dispatch(addChatMessages(messages));
          dispatch(actions.getChatSuccess(dbMessages.map(m => m.val().id), unsubscribe));
        }
      },
      err => dispatch(actions.getChatFailure(err)));
  };
}
