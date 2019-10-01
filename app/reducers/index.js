'use strict';

/**
 * @format
 * @flow
 */

import {combineReducers} from 'redux';
import {firebaseReducer as firebase} from 'react-redux-firebase';
import {firestoreReducer as firestore} from 'redux-firestore';
import albums from './albums';
import artists from './artists';
import chat from './chat';
import conversations from './conversations';
import entities from './entities';
import events from './events';
import feedback from './feedback';
import groups from './groups';
import legal from './legal';
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
  albums,
  artists,
  chat,
  conversations,
  entities,
  events,
  feedback,
  firebase,
  firestore,
  groups,
  legal,
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