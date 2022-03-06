import {
  Firestore,
  getFirestore,
  enableIndexedDbPersistence,
  setDoc,
  collection,
  doc,
  initializeFirestore,
} from "firebase/firestore";
import Constants from "expo-constants";
import { getApp, initializeApp } from "firebase/app";
import { getDeviceId } from "../device";
const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
  measurementId: Constants.manifest?.extra?.measurementId,
};
export const getDb = (): Firestore => {
  const DB: Firestore = initializeFirestore(getApp(), {
    useFetchStreams: false,
  } as any);
  return getFirestore();
};

export const initDatabase = (): void => {
  initializeApp(firebaseConfig);
  enableIndexedDbPersistence(getFirestore()).catch((err) => log.error(err.code, err.message));
};

export const log = {
  error: async (code: string, message: string) => {
    const errorRef = collection(getFirestore(), "error-log");
    const id = await getDeviceId();
    setDoc(doc(errorRef), {
      type: "error",
      deviceId: id,
      code: code,
      message: message,
    });
  },
  info: async (message: string) => {
    const errorRef = collection(getFirestore(), "error-log");
    const id = await getDeviceId();
    setDoc(doc(errorRef), {
      type: "info",
      deviceId: id,
      code: 200,
      message: message,
    });
  }
};
