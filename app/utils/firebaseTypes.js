'use strict';

/**
 * @format
 * @flow
 */

export type FirestoreDoc = {
  exists: boolean,
  id: string,
  get: () => any,
  data: () => any,
  update: ({[key: string]: string | boolean}) => Promise<void>,
  set: ({[key: string]: string | boolean | Array<string>}) => Promise<void>,
};

export type FirestoreDocs = {
  empty: boolean,
  docs: Array<FirestoreDoc>,
};

export type FirestoreQuery = {
  get: () => Promise<FirestoreDocs>,
};

export type FirestoreRef = {
  where: (string, string, string) => FirestoreQuery,
  doc: (?string) => FirestoreDoc,
};

export type FirestoreInstance = {
  collection: (string) => FirestoreRef,
};

export type FirebaseInstance = {};

export type Firebase = {
  getFirestore: () => FirestoreInstance,
  getFirebase: () => FirebaseInstance,
};