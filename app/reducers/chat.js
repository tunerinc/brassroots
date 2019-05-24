'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import type {SpotifyError} from '../utils/spotifyAPI/types';
import * as types from '../actions/chat/types';

// Case Functions
import {addSingleMessage, addMessages} from '../actions/chat/AddChatMessages/reducers';
import * as getChat from '../actions/chat/GetChat/reducers';
import {removeChatMessage} from '../actions/chat/RemoveChatMessage/reducers';
import * as sendChatMessage from '../actions/chat/SendChatMessage/reducers';
import {setChatMessage} from '../actions/chat/SetChatMessage/reducers';
import * as stopChatListener from '../actions/chat/StopChatListener/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type ChatMessage = {
  +id?: ?string,
  +text?: ?string,
  +userID?: ?string,
  +timestamp?: ?string,
  +error?: ?Error | SpotifyError,
};

type Action = {
  +type?: string,
  +error?: Error,
  +messages?: {[id: string]: ChatMessage} | Array<string>,
  +unsubscribe?: () => void,
  +chatID?: string,
  +message?:
    | string
    | {
    +id?: ?string,
    +text?: ?string,
    +userID?: ?string,
    +timestamp?: ?string,
  },
};

type State = {
  +lastUpdated?: string,
  +message?: string,
  +currentChat?: Array<string>,
  +chatByID?: {+[key: string]: ChatMessage},
  +totalChatMessages?: number,
  +sendingMessage?: boolean,
  +fetchingChat?: boolean,
  +chatUnsubscribe?: ?() => void,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  ChatMessage,
  Action,
  State,
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
export const singleState: ChatMessage = {
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

export function singleChat(
  state: ChatMessage = singleState,
  action: Action,
): ChatMessage {
  switch (action.type) {
    case types.ADD_CHAT_MESSAGES:
      return addSingleMessage(state, action);
    default:
      return state;
  }
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.ADD_CHAT_MESSAGES:
        return addMessages(state, action);
      case types.GET_CHAT_REQUEST:
        return getChat.request(state);
      case types.GET_CHAT_SUCCESS:
        return getChat.success(state, action);
      case types.GET_CHAT_FAILURE:
        return getChat.failure(state, action);
      case types.REMOVE_CHAT_MESSAGE:
        return removeChatMessage(state, action);
      case types.RESET_CHAT:
        return initialState;
      case types.SEND_CHAT_MESSAGE_REQUEST:
        return sendChatMessage.request(state);
      case types.SEND_CHAT_MESSAGE_SUCCESS:
        return sendChatMessage.success(state);
      case types.SEND_CHAT_MESSAGE_FAILURE:
        return sendChatMessage.failure(state, action);
      case types.SET_CHAT_MESSAGE:
        return setChatMessage(state, action);
      case types.STOP_CHAT_LISTENER_REQUEST:
        return state;
      case types.STOP_CHAT_LISTENER_SUCCESS:
        return stopChatListener.success(state);
      case types.STOP_CHAT_LISTENER_FAILURE:
        return stopChatListener.failure(state, action);
      default:
        return state;
    }
  }

  return state;
}