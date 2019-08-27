'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import * as types from '../actions/share/types';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type SharedItems = {
  +[key: string]: {
    +id: string,
    +type: string,
  }
};

type Action = {
  +type?: string,
  +error?: Error,
  +items?: SharedItems,
  +recipientID?: string,
  +updates?: State,
};

type State = {
  +lastUpdated?: string,
  +sharedItem?: {
    +id: string,
    +type: string,
  },
  +text?: string,
  +recipients?: Array<string>,
  +searching?: boolean,
  +sharing?: boolean,
  +error?: ?Error,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  SharedItems,
  Action,
  State,
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
 * @property {string}   text            The text to send with the share
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
  text: '',
  recipients: [],
  searching: false,
  sharing: false,
  error: null,
};

/**
 * Updates any of the values in the share state
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
  const {sharedItem: oldItem} = state;
  const updates: State = oldItem && action.updates
    ? {
      ...action.updates,
      sharedItem: action.updates.sharedItem
        ? updateObject(oldItem, action.updates.sharedItem)
        : {...oldItem},
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
      case types.RESET_SHARE:
        return initialState;
      case types.UPDATE_SHARE:
        return update(state, action);
      default:
        return state;
    }
  }

  return state;
}