'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Action as TrackAction} from './tracks';
import {type Action as QueueAction} from './queue';
import {type Action as EntitiesAction} from './entities';
import {type Action as SessionAction} from './sessions';
import {type Firebase} from '../utils/firebaseTypes';
import * as types from '../actions/player/types';

// Case Functions
import * as nextTrack from '../actions/player/NextTrack/reducers';
import * as playTrack from '../actions/player/PlayTrack/reducers';
import * as previousTrack from '../actions/player/PreviousTrack/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type DispatchAction = Action | TrackAction | QueueAction | EntitiesAction | SessionAction;
type GetState = () => State;
type PromiseAction = Promise<DispatchAction>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: DispatchAction | PromiseAction | ThunkAction | Array<DispatchAction>) => any;

type Updates = {|
  attemptingToPlay?: boolean,
  +prevTrackID?: ?string,
  +prevQueueID?: ?string,
  +currentTrackID?: ?string,
  +currentQueueID?: ?string,
  +nextTrackID?: ?string,
  +nextQueueID?: ?string,
  +durationMS?: number,
  +progress?: number,
  +paused?: boolean,
|};

type Action = {
  +type?: string,
  +error?: Error,
  +currentQueueID?: ?string,
  +currentTrackID?: ?string,
  +durationMS?: ?number,
  +nextQueueID?: ?string,
  +nextTrackID?: ?string,
  +prevQueueID?: ?string,
  +prevTrackID?: ?string,
  +progress?: number,
  +status?: boolean,
  +updates?: Updates,
};

type State = {
  +lastUpdated?: string,
  +attemptingToPlay?: boolean,
  +timeLastPlayed?: ?string,
  +prevTrackID?: ?string,
  +prevQueueID?: ?string,
  +currentTrackID?: ?string,
  +currentQueueID?: ?string,
  +nextTrackID?: ?string,
  +nextQueueID?: ?string,
  +fetchingProgress?: boolean,
  +skippingNext?: boolean,
  +skippingPrev?: boolean,
  +durationMS?: number,
  +progress?: number,
  +paused?: boolean,
  +pausing?: boolean,
  +repeat?: boolean,
  +repeating?: boolean,
  +seeking?: boolean,
  +shuffle?: boolean,
  +shuffling?: boolean,
  +muted?: boolean,
  +muting?: boolean,
  +volume?: number,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Updates,
  Action,
  State,
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
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.NEXT_TRACK_REQUEST:
        return updateObject(state, {skippingNext: true, error: null});
      case types.NEXT_TRACK_SUCCESS:
        return nextTrack.success(state, action);
      case types.NEXT_TRACK_FAILURE:
        return updateObject(state, {error: action.error, skippingNext: false});
      case types.PAUSE_PLAYER_REQUEST:
        return updateObject(state, {pausing: true, paused: false, error: null});
      case types.PAUSE_PLAYER_SUCCESS:
        return updateObject(state, {lastUpdated, pausing: false, paused: true, error: null});
      case types.PAUSE_PLAYER_FAILURE:
        return updateObject(state, {error: action.error, paused: false, pausing: false});
      case types.PLAY_TRACK_REQUEST:
        return updateObject(state, {attemptingToPlay: true, error: null});
      case types.PLAY_TRACK_SUCCESS:
        return playTrack.success(state, action);
      case types.PLAY_TRACK_FAILURE:
        return updateObject(state, {error: action.error, attemptingToPlay: false});
      case types.PREVIOUS_TRACK_REQUEST:
        return updateObject(state, {skippingPrev: true, error: null});
      case types.PREVIOUS_TRACK_SUCCESS:
        return previousTrack.success(state, action);
      case types.PREVIOUS_TRACK_FAILURE:
        return updateObject(state, {error: action.error, skippingPrev: false});
      case types.RESET_PLAYER:
        return initialState;
      case types.SEEK_POSITION_REQUEST:
        return updateObject(state, {seeking: true, error: null});
      case types.SEEK_POSITION_SUCCESS:
        return updateObject(state, {seeking: false, error: null});
      case types.SEEK_POSITION_FAILURE:
        return updateObject(state, {error: action.error, seeking: false});
      case types.START_PLAYER_REQUEST:
        return updateObject(state, {attemptingToPlay: true, error: null});
      case types.START_PLAYER_SUCCESS:
        return updateObject(state, {
          lastUpdated,
          paused: false,
          attemptingToPlay: false,
          error: null,
        });
      case types.START_PLAYER_FAILURE:
        return updateObject(state, {error: action.error, attemptingToPlay: false});
      case types.STOP_PLAYER_REQUEST:
        return updateObject(state, {pausing: true, error: null});
      case types.STOP_PLAYER_SUCCESS:
        return updateObject(state, {
          lastUpdated,
          pausing: false,
          paused: true,
          progress: 0,
          error: null,
        });
      case types.STOP_PLAYER_FAILURE:
        return updateObject(state, {error: action.error, pausing: false, paused: false});
      case types.TOGGLE_MUTE_REQUEST:
        return updateObject(state, {muting: true, error: null});
      case types.TOGGLE_MUTE_SUCCESS:
        return updateObject(state, {lastUpdated, muted: action.status, muting: false, error: null});
      case types.TOGGLE_MUTE_FAILURE:
        return updateObject(state, {error: action.error, muting: false});
      case types.TOGGLE_PAUSE_REQUEST:
        return updateObject(state, {pausing: true, error: null});
      case types.TOGGLE_PAUSE_SUCCESS:
        return updateObject(state, {
          lastUpdated,
          progress: action.progress,
          paused: action.status,
          pausing: false,
          error: null,
        });
      case types.TOGGLE_PAUSE_FAILURE:
        return updateObject(state, {error: action.error, pausing: false});
      case types.TOGGLE_REPEAT_REQUEST:
        return updateObject(state, {repeating: true, error: null});
      case types.TOGGLE_REPEAT_SUCCESS:
        return updateObject(state, {
          lastUpdated,
          repeat: action.status,
          repeating: false,
          error: null,
        });
      case types.TOGGLE_REPEAT_FAILURE:
        return updateObject(state, {error: action.error, repeating: false});
      case types.TOGGLE_SHUFFLE_REQUEST:
        return updateObject(state, {shuffling: true, error: null});
      case types.TOGGLE_SHUFFLE_SUCCESS:
        return updateObject(state, {shuffle: action.status, shuffling: false, error: null});
      case types.TOGGLE_SHUFFLE_FAILURE:
        return updateObject(state, {error: action.error, shuffling: false});
      case types.UPDATE_PLAYER:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}