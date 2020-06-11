
import Spotify from 'rn-spotify-sdk';
import { Actions, ActionConst } from 'react-native-router-flux';
// import * as actions from '../actions';
import {
    type FirestoreInstance,
    type FirestoreRef,
    type FirestoreDoc,
} from '../../app/utils/firebaseTypes';
import firebase from 'firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';


module.exports = async function () {
    const firestore = getFirestore();
    console.log("==============================FIRESTORE-=======");
    console.log(firestore)
    // let batch = await firestore.batch();
    const userDoc = await firestore.collection('users').where('currentSession', '>=', '');

    console.log("==============================USER-=======");
    (await userDoc.get()).docs.map(e => console.log(e.data()));
}