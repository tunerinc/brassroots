'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/share/types';

// Case Functions
import {addSharedItems} from '../actions/share/AddSharedItems/reducers';
import {addShareRecipient} from '../actions/share/AddShareRecipient/reducers';
import {removeShareRecipient} from '../actions/share/RemoveShareRecipient/reducers';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type SharedItems = {
  +[key: string]: {
    +id: string,
    +type: string,
  }
};

export type Action = {
  +type?: string,
  +error?: Error,
  +items?: SharedItems,
  +recipientID?: string,
};

export type State = {
  +lastUpdated?: string,
  +sharedItem?: {
    +id: string,
    +type: string,
  },
  +message?: string,
  +recipients?: Array<string>,
  +searching?: boolean,
  +sharing?: boolean,
  +error?: ?Error,
};

/**
 * @constant
 * @alias shareState
 * @type {object}
 * 
 * @property {string}   lastUpdated     The date/time the share was last updated
 * @property {object}   sharedItem      The music item to share
 * @property {string}   sharedItem.id   The id of the item to share
 * @property {string}   sharedItem.type The type of item to share
 * @property {string}   message         The message to send with the share
 * @property {string[]} recipients      The Brassroots ids of the recipients of the share
 * @property {boolean}  searching=false Whether the current user is searching for a user to share with
 * @property {boolean}  sharing=false   Whether the current user is sharing media or not
 * @property {Error}    error=null      The error related to share actions
 */
export const initialState: State = {
  lastUpdated,
  sharedItem: {
    id: '',
    type: '',
  },
  message: '',
  recipients: [],
  searching: false,
  sharing: false,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.ADD_SHARED_ITEMS:
        return addSharedItems(state, action);
      case types.ADD_SHARE_RECIPIENT:
        return addShareRecipient(state, action);
      case types.CLEAR_SHARE:
        return initialState;
      case types.REMOVE_SHARE_RECIPIENT:
        return removeShareRecipient(state, action);
      default:
        return state;
    }
  }

  return state;
}