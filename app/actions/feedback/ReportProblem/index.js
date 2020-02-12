'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ReportProblem
 */

import * as actions from './actions';
import {
  type Action,
  type State,
  type ThunkAction,
} from '../../../reducers/feedback';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc
} from '../../../utils/firebaseTypes';

type Problem = {
  categories: Array<string>,
  message: string,
};

/**
 * Async function which reports a problem from the current user
 * 
 * @async
 * @function reportProblem
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}   userID             The user id of the current user
 * @param    {object}   problem            The problem the current user wants to report
 * @param    {string[]} problem.categories The category types of the report
 * @param    {string}   problem.message    The message the current user has added
 *
 * @returns  {Promise}
 * @resolves {object}                      The reported problem from the current user
 * @rejects  {Error}                       The error which caused the report problem failure
 *
 */
export function reportProblem(
  userID: string,
  problem: Problem,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const feedbackRef: FirestoreRef = firestore.collection('feedback');

    try {
      const feedbackDoc: FirestoreDoc = feedbackRef.doc();
      const feedbackID: string = feedbackDoc.id;

      await feedbackRef.doc(feedbackID).set({...problem, userID, id: feedbackID, type: 'problem'});
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
