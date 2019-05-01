'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import type {SpotifyError} from '../utils/spotifyAPI/types';
import * as types from '../actions/chat/types';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type ChatMessage = {
  +id: ?string,
  +text: ?string,
  +userID: ?string,
  +timestamp: ?string,
  +error: ?Error | SpotifyError,
};

export type State = {
  +lastUpdated: string,
  +message: string,
  +currentChat: Array<string>,
  +chatByID: {+[key: string]: ChatMessage},
  +totalChatMessages: number,
  +sendingMessage: boolean,
  +fetchingChat: boolean,
  +chatUnsubscribe: ?() => void,
  +error: ?Error | SpotifyError,
};

/**
 * @callback chatUnsub
 */

/**
 * @constant
 * @alias singleChatState
 * @type {object}
 * 
 * @property {string} id=null        The Brassroots id of the chat message
 * @property {string} text=null      The text in the chat message
 * @property {string} userID=null    The Brassroots id of the user who sent the chat message
 * @property {string} timestamp=null The date/time the chat message was sent
 * @property {Error}  error=null     The error related to the chat message actions
 */
const singleState: ChatMessage = {
  id: null,
  text: null,
  userID: null,
  timestamp: null,
  error: null,
};

/**
 * @constant
 * @alias chatState
 * @type {object}
 * 
 * @property {string}    lastUpdated          The date/time the chat was last updated
 * @property {string}    message              The current message from the current user in the session
 * @property {string[]}  currentChat          The Brassroots ids of the chat messages in the session
 * @property {object}    chatByID             The chat message objects with the message id as the key
 * @property {number}    totalChatMessages=0  The total amount of chat messages in the session
 * @property {boolean}   sendingMessage=false Whether the current user is sending the current chat message
 * @property {boolean}   fetchingChat=false   Whether the current user is fetching the chat of a session
 * @property {chatUnsub} chatUnsubscribe=null The function to invoke to unsubscribe the chat listener
 */
export const initialState: State = {
  lastUpdated,
  message: '',
  currentChat: [],
  chatByID: {},
  totalChatMessages: 0,
  sendingMessage: false,
  fetchingChat: false,
  chatUnsubscribe: null,
  error: null,
};

function singleChat(
  state: ChatMessage = singleState,
  action: {type: string},
): ChatMessage {
  switch (action.type) {
    default:
      return state;
  }
}

export default function reducer(
  state: State = initialState,
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}