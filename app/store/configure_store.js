'use strict';

import {createStore, applyMiddleware, compose} from 'redux';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import firebase from 'firebase';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Config from 'react-native-config';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: Config.FIREBASE_AUTH_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
};

const rfConfig = {};
const firestoreSettings = {
  timestampsInSnapshots: true,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
firestore.settings(firestoreSettings);

const config = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableLogging: true,
  enableRedirectHandling: false,
  fileMetadataFactory: uploadRes => {
    const {metadata: {name, fullPath, downloadURLs}} = uploadRes;
    return {name, fullPath, downloadURL: downloadURLs[0]}
  }
};

const logger = createLogger();
const middleware = [thunk.withExtraArgument({getFirebase, getFirestore}), logger];
const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware),
  reactReduxFirebase(firebase, config),
  reduxFirestore(firebase, rfConfig),
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducers, initialState);

  return store;
}
