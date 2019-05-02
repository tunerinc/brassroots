'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import type {SpotifyError} from '../utils/spotifyAPI/types';
import * as types from '../actions/events/types';

const lastUpdated: string = moment().format("ddd, MMM D, YYYY, h:mm:ss a");

export type SingleMessage = {
  +lastUpdated: string,
  +id: ?string,
  +text: ?string,
  +sender: ?string,
  +fetchingSender: boolean,
  +read: Array<string>,
  +timestamp: ?string,
  +mediaID: ?string,
  +mediaType: ?string,
  +fetchingMedia: boolean,
};

export type SingleConversation = {
  +lastUpdated: string,
  +id: ?string,
  +name: ?string,
  +members: Array<string>,
  +fetchingMembers: boolean,
  +messages: Array<string>,
  +fetchingMessages: boolean,
  +sharedMusic: Array<string>,
  +fetchingMusic: boolean,
};

export type State = {
  +lastUpdated: string,
  +userConversations: Array<string>,
  +conversationsByID: {+[key: string]: SingleConversation},
  +totalConversations: number,
  +messagesByID: {+[key: string]: SingleMessage},
  +totalMessages: number,
  +selectedConversation: ?string,
  +searchingConversations: boolean,
  +fetchingConversations: boolean,
  +error: ?Error | SpotifyError,
  +newConversation: {
    +recipients: Array<string>,
    +message: string,
  },
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
const singleMessageState: SingleMessage = {
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
 * @property {string[]} members                The Brassroots ids of the members of a single conversation
 * @property {boolean}  fetchingMembers=false  Whether the current user is fetching the members of a single conversation
 * @property {string[]} messages               The Brassroots ids of the messages in a single conversation
 * @property {boolean}  fetchingMessages=false Whether the current user is fetching messages of a single conversation
 * @property {string[]} sharedMusic            The ids of the shared music in a single conversation
 * @property {boolean}  fetchingMusic=false    Whether the current user is fetching shared music of a single conversation
 */
const singleConversationState: SingleConversation = {
  lastUpdated,
  id: null,
  name: null,
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
 * @property {object}   conversationsByID            The conversation objects with the Brassroots ids as the key
 * @property {number}   totalConversations=0         The total amount of conversations
 * @property {object}   messagesByID                 The message objects with the Brassroots ids as the key
 * @property {number}   totalMessages=0              The total amount of messages
 * @property {string}   selectedConversation=null    The selected conversation to view
 * @property {boolean}  searchingConversations=false Whether the current user is searching conversations
 * @property {boolean}  fetchingConversations=false  Whether the current user is fetching conversations
 * @property {Error}    error=null                   The error related to conversations actions
 * @property {object}   newConversation              The new conversation the current user is creating
 * @property {string[]} newConversation.recipients   The Brassroots ids of the recipients for the new conversation
 * @property {string}   newConversation.message      The message to be sent with the new conversation
 */
export const initialState: State = {
  lastUpdated,
  userConversations: [],
  conversationsByID: {},
  totalConversations: 0,
  messagesByID: {},
  totalMessages: 0,
  selectedConversation: null,
  searchingConversations: false,
  fetchingConversations: false,
  error: null,
  newConversation: {
    recipients: [],
    message: '',
  },
};

function singleMessage(
  state: SingleMessage = singleMessageState,
  action: {type: string},
): SingleMessage {
  switch (action.type) {
    default:
      return state;
  }
}

function singleConversation(
  state: SingleConversation = singleConversationState,
  action: {type: string},
): SingleConversation {
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