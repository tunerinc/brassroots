'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ReportProblem
 */

import * as actions from './actions';
import type {Action, State} from '../../../reducers/feedback';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreRef,
  FirestoreDoc
} from '../../../utils/firebaseTypes';

type Problem = {
  categories: Array<string>,
  message: string,
};

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

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
    dispatch(actions.reportProblemRequest());

    const firestore: FirestoreInstance = getFirestore();
    const feedbackRef: FirestoreRef = firestore.collection('feedback');

    try {
      const feedbackDoc: FirestoreDoc = feedbackRef.doc();
      const feedbackID: string = feedbackDoc.id;

      await feedbackRef.doc(feedbackID).set({...problem, userID, id: feedbackID, type: 'problem'});
      dispatch(actions.reportProblemSuccess());
    } catch (err) {
      dispatch(actions.reportProblemFailure(err));
    }
  };
}
