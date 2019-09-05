'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module DeleteQueueTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Notify the app of a delete queue track request
 * 
 * @alias module:DeleteQueueTrack
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} queueID The Brassroots id of the track to delete from the queue
 * 
 * @returns {object}         Redux action with the type of DELETE_QUEUE_TRACK_REQUEST and the Brassroots id of the queue track
 */
export function request(
  queueID: string,
): Action {
  return {
    type: types.DELETE_QUEUE_TRACK_REQUEST,
    queueID,
  };
}

/**
 * Notify the app of a delete queue track success
 * 
 * @alias module:DeleteQueueTrack
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} queueID The Brassroots id of the track that was deleted
 * 
 * @returns {object}         Redux action with the type of DELETE_QUEUE_TRACK_SUCCESS and the Brassroots id of the queue track
 */
export function success(
  queueID: string,
): Action {
  return {
    type: types.DELETE_QUEUE_TRACK_SUCCESS,
    queueID,
  };
}

/**
 * Notify the app of a delete queue track failure
 * 
 * @alias module:DeleteQueueTrack
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} queueID The track id that failed to be deleted from the session's queue
 * @param   {Error}  error   The error which caused the delete queue track failure
 * 
 * @returns {object}         Redux action with the type of DELETE_QUEUE_TRACK_FAILURE and the error which caused the delete queue track failure for the queue track
 */
export function failure(
  queueID: string,
  error: Error,
): Action {
  return {
    type: types.DELETE_QUEUE_TRACK_FAILURE,
    queueID,
    error,
  };
}