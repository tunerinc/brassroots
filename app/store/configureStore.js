'use strict';

import {createStore, applyMiddleware, compose} from 'redux';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import firebase from 'firebase';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import envConfig from '../../env';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: envConfig.firebaseAuthKey,
  authDomain: envConfig.firebaseAuthDomain,
  projectId: envConfig.firebaseProjectID,
  databaseURL: envConfig.firebaseDatabaseURL,
  storageBucket: envConfig.firebaseStorageBucket,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const firestoreSettings = {};
const rfConfig = {
  allowMultipleListeners: true,
};

firestore.settings(firestoreSettings);
firebase.firestore.setLogLevel('debug');

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
