'use strict';

/**
 * @format
 * @flow
 */

import type {BRUser} from './brassrootsTypes';

export type FirestoreDoc = {
  exists: boolean,
  id: string,
  get: () => any,
  data: () => any,
  update: ({[key: string]: string | boolean | number}) => Promise<void>,
  set: ({[key: string]: string | boolean | Array<string>}) => Promise<void>,
  collection: (string) => FirestoreDoc,
  doc: (?string) => FirestoreDoc,
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

export type FirestoreBatch = {
  update: (FirestoreDoc, {[key: string]: ?string | number | boolean}) => void,
  delete: (FirestoreDoc) => void,
  set: (FirestoreDoc, BRUser) => Promise<void>,
  commit: () => Promise<void>,
};

export type FirestoreInstance = {
  collection: (string) => FirestoreRef,
  batch: () => FirestoreBatch,
  GeoPoint: (number, number) => any,
};

export type StorageUploadTask = {
  snapshot: {
    ref: {
      getDownloadURL: () => any;
    },
  },
};

export type StorageChild = {
  put: (any) => StorageUploadTask,
};

export type StorageRef = {
  child: (string) => StorageChild,
};

export type StorageInstance = {
  ref: () => StorageRef,
};

export type FirebaseInstance = {
  storage: () => StorageInstance,
};

export type Firebase = {
  getFirestore: () => FirestoreInstance,
  getFirebase: () => FirebaseInstance,
};