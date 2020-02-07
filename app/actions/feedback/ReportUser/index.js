'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ReportUser
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
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

type Report = {
  categories: Array<string>,
  message: string,
  user: string,
};

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
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const feedbackRef: FirestoreRef = firestore.collection('feedback');
    const {user, ...rest} = report;

    try {
      const feedbackDoc: FirestoreDoc = feedbackRef.doc();
      const feedbackID: string = feedbackDoc.id;

      await feedbackRef.doc(feedbackID)
        .set({...rest, userID, id: feedbackID, reportedUser: user, type: 'user'});

      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
