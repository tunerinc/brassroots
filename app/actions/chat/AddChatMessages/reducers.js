'use strict';

/**
 * @module AddChatMessagesReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleChat, lastUpdated} from '../../../reducers/chat';

/**
 * Adds a single chat message to Redux
 * 
 * @function addSingleMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state           The Redux state
 * @param   {object} action          The Redux action
 * @param   {string} action.type     The type of Redux action
 * @param   {object} action.messages The message objects from the chat
 * @param   {object} action.message  The message object to add from the chat
 * @param   {string} id=null         The Brassroots id of the chat message
 * @param   {string} text=null       The text in the chat message
 * @param   {string} userID=null     The Brassroots id of the user who sent the chat message
 * @param   {string} timestamp=null  The date/time the chat message was sent
 * 
 * @returns {object}                 The state of the single chat message added
 */
export function addSingleMessage(state, action) {
  const {message} = action;
  return updateObject(state, {...message, error: null});
};

/**
 * Adds chat messages from the current session to Redux
 * 
 * @function addChatMessages
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state           The Redux state
 * @param   {object} action          The Redux action
 * @param   {string} action.type     The type of Redux action
 * @param   {object} action.messages The message objects from the chat
 * 
 * @returns {object}                 The state with the chat messages added
 */
export function addMessages(state, action) {
  const {messages} = action;

  let {chatByID} = state;

  Object.values(messages).forEach(message => {
    const addedChat = singleChat(chatByID[message.id], {...action, message});
    chatByID = updateObject(chatByID, {[message.id]: addedChat});
  });

  return updateObject(state, {
    chatByID,
    lastUpdated,
    totalChatMessages: Object.keys(chatByID).length,
    sendingMessage: false,
    error: null,
  });
};