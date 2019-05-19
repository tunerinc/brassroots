'use strict';

/**
 * @format
 * @flow
 */

type FirestoreDoc = {
  exists: boolean,
  id: string,
  get: () => any,
  data: () => any,
  update: ({[key: string]: string | boolean | number}) => Promise<void>,
  set: ({[key: string]: ?string | boolean | Array<string>}) => Promise<void>,
  collection: (string) => FirestoreDoc,
  doc: (?string) => FirestoreDoc,
};

type FirestoreDocs = {
  empty: boolean,
  docs: Array<FirestoreDoc>,
};

type FirestoreQuery = {
  get: () => Promise<FirestoreDocs>,
};

type FirestoreRef = {
  where: (string, string, string) => FirestoreQuery,
  doc: (?string) => FirestoreDoc,
};

type FirestoreBatch = {
  update: (FirestoreDoc, {[key: string]: ?string | number | boolean}) => void,
  delete: (FirestoreDoc) => void,
  set: (FirestoreDoc, any) => Promise<void>,
  commit: () => Promise<void>,
};

type FirestoreInstance = {
  collection: (string) => FirestoreRef,
  batch: () => FirestoreBatch,
  GeoPoint: (number, number) => any,
};

type StorageUploadTask = {
  snapshot: {
    ref: {
      getDownloadURL: () => any;
    },
  },
};

type StorageChild = {
  put: (any) => StorageUploadTask,
};

type StorageRef = {
  child: (string) => StorageChild,
};

type StorageInstance = {
  ref: () => StorageRef,
};

type FirebaseInstance = {
  storage: () => StorageInstance,
};

type Firebase = {
  getFirestore: () => FirestoreInstance,
  getFirebase: () => FirebaseInstance,
};

export type {
  FirestoreDoc,
  FirestoreDocs,
  FirestoreQuery,
  FirestoreRef,
  FirestoreBatch,
  FirestoreInstance,
  StorageUploadTask,
  StorageChild,
  StorageRef,
  StorageInstance,
  FirebaseInstance,
  Firebase,
};