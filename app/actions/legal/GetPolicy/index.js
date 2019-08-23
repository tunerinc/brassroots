'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPolicy
 */

import fetchRemoteURL from '../../../utils/fetchRemoteURL';
import * as actions from './actions';
import {
  type Action,
  type ThunkAction,
} from '../../../reducers/legal';

/**
 * Async function that gets the most recent privacy policy from Ultrasound
 * 
 * @async
 * @function getPolicy
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {boolean} [refreshing=false] Whether the current user is refreshing the privacy policy
 *
 * @returns  {Promise}
 * @resolves {string}                     The most recent privacy policy retrieved from Ultrasound
 * @rejects  {Error}                      The error which caused the get privacy policy failure
 */
export function getPolicy(
  refreshing: boolean = false,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.request(refreshing));

    try {
      const policyURL: string = 'https://ps.tiunncer.com/policy';
      // const html: string = await fetchRemoteURL(policyURL, 'text');
      // dispatch(actions.success(html));
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
