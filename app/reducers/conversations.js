'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import {type SpotifyError} from '../utils/spotifyAPI/types';
import {type Action as EntitiesAction} from './entities';
import * as types from '../actions/conversations/types';
import * as entitiesTypes from '../actions/entities/types';

// Case Functions
import {addConversationRecipient} from '../actions/conversations/AddConversationRecipient/reducers';
import {clearNewConversation} from '../actions/conversations/ClearNewConversation/reducers';
import {removeConversationRecipient} from '../actions/conversations/RemoveConversationRecipient/reducers';
import {setNewConversationMessage} from '../actions/conversations/SetNewConversationMessage/reducers';

export const lastUpdated: string = moment().format("ddd, MMM D, YYYY, h:mm:ss a");

type DispatchAction = Action | EntitiesAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<Action>) => any;

type Message = {
  +lastUpdated?: string,
  +id?: ?string,
  +text?: ?string,
  +sender?: ?string,
  +fetchingSender?: boolean,
  +read?: Array<string>,
  +timestamp?: ?string,
  +mediaID?: ?string,
  +mediaType?: ?string,
  +fetchingMedia?: boolean,
};

type Conversation = {
  +lastUpdated?: string,
  +id?: ?string,
  +name?: ?string,
  +members?: Array<string>,
  +fetchingMembers?: boolean,
  +messages?: Array<string>,
  +fetchingMessages?: boolean,
  +sharedMusic?: Array<string>,
  +fetchingMusic?: boolean,
};

type Action = {
  +type?: string,
  +error?: Error,
  +recipientID?: string,
  +conversationID?: string,
  +message?: string,
};

type State = {
  +lastUpdated?: string,
  +userConversations?: Array<string>,
  +totalUserConversations?: number,
  +messagesByID?: {+[key: string]: Message},
  +totalMessages?: number,
  +selectedConversation?: ?string,
  +searchingConversations?: boolean,
  +fetchingConversations?: boolean,
  +isCreating?: boolean,
  +error?: ?Error | SpotifyError,
  +newConversation?: {
    +recipients: Array<string>,
    +message: string,
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
 * @property {string}   lastUpdated          The date/time the message was last updated
 * @property {string}   id=null              The Brassroots id of the message
 * @property {string}   text=null            The text of the message
 * @property {string}   sender=null          The Brassroots id of the message sender
 * @property {boolean}  fetchingSender=false Whether the current user is fetching the message sender info
 * @property {string[]} read                 The Brassroots ids of the users who have read the message
 * @property {string}   timestamp=null       The timestamp of the message
 * @property {string}   mediaID=null         The id of the media in the message
 * @property {string}   mediaType=null       The type of media in the message
 * @property {boolean}  fetchingMedia=false  Whether the current user is fetching the message media
 */
export const messageState: Message = {
  lastUpdated,
  id: null,
  text: null,
  sender: null,
  fetchingSender: false,
  read: [],
  timestamp: null,
  mediaID: null,
  mediaType: null,
  fetchingMedia: false,
};

/**
 * @constant
 * @type {object}
 * 
 * @property {string}   lastUpdated            The date/time the single conversation was last updated
 * @property {string}   id=null                The Brassroots id of a single conversation
 * @property {string}   name=null              The name of a single conversation
 * @property {string}   message                The message the current user is typing in a conversation
 * @property {string[]} members                The Brassroots ids of the members of a single conversation
 * @property {boolean}  fetchingMembers=false  Whether the current user is fetching the members of a single conversation
 * @property {string[]} messages               The Brassroots ids of the messages in a single conversation
 * @property {boolean}  fetchingMessages=false Whether the current user is fetching messages of a single conversation
 * @property {string[]} sharedMusic            The ids of the shared music in a single conversation
 * @property {boolean}  fetchingMusic=false    Whether the current user is fetching shared music of a single conversation
 */
export const conversationState: Conversation = {
  lastUpdated,
  id: null,
  name: null,
  message: '',
  members: [],
  fetchingMembers: false,
  messages: [],
  fetchingMessages: false,
  sharedMusic: [],
  fetchingMusic: false,
};

/**
 * @constant
 * @alias conversationsState
 * @type {object}
 * 
 * @property {string}   lastUpdated                  The date/time the conversations were last updated
 * @property {string[]} userConversations            The Brassroots ids of the current user's conversations
 * @property {number}   totalUserConversations=0     The total amount of user conversations
 * @property {string}   selectedConversation=null    The selected conversation to view
 * @property {boolean}  searchingConversations=false Whether the current user is searching conversations
 * @property {boolean}  fetchingConversations=false  Whether the current user is fetching conversations
 * @property {boolean}  isCreating=false             Whether the current user is creating a new conversation
 * @property {Error}    error=null                   The error related to conversations actions
 * @property {object}   newConversation              The new conversation the current user is creating
 * @property {string[]} newConversation.recipients   The Brassroots ids of the recipients for the new conversation
 * @property {string}   newConversation.message      The message to be sent with the new conversation
 */
export const initialState: State = {
  lastUpdated,
  userConversations: [],
  totalUserConversations: 0,
  selectedConversation: null,
  searchingConversations: false,
  fetchingConversations: false,
  isCreating: false,
  error: null,
  newConversation: {
    recipients: [],
    message: '',
  },
};

export function message(
  state: Message = messageState,
  action: Action,
): Message {
  switch (action.type) {
    default:
      return state;
  }
}

export function conversation(
  state: Conversation = conversationState,
  action: Action,
): Conversation {
  switch (action.type) {
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
      case types.ADD_CONVERSATION_RECIPIENT:
        return addConversationRecipient(state, action);
      case types.CLEAR_NEW_CONVERSATION:
        return clearNewConversation(state);
      case types.REMOVE_CONVERSATION_RECIPIENT:
        return removeConversationRecipient(state, action);
      case types.SET_NEW_CONVERSATION_MESSAGE:
        return setNewConversationMessage(state, action);
      default:
        return state;
    }
  }

  return state;
}