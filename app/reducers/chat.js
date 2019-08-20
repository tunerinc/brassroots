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
import * as entityTypes from '../actions/entities/types';
import {type Action as EntitiesAction} from './entities';
import {
  messageState,
  type Message,
} from './conversations';

// Case Functions
import {addSingleMessage, addMessages} from '../actions/chat/AddChatMessages/reducers';
import * as getChat from '../actions/chat/GetChat/reducers';
import * as sendChatMessage from '../actions/chat/SendChatMessage/reducers';
import {setChatMessage} from '../actions/chat/SetChatMessage/reducers';
import * as stopChatListener from '../actions/chat/StopChatListener/reducers';
import {updateSingleMessage, updateChatMessage} from '../actions/chat/UpdateChatMessage/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction = Action | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type Action = {
  +type?: string,
  +error?: Error,
  +messages?: {[id: string]: Message} | Array<string>,
  +unsubscribe?: () => void,
  +chatID?: string,
  +updates?: {
    +text?: string,
  },
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
  +totalCurrentChat?: number,
  +sendingMessage?: boolean,
  +fetchingChat?: boolean,
  +unsubscribe?: ?() => void,
  +error?: ?Error | SpotifyError,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Action,
  State,
};

/**
 * @callback unsub
 */

/**
 * @constant
 * @alias chatState
 * @type {object}
 * 
 * @property {string}   lastUpdated        The date/time the chat was last updated
 * @property {string}   message            The current message from the current user in the session
 * @property {string[]} currentChat        The Brassroots ids of the chat messages in the session
 * @property {number}   totalCurrentChat=0 The total amount of chat messages in the session
 * @property {string}   sending=null       Whether the current user is sending any given item type
 * @property {string}   fetching=null      Whether the current user is fetching any given item type
 * @property {unsub}    unsubscribe=null   The function to invoke to unsubscribe the chat listener
 */
export const initialState: State = {
  lastUpdated,
  message: '',
  currentChat: [],
  totalCurrentChat: 0,
  sending: null,
  fetching: null,
  unsubscribe: null,
  error: null,
};

export function chatMessage(
  state: Message = messageState,
  action: Action,
): Message {
  switch (action.type) {
    case entityTypes.ADD_ENTITIES:
      return addSingleMessage(state, action);
    case entityTypes.UPDATE_ENTITIES:
      return updateSingleMessage(state, action);
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
      case types.UPDATE_CHAT_MESSAGE:
        return updateChatMessage(state, action);
      default:
        return state;
    }
  }

  return state;
}