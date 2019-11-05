'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopQueueListener
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/queue';

/**
 * Stop the realtime listener on the queue
 * 
 * @callback unsubscribe
 */

/**
 * Async function that stops the queue listener for the current user
 * 
 * @async
 * @function stopQueueListener
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {unsubscribe} unsubscribe The method to invoke to remove the Firestore listener
 * 
 * @return {object}                  Confirmation the queue listener has been stopped
 */
export function stopQueueListener(
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