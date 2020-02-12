'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import * as types from '../actions/events/types';

export const lastTimeSent: string = moment().format("ddd, MMM D, YYYY, h:mm:ss a");

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type Event = {
  +eventTime?: number,
  +localTime?: number,
  +locationLatitude?: string,
  +locationLongitude?: string,
  +userId?: string,
  +trackID?: ?string,
  +sourceType?: ?string,
  +sourceId?: ?string,
  +destinationType?: ?string,
  +destinationId?: ?string,
  +hyperlink?: ?string,
  +oldMode?: ?string,
  +newMode?: ?string,
  +sourceMusicType?: ?string,
  +sourceMusicId?: ?string,
  +listenType?: ?string,
  +message?: ?string,
  +skippedStartSeconds?: ?number,
  +skippedEndSeconds?: ?number,
  +eventVersion?: ?string,
  +eventType?: ?string,
};

type Action = {
  +type?: string,
  +event?: Event,
  +error?: Error,
};

type State = {
  +lastTimeSent: string,
  +batch: Array<Event>,
  +uploading: boolean,
  +error: ?Error,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Event,
  Action,
  State,
};

/**
 * @constant
 * @alias eventsState
 * @type {object}
 * 
 * @property {string}   lastTimeSent                  The date/time the batch events were last sent
 * @property {object[]} batch                         The batch of events
 * @property {number}   batch[].eventTime             The time the event took place in UTC
 * @property {number}   batch[].localTime             The local time the event took place
 * @property {string}   batch[].locationLatitude      The latitude value of the current user's location
 * @property {string}   batch[].locationLongitude     The longitude value of the current user's location
 * @property {string}   batch[].userId                The id of the current user
 * @property {string}   [batch[].trackId]             The Spotify id of the track
 * @property {string}   [batch[].sourceType]          The type of item the source is
 * @property {string}   [batch[].sourceId]            The id of the source item
 * @property {string}   [batch[].destinationType]     The type of destination the current user is targeting
 * @property {string}   [batch[].destinationId]       The id of the destination target for the current user
 * @property {string}   [batch[].hyperlink]           The hyperlink the current user has navigated to
 * @property {string}   [batch[].oldMode]             The old mode the current user is switching from in a playlist
 * @property {string}   [batch[].newMode]             The new mode the current user has selected for a playlist
 * @property {string}   [batch[].sourceMusicType]     The type of source music
 * @property {string}   [batch[].sourceMusicId]       The id of the source music
 * @property {string}   [batch[].listenType]          The type of listen the current user registered in a session
 * @property {string}   [batch[].message]             The message the current user has sent
 * @property {number}   [batch[].skippedStartSeconds] The time where the current user started to seek from
 * @property {number}   [batch[].skippedEndSeconds]   The time where the current user ended seeking
 * @property {boolean}  uploading=false               Whether the events batch is uploading
 * @property {Error}    error=null                    The error related to events actions
 */
export const initialState: State = {
  lastTimeSent,
  batch: [],
  uploading: false,
  error: null,
};

/**
 * Add an event to the batch
 * 
 * @function addEvent
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                       The Redux state
 * @param   {object} action                      The Redux action
 * @param   {string} action.type                 The type of Redux action
 * @param   {object} event                       The event being added to the batch
 * @param   {number} event.eventTime             The time the event took place in UTC
 * @param   {number} event.localTime             The local time the event took place
 * @param   {string} event.locationLatitude      The latitude value of the current user's location
 * @param   {string} event.locationLongitude     The longitude value of the current user's location
 * @param   {string} event.userId                The id of the current user
 * @param   {string} [event.trackId]             The Spotify id of the track
 * @param   {string} [event.sourceType]          The type of item the source is
 * @param   {string} [event.sourceId]            The id of the source item
 * @param   {string} [event.destinationType]     The type of destination the current user is targeting
 * @param   {string} [event.destinationId]       The id of the destination target for the current user
 * @param   {string} [event.hyperlink]           The hyperlink the current user has navigated to
 * @param   {string} [event.oldMode]             The old mode the current user is switching from in a playlist
 * @param   {string} [event.newMode]             The new mode the current user has selected for a playlist
 * @param   {string} [event.sourceMusicType]     The type of source music
 * @param   {string} [event.sourceMusicId]       The id of the source music
 * @param   {string} [event.listenType]          The type of listen the current user registered in a session
 * @param   {string} [event.message]             The message the current user has sent
 * @param   {number} [event.skippedStartSeconds] The time where the current user started to seek from
 * @param   {number} [event.skippedEndSeconds]   The time where the current user ended seeking
 * 
 * @returns {object}                             The state with the new event added
 */
function addEvent(
  state: State,
  action: Action,
): State {
  const {batch} = state;
  const {event} = action;
  return updateObject(state, {batch: [...batch, ...(event && event.eventType ? [event] : [])]});
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.ADDED_TRACK:
      case types.CLICKED_USERS_HYPERLINK:
      case types.EDITED_PLAYLIST_SETTINGS:
      case types.PLAYED_MUSIC_TRACKS:
      case types.PLAYED_TRACK:
      case types.REMOVED_TRACK:
      case types.SENT_CHAT_MESSAGE:
      case types.SKIPPED_TRACK:
      case types.VIEWED_MUSIC_INFO:
        return addEvent(state, action);
      case types.SEND_EVENTS_BATCH_REQUEST:
        return updateObject(state, {uploading: true, error: null});
      case types.SEND_EVENTS_BATCH_SUCCESS:
        return updateObject(initialState, {lastTimeSent});
      case types.SEND_EVENTS_BATCH_FAILURE:
        return updateObject(state, {error: action.error, uploading: false});
      default:
        return state;
    }
  }

  return state;
}