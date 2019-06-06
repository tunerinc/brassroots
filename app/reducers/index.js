'use strict';

/**
 * @format
 * @flow
 */

import {combineReducers} from 'redux';
import {firebaseStateReducer} from 'react-redux-firebase';
import albums from './albums';
import artists from './artists';
import chat from './chat';
import conversations from './conversations';
import events from './events';
import feedback from './feedback';
import groups from './groups';
import legal from './legal';
import notifications from './notifications';
import onboarding from './onboarding';
import player from './player';
import playlists from './playlists';
import queue from './queue';
import routes from './routes';
import search from './search';
import sessions from './sessions';
import settings from './settings';
import share from './share';
import tracks from './tracks';
import users from './users';

const reducers = {
  firebase: firebaseStateReducer,
  albums,
  artists,
  chat,
  conversations,
  events,
  feedback,
  groups,
  legal,
  notifications,
  onboarding,
  player,
  playlists,
  queue,
  routes,
  search,
  sessions,
  settings,
  share,
  tracks,
  users,
}

export default combineReducers(reducers);