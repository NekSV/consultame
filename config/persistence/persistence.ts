import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
};

export class Persistence {
  private readonly db;
  constructor() {
    initializeApp(firebaseConfig);
    this.db = getFirestore(getApp());
  }
  getInstance() {
    return this.db;
  }
}
