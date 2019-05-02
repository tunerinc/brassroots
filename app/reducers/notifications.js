'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import * as types from '../actions/notifications/types';

const currentDate: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type Notification = {

};

export type State = {
  +userNotifications: Array<string>,
  +notificationsByID: {+[key: string]: Notification},
  +totalNotifications: number,
  +fetchingNotifications: boolean,
  +lastUpdated: string,
  +error: ?Error,
};

/**
 * @constant
 * @alias notificationsState
 * @type {object}
 * 
 * @property {string[]} userNotifications           The Brassroots ids of the current user's notifications
 * @property {object}   notificationsByID           The notification objects with the Brassroots ids as the key
 * @property {number}   totalNotifications=0        The total amount of notifications
 * @property {boolean}  fetchingNotifications=false Whether the current user is fetching notifications
 * @property {string}   lastUpdated                 The date/time the notifications were last updated
 * @property {Error}    error=null                  The error related to notifications actions
 */
export const initialState: State = {
  userNotifications: [],
  notificationsByID: {},
  totalNotifications: 0,
  fetchingNotifications: false,
  lastUpdated: currentDate,
  error: null,
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