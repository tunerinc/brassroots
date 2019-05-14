'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ReportUser
 */

import * as actions from './actions';
import type {Action, State} from '../../../reducers/feedback';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreRef,
  FirestoreDoc,
} from '../../../utils/firebaseTypes';

type Report = {
  categories: Array<string>,
  message: string,
  user: string,
};

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

/**
 * Async function that reports a user for the current user
 * 
 * @async
 * @function reportUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}   userID            The user id of the current user
 * @param    {object}   report            The report the current user has made
 * @param    {string[]} report.categories The category types of the report
 * @param    {string}   report.message    The message the current user has added
 *
 * @returns  {Promise}
 * @resolves {object}                     The reported user from the current user
 * @rejects  {Error}                      The error which caused the report user failure
 */
export function reportUser(
  userID: string,
  report: Report,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.reportUserRequest());

    const firestore: FirestoreInstance = getFirestore();
    const feedbackRef: FirestoreRef = firestore.collection('feedback');
    const {user, ...rest} = report;

    try {
      const feedbackDoc: FirestoreDoc = feedbackRef.doc();
      const feedbackID: string = feedbackDoc.id;

      await feedbackRef.doc(feedbackID)
        .set({...rest, userID, id: feedbackID, reportedUser: user, type: 'user'});

      dispatch(actions.reportUserSuccess());
    } catch (err) {
      dispatch(actions.reportUserFailure(err));
    }
  };
}
