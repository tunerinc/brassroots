'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as EntitiesAction, entityTypeState} from './entities';
import {type Action as ChatAction} from './chat';
import * as types from '../actions/conversations/types';
import * as entitiesTypes from '../actions/entities/types';
import * as chatTypes from '../actions/chat/types';

// Case Functions

export const lastUpdated: string = moment().format("ddd, MMM D, YYYY, h:mm:ss a");

type DispatchAction = Action | EntitiesAction | ChatAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type Message = {
  +lastUpdated?: string,
  +id?: ?string,
  +text?: ?string,
  +read?: boolean,
  +timestamp?: ?string,
  +error?: ?Error,
  +sender?: ?{
    +id: string,
    +image: string,
    +name: string,
  },
  +media?: ?{
    +id: string,
    +type: string,
  },
};

type Conversation = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +text?: ?string,
  +members?: Array<string>,
  +messages?: Array<string>,
  +music?: Array<string>,
};

type Action = {
  +type?: string,
  +error?: Error,
  +userID?: string,
  +conversationID?: string,
  +message?: string,
  +updates?: State,
  +item?: Conversation,
  +refreshing?: boolean,
};

type State = {
  +lastUpdated?: string,
  +userConversations?: Array<string>,
  +totalUserConversations?: number,
  +selectedConversation?: ?string,
  +searching?: boolean,
  +fetching?: Array<string>,
  +creating?: boolean,
  +error?: ?Error | SpotifyError,
  +newConversation?: {
    +users?: Array<string>,
    +text?: ?string,
  },
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Message,
  Conversation,
  Action,
  State,
};

/**
 * @constant
 * @type {object}
 * 
 * @property {string}  lastUpdated    The date/time the message was last updated
 * @property {string}  id=null        The Brassroots id of the message
 * @property {string}  text=null      The text of the message
 * @property {boolean} read=false     The Brassroots ids of the users who have read the message
 * @property {string}  timestamp=null The timestamp of the message
 * @property {object}  sender=null    The sender of the message
 * @property {string}  sender.id      The Spotify id of the sender
 * @property {string}  sender.image   The image of the sender
 * @property {string}  sender.name    The name of the sender
 * @property {object}  media=null     The media included in the message
 * @property {string}  media.id       The id of the media
 * @property {string}  media.type     The type of media
 * @property {Error}   error          Any errors that may arise for a message
 */
export const messageState: Message = {
  lastUpdated,
  id: null,
  text: null,
  read: false,
  timestamp: null,
  sender: null,
  media: null,
  error: null,
};

/**
 * @constant
 * @type {object}
 * 
 * @property {string}   lastUpdated The date/time the single conversation was last updated
 * @property {string}   id=null     The Brassroots id of a single conversation
 * @property {string}   name=null   The name of a single conversation
 * @property {string}   text=null   The message the current user is typing in a conversation
 * @property {string[]} members     The Brassroots ids of the members of a single conversation
 * @property {string[]} messages    The Brassroots ids of the messages in a single conversation
 * @property {string[]} music       The ids of the shared music in a single conversation
 */
export const conversationState: Conversation = {
  lastUpdated,
  id: null,
  name: null,
  text: null,
  members: [],
  messages: [],
  music: [],
};

/**
 * @constant
 * @alias conversationsState
 * @type {object}
 * 
 * @property {string}   lastUpdated               The date/time the conversations were last updated
 * @property {string[]} userConversations         The Brassroots ids of the current user's conversations
 * @property {number}   totalUserConversations=0  The total amount of user conversations
 * @property {string}   selectedConversation=null The selected conversation to view
 * @property {boolean}  searching=false           Whether the current user is searching conversations
 * @property {boolean}  fetching=[]               Whether the current user is fetching any entity type
 * @property {boolean}  creating=false            Whether the current user is creating a new conversation
 * @property {Error}    error=null                The error related to conversations actions
 * @property {object}   newConversation           The new conversation the current user is creating
 * @property {string[]} newConversation.users     The Spotify ids of the recipients for the new conversation
 * @property {string}   newConversation.text=null The message to be sent with the new conversation
 */
export const initialState: State = {
  lastUpdated,
  userConversations: [],
  totalUserConversations: 0,
  selectedConversation: null,
  searching: false,
  fetching: [],
  creating: false,
  error: null,
  newConversation: {
    users: [],
    text: null,
  },
};

export function message(
  state: Message = messageState,
  action: DispatchAction,
): Message {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return updateObject(state, {...(typeof action.item === 'object' ? action.item : {})});
    default:
      return state;
  }
}

/**
 * Adds or updates a single conversation
 * 
 * @function addOrUpdateConversation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {object} action.item The conversation object to add or update
 * 
 * @returns {object}             The single conversation added or updated with the new information
 */
function addOrUpdateConversation(
  state: Conversation,
  action: Action,
): Conversation {
  const {members, messages, music} = state;
  const {item, refreshing} = action;
  const updates: Conversation = (
    item
    && Array.isArray(members)
    && Array.isArray(messages)
    && Array.isArray(music)
  )
    ? {
      ...item,
      lastUpdated,
      members: item.members && refreshing
        ? [...item.members]
        : item.members
        ? [...members, ...item.members].filter((el, i, arr) => i === arr.indexOf(el))
        : [...members],
      messages: item.messages && refreshing
        ? [...item.messages]
        : item.messages
        ? [...messages, ...item.messages].filter((el, i, arr) => i === arr.indexOf(el))
        : [...messages],
      music: item.music && refreshing
        ? [...item.music]
        : item.music
        ? [...music, ...item.music].filter((el, i, arr) => i === arr.indexOf(el))
        : [...music],
    }
    : {};

  return updateObject(state, updates);
}

export function conversation(
  state: Conversation = conversationState,
  action: Action,
): Conversation {
  switch (action.type) {
    case entitiesTypes.ADD_ENTITIES:
      return addOrUpdateConversation(state, action);
    default:
      return state;
  }
}

/**
 * Updates any of the values in the conversations state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {object} action.updates The updates to make to the state
 * 
 * @returns {object}                The state updated with the new information
 */
function update(
  state: State,
  action: Action,
): State {
  const {newConversation: oldConvo} = state;
  const updates: State = oldConvo && action.updates
    ? {
      ...action.updates,
      newConversation: action.updates.newConversation
        ? updateObject(oldConvo, action.updates.newConversation)
        : {...oldConvo},
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
      case types.UPDATE_CONVERSATIONS:
        return update(state, action);
      default:
        return state;
    }
  }

  return state;
}