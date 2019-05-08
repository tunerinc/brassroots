'use strict';

/**
 * @format
 * @flow
 */

export type BrassrootsUser = {
  id: string,
  profileImage: string,
  coverImage: string,
  bio: string,
  location: string,
  birthdate: string,
  website: string,
  email: string,
  favoriteTrackID: string,
  totals: {
    followers: number,
    following: number,
  },
};

export type FirestoreDoc = {
  data: () => BrassrootsUser,
  update: ({[key: string]: string | boolean}) => void,
};

export type FirestoreDocs = {
  empty: boolean,
  docs: Array<FirestoreDoc>,
};

export type FirestoreQuery = {
  get: () => FirestoreDocs,
};

export type FirestoreRef = {
  where: (string, string, string) => FirestoreQuery,
  doc: (string) => FirestoreDoc,
};

export type FirestoreInstance = {
  collection: (string) => FirestoreRef,
};

export type FirebaseInstance = {};

export type Firebase = {
  getFirestore: () => FirestoreInstance,
  getFirebase: () => FirebaseInstance,
};