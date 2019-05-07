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

export type UserDoc = {
  data: () => BrassrootsUser,
};

export type UserDocs = {
  empty: boolean,
  docs: Array<UserDoc>,
};

export type FirestoreQuery = {
  get: () => UserDocs,
};

export type FirestoreRef = {
  where: (string, string, string) => FirestoreQuery,
};

export type FirestoreInstance = {
  collection: (string) => FirestoreRef,
};

export type FirebaseInstance = {};

export type Firebase = {
  getFirestore: () => FirestoreInstance,
  getFirebase: () => FirebaseInstance,
};