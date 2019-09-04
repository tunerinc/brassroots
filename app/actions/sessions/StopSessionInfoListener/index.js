'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopSessionInfoListener
 */

import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/sessions';

/**
 * Stop the realtime listener on the queue
 * 
 * @callback unsubscribe
 */

/**
 * Async function that stops the listener for the info from a session
 * 
 * @async
 * @function stopSessionInfoListener
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {unsubscribe} unsubscribe The session id to stop the info listener for
 * 
 * @return   {Promise}
 * @resolves {object}                  Confirmation the session info listener was stopped
 * @rejects  {Error}                   The error which cuased the stop session info listener failure
 */
export function stopSessionInfoListener(
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