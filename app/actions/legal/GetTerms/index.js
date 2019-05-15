'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTerms
 */

import fetchRemoteURL from '../../../utils/fetchRemoteURL';
import * as actions from './actions';
import type {Action} from '../../../reducers/legal';

type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

/**
 * Async function that gets the most recent terms of service from Ultrasound
 * 
 * @async
 * @function getTerms
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {boolean} [refreshing=false] Whether the current user is refreshing the terms of service
 *
 * @returns  {Promise}
 * @resolves {string}                     The most recent terms of service retrieved from Ultrasound
 * @rejects  {Error}                      The error which caused the get terms service failure
 */
export function getTerms(
  refreshing: boolean = false,
): ThunkAction {
  return async dispatch => {
    dispatch(actions.getTermsRequest(refreshing));

    try {
      const termsURL: string = 'https://ps.tiunncer.com/terms';
      const html: string = await fetchRemoteURL(termsURL, 'text');
      dispatch(actions.getTermsSuccess(html));
    } catch (err) {
      dispatch(actions.getTermsFailure(err));
    }
  };
}
