'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopChatListener
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/chat';

/**
 * Stop the realtime listener on the queue
 * 
 * @callback unsubscribe
 */

/**
 * Async function that stops the listener for retrieving the chat messages
 * 
 * @async
 * @function stopChatListener
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {unsubscribe} unsubscribe The method to invoke to remove the Firestore listener
 *
 * @return   {Promise}
 * @resolves {object}                  Confirmation the chat listener was stopped
 * @rejects  {Error}                   The error which cuased the stop chat listener failure
 */
export function stopChatListener(
  unsubscribe: () => void,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.request());

    try {
      unsubscribe();
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}