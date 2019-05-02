'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/player/types';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

export type State = {
  +lastUpdated: string,
  +attemptingToPlay: boolean,
  +timeLastPlayed: ?string,
  +prevTrackID: ?string,
  +prevQueueID: ?string,
  +currentTrackID: ?string,
  +currentQueueID: ?string,
  +nextTrackID: ?string,
  +nextQueueID: ?string,
  +fetchingProgress: boolean,
  +skippingNext: boolean,
  +skippingPrev: boolean,
  +durationMS: number,
  +progress: number,
  +paused: boolean,
  +pausing: boolean,
  +repeat: boolean,
  +repeating: boolean,
  +seeking: boolean,
  +shuffle: boolean,
  +shuffling: boolean,
  +muted: boolean,
  +muting: boolean,
  +volume: number,
};

/**
 * @constant
 * @alias playerState
 * @type {object}
 * 
 * @property {string}  lastUpdated            The date/time the player was last updated
 * @property {boolean} attemptingToPlay=false Whether the player is attempting to play a track
 * @property {string}  timeLastPlayed=null    The date/time the current track was last played
 * @property {string}  prevTrackID=null       The Spotify id of the previous track to play
 * @property {string}  prevQueueID=null       The Brassroots id of the previous track to play
 * @property {string}  currentTrackID=null    The Spotify id of the current track playing
 * @property {string}  currentQueueID=null    The Brassroots id of the current track playing
 * @property {string}  nextTrackID=null       The Spotify id of the next track to play
 * @property {string}  nextQueueID=null       The Brassroots id of the next track to play
 * @property {boolean} fetchingProgress=false Whether the current user is fetching the progress of the track
 * @property {boolean} skippingNext=false     Whether the current user is skipping to the next track
 * @property {boolean} skippingPrev=false     Whether the current user is skipping to the previous track
 * @property {number}  durationMS=0           The duration of the current track in milliseconds
 * @property {number}  progress=0             The progress of the current track in milliseconds
 * @property {boolean} paused=false           Whether the player is paused
 * @property {boolean} pausing=false          Whether the player is pausing
 * @property {boolean} repeat=false           Whether the player is on repeat
 * @property {boolean} repeating=false        Whether the player is repeating
 * @property {boolean} seeking=false          Whether the current user is seeking to a new position
 * @property {boolean} shuffle=false          Whether the player is on shuffle
 * @property {boolean} shuffling=false        Whether the player is shuffling
 * @property {boolean} muted=false            Whether the player is muted
 * @property {boolean} muting=false           Whether the player is muting
 * @property {number}  volume=0               The current volume of the player
 */
export const initialState: State = {
  lastUpdated,
  attemptingToPlay: false,
  timeLastPlayed: lastUpdated,
  prevTrackID: null,
  prevQueueID: null,
  currentTrackID: null,
  currentQueueID: null,
  nextTrackID: null,
  nextQueueID: null,
  fetchingProgress: false,
  skippingNext: false,
  skippingPrev: false,
  durationMS: 0,
  progress: 0,
  paused: true,
  pausing: false,
  repeat: false,
  repeating: false,
  seeking: false,
  shuffle: false,
  shuffling: false,
  muted: false,
  muting: false,
  volume: 0,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: {type: string} = {},
): State {
  switch (action.type) {
    default:
      return state;
  }
}