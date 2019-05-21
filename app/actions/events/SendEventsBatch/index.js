'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SendEventsBatch
 */

import * as actions from './actions';
import {
  type Event,
  type ThunkAction,
} from '../../../reducers/events';

/**
 * Async function that sends the events batch, if available
 * 
 * @async
 * @function sendEventsBatch
 * 
 * @param    {object[]} events 
 * @param    {number}   batch.eventTime             The time the event took place in UTC
 * @param    {number}   batch.localTime             The local time the event took place
 * @param    {string}   batch.locationLatitude      The latitude value of the current user's location
 * @param    {string}   batch.locationLongitude     The longitude value of the current user's location
 * @param    {string}   batch.userId                The id of the current user
 * @param    {string}   [batch.trackId]             The Spotify id of the track
 * @param    {string}   [batch.sourceType]          The type of item the source is
 * @param    {string}   [batch.sourceId]            The id of the source item
 * @param    {string}   [batch.destinationType]     The type of destination the current user is targeting
 * @param    {string}   [batch.destinationId]       The id of the destination target for the current user
 * @param    {string}   [batch.hyperlink]           The hyperlink the current user has navigated to
 * @param    {string}   [batch.oldMode]             The old mode the current user is switching from in a playlist
 * @param    {string}   [batch.newMode]             The new mode the current user has selected for a playlist
 * @param    {string}   [batch.sourceMusicType]     The type of source music
 * @param    {string}   [batch.sourceMusicId]       The id of the source music
 * @param    {string}   [batch.listenType]          The type of listen the current user registered in a session
 * @param    {string}   [batch.message]             The message the current user has sent
 * @param    {number}   [batch.skippedStartSeconds] The time where the current user started to seek from
 * @param    {number}   [batch.skippedEndSeconds]   The time where the current user ended seeking
 * 
 * @returns  {Promise}
 * @resolves {object}                               Confirmation the events batch was successfully sent
 * @rejects  {Error}                                The error which caused the send events batch failure
 */
export function sendEventsBatch(
  events: Array<Event>  = [],
): ThunkAction {
  return async dispatch => {
    dispatch(actions.sendEventsBatchRequest());

    try {
      if (events.length && events.length !== 0) {
        await fetch('https://es.tiunncer.com/events/batch', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            events,
            accessToken: 'test_access_token',
          }),
        });
      };

      dispatch(actions.sendEventsBatchSuccess());
    } catch (err) {
      dispatch(actions.sendEventsBatchFailure(err));
    }
  };
}