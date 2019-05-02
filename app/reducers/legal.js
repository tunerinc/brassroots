'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/legal/types';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type State = {
  +privacy: {
    +lastUpdated: string,
    +text: string,
    +fetchingPrivacy: boolean,
    +refreshingPrivacy: boolean,
    +error: ?Error,
  },
  +terms: {
    +lastUpdated: string,
    +text: string,
    +fetchingTerms: boolean,
    +refreshingTerms: boolean,
    +error: ?Error,
  },
};

/**
 * @constant
 * @alias legalState
 * @type {object}
 * 
 * @property {object}  privacy                         The privacy policy object
 * @property {string}  privacy.lastUpdated             The date/time the privacy policy object was last updated
 * @property {string}  privacy.text                    The text of the privacy policy
 * @property {boolean} privacy.fetchingPrivacy=false   Whether the current user is fetching the privacy policy
 * @property {boolean} privacy.refreshingPrivacy=false Whether the current user is refreshing the privacy policy
 * @property {Error}   privacy.error=null              The error related to the privacy policy actions
 * @property {object}  terms                           The terms of service object
 * @property {string}  terms.lastUpdated               The date/time the terms of service object was last updated
 * @property {string}  terms.text                      The text of the terms of service
 * @property {boolean} terms.fetchingTerms=false       Whether the current user is fetching the terms of service
 * @property {boolean} terms.refreshingTerms=false     Whether the current user is refreshing the terms of service
 * @property {Error}   terms.error=null                The error related to the terms of service actions
 */
export const initialState = {
  privacy: {
    lastUpdated,
    text: '',
    fetchingPrivacy: false,
    refreshingPrivacy: false,
    error: null,
  },
  terms: {
    lastUpdated,
    text: '',
    fetchingTerms: false,
    refreshingTerms: false,
    error: null,
  },
};

export default function reducer(
  state: State = initialState,
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}