'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import * as types from '../actions/player/types';

// Case Functions
import * as nextTrack from '../actions/player/NextTrack/reducers';
import * as pausePlayer from '../actions/player/PausePlayer/reducers';
import * as playTrack from '../actions/player/PlayTrack/reducers';
import * as previousTrack from '../actions/player/PreviousTrack/reducers';
import * as seekPosition from '../actions/player/SeekPosition/reducers';
import {setProgress} from '../actions/player/SetProgress/reducers';
import * as startPlayer from '../actions/player/StartPlayer/reducers';
import * as stopPlayer from '../actions/player/StopPlayer/reducers';
import * as toggleMute from '../actions/player/ToggleMute/reducers';
import * as togglePause from '../actions/player/TogglePause/reducers';
import * as toggleRepeat from '../actions/player/ToggleRepeat/reducers';
import * as toggleShuffle from '../actions/player/ToggleShuffle/reducers';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

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
        return nextTrack.request(state);
      case types.NEXT_TRACK_SUCCESS:
        return nextTrack.success(state, action);
      case types.NEXT_TRACK_FAILURE:
        return nextTrack.failure(state, action);
      case types.PAUSE_PLAYER_REQUEST:
        return pausePlayer.request(state);
      case types.PAUSE_PLAYER_SUCCESS:
        return pausePlayer.success(state);
      case types.PAUSE_PLAYER_FAILURE:
        return pausePlayer.failure(state, action);
      case types.PLAY_TRACK_REQUEST:
        return playTrack.request(state);
      case types.PLAY_TRACK_SUCCESS:
        return playTrack.success(state, action);
      case types.PLAY_TRACK_FAILURE:
        return playTrack.failure(state, action);
      case types.PREVIOUS_TRACK_REQUEST:
        return previousTrack.request(state);
      case types.PREVIOUS_TRACK_SUCCESS:
        return previousTrack.success(state, action);
      case types.PREVIOUS_TRACK_FAILURE:
        return previousTrack.failure(state, action);
      case types.RESET_PLAYER:
        return initialState;
      case types.SEEK_POSITION_REQUEST:
        return seekPosition.request(state);
      case types.SEEK_POSITION_SUCCESS:
        return seekPosition.success(state);
      case types.SEEK_POSITION_FAILURE:
        return seekPosition.failure(state, action);
      case types.SET_PROGRESS:
        return setProgress(state, action);
      case types.START_PLAYER_REQUEST:
        return startPlayer.request(state);
      case types.START_PLAYER_SUCCESS:
        return startPlayer.success(state);
      case types.START_PLAYER_FAILURE:
        return startPlayer.failure(state, action);
      case types.STOP_PLAYER_REQUEST:
        return stopPlayer.request(state);
      case types.STOP_PLAYER_SUCCESS:
        return stopPlayer.success(state);
      case types.STOP_PLAYER_FAILURE:
        return stopPlayer.failure(state, action);
      case types.TOGGLE_MUTE_REQUEST:
        return toggleMute.request(state);
      case types.TOGGLE_MUTE_SUCCESS:
        return toggleMute.success(state, action);
      case types.TOGGLE_MUTE_FAILURE:
        return toggleMute.failure(state, action);
      case types.TOGGLE_PAUSE_REQUEST:
        return togglePause.request(state);
      case types.TOGGLE_PAUSE_SUCCESS:
        return togglePause.success(state, action);
      case types.TOGGLE_PAUSE_FAILURE:
        return togglePause.failure(state, action);
      case types.TOGGLE_REPEAT_REQUEST:
        return toggleRepeat.request(state);
      case types.TOGGLE_REPEAT_SUCCESS:
        return toggleRepeat.success(state, action);
      case types.TOGGLE_REPEAT_FAILURE:
        return toggleRepeat.failure(state, action);
      case types.TOGGLE_SHUFFLE_REQUEST:
        return toggleShuffle.request(state);
      case types.TOGGLE_SHUFFLE_SUCCESS:
        return toggleShuffle.success(state, action);
      case types.TOGGLE_SHUFFLE_FAILURE:
        return toggleShuffle.failure(state, action);
      default:
        return state;
    }
  }

  return state;
}