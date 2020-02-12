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
  +unsubscribe?: ?() => void,
  +chatID?: string,
  +updates?: State,
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
  +currentChat?: Array<string>,
  +totalCurrentChat?: number,
  +fetching?: Array<string>,
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
 * @property {string}   text               The current text in the chat
 * @property {string[]} currentChat        The Brassroots ids of the chat messages in the session
 * @property {number}   totalCurrentChat=0 The total amount of chat messages in the session
 * @property {string[]} fetching=[]        Whether the current user is fetching any given item type
 * @property {unsub}    unsubscribe=null   The function to invoke to unsubscribe the chat listener
 */
export const initialState: State = {
  lastUpdated,
  currentChat: [],
  totalCurrentChat: 0,
  fetching: [],
  unsubscribe: null,
  error: null,
};

/**
 * Updates the state by adding/removing values
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} type        The type to remove from the fetching array
 * 
 * @returns {object}             The state with the updated values
 */
function update(
  state: State,
  action: Action,
  type?: string,
): State {
  const {totalCurrentChat, unsubscribe, fetching: oldFetch, currentChat: oldChat} = state;
  const add: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const haveError: boolean = typeof action.type === 'string' && action.type.includes('FAILURE');
  const stopListener: boolean = action.type === types.STOP_CHAT_LISTENER_SUCCESS;
  const updates: State = Array.isArray(oldFetch) && Array.isArray(oldChat)
    ? {
      lastUpdated,
      fetching: add && type ? oldFetch.concat(type) : type ? oldFetch.filter(t => t !== type) : oldFetch,
      error: haveError ? action.error : null,
      totalCurrentChat: Array.isArray(action.messages) ? action.messages.length : totalCurrentChat,
      currentChat: Array.isArray(action.messages) ? [...action.messages] : [...oldChat],
      unsubscribe: action.unsubscribe ? action.unsubscribe : stopListener ? null : unsubscribe,
    }
    : {};

  return updateObject(state, updates);
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.GET_CHAT_REQUEST:
      case types.GET_CHAT_FAILURE:
      case types.STOP_CHAT_LISTENER_SUCCESS:
        return update(state, action, 'chat');
      case types.GET_CHAT_SUCCESS:
      case types.STOP_CHAT_LISTENER_FAILURE:
        return update(state, action);
      case types.RESET_CHAT:
        return initialState;
      case types.SEND_CHAT_MESSAGE_REQUEST:
      case types.SEND_CHAT_MESSAGE_SUCCESS:
      case types.SEND_CHAT_MESSAGE_FAILURE:
        return update(state, action, 'message');
      case types.STOP_CHAT_LISTENER_REQUEST:
        return state;
      case types.UPDATE_CHAT:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}