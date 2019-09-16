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
  update: ({[key: string]: any}) => Promise<void>,
  set: ({[key: string]: ?string | boolean | Array<string>}) => Promise<void>,
  collection: (string) => FirestoreDocs,
  doc: (?string) => FirestoreDoc,
  delete: () => Promise<void>,
  onSnapshot: (any, any) => any,
};

type FirestoreDocs = {
  empty: boolean,
  docs: Array<any>,
  orderBy: (string, ?string) => FirestoreQuery,
  limit: (number) => FirestoreQuery,
  get: () => Promise<FirestoreDocs>,
  doc: (?string | ?number) => FirestoreDoc,
  where: (string, string, string | boolean) => FirestoreQuery,
  onSnapshot: (any, any) => any,
};

type FirestoreQuery = {
  get: () => Promise<FirestoreDocs>,
  limit: (number) => FirestoreDocs,
  startAfter: (number | string) => FirestoreQuery,
  orderBy: (string, ?string) => FirestoreQuery,
  onSnapshot: (any, any, any) => any,
};

type FirestoreRef = {
  where: (string, string, string | boolean) => FirestoreQuery,
  doc: (?string) => FirestoreDoc,
  orderBy: (string, ?string) => FirestoreQuery,
  limit: (number) => FirestoreDocs,
};

type FirestoreBatch = {
  update: (FirestoreDoc, {[key: string]: ?string | number | boolean | {} | Array<any>}) => void,
  delete: (FirestoreDoc) => void,
  set: (FirestoreDoc, any) => Promise<void>,
  commit: () => Promise<void>,
};

type FirestoreInstance = {
  collection: (string) => FirestoreRef,
  batch: () => FirestoreBatch,
  GeoPoint: (number, number) => any,
  runTransaction: (any) => Promise<any>,
  FieldValue: {
    serverTimestamp: () => string | number,
    arrayUnion: (any) => any,
    arrayRemove: (any) => any,
    increment: (number) => number,
    decrement: (number) => number,
  },
};

type StorageUploadTask = {
  snapshot: {
    ref: {
      getDownloadURL: () => string;
    },
  },
};

type StorageChild = {
  put: (any) => StorageUploadTask,
  delete: () => Promise<void>,
};

type StorageRef = {
  child: (string) => StorageChild,
};

type StorageInstance = {
  ref: () => StorageRef,
};

type FirebaseInstance = {
  storage: () => StorageInstance,
  database: () => any,
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