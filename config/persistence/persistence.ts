import * as firebase from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
  measurementId: Constants.manifest?.extra?.measurementId,
};

export const initDatabase = (): void => {
  initializeApp(firebaseConfig);
};

export const getDb = (): Firestore => {
  return getFirestore();
}
