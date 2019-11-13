'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module LogOut
 */

import Spotify from 'rn-spotify-sdk';
import {Actions, ActionConst} from 'react-native-router-flux';
import {resetAlbums} from '../../albums/ResetAlbums';
import {resetArtists} from '../../artists/ResetArtists';
import {resetChat} from '../../chat/ResetChat';
import {resetFeedback} from '../../feedback/ResetFeedback';
import {resetOnboarding} from '../../onboarding/ResetOnboarding';
import {resetPlayer} from '../../player/ResetPlayer';
import {resetPlaylists} from '../../playlists/ResetPlaylists';
import {resetQueue} from '../../queue/ResetQueue';
import {resetSearch} from '../../search/ResetSearch';
import {resetSessions} from '../../sessions/ResetSessions';
import {resetTracks} from '../../tracks/ResetTracks';
import {resetUsers} from '../../users/ResetUsers';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';

/**
 * Async function that logs the current user out of Ultrasound
 * 
 * @async
 * @function logOut
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns  {Promise}
 * @resolves {object}  Confirmation the current user has been logged out of Ultrasound
 * @rejects  {Error}   The error which caused the log out failure
*/
export function logOut(): ThunkAction {
  return async dispatch => {
    dispatch(actions.request());

    try {
      await Spotify.logout();
      Actions.welcome({type: ActionConst.RESET});

      dispatch(actions.success());
      dispatch(resetAlbums());
      dispatch(resetArtists());
      dispatch(resetChat());
      dispatch(resetFeedback());
      dispatch(resetOnboarding());
      dispatch(resetPlayer());
      dispatch(resetPlaylists());
      dispatch(resetQueue());
      dispatch(resetSearch());
      dispatch(resetSessions());
      dispatch(resetTracks());
      dispatch(resetUsers());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
