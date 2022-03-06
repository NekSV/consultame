import * as Application from "expo-application";
import * as Device from "expo-device";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDb } from "./persistence/persistence";
import { ISurveyQuestion, Survey } from '../components/census/survey.class';
/**
 * Get application installation ID which is unique for every device,
 * this is a workaround since DEVICE_ID is not available for Expo CLI
 * @returns Device Installation ID
 */
export const getDeviceId = async (): Promise<string> => {
  const installationTime = await Application.getInstallationTimeAsync();
  const id = installationTime.toISOString() || "1234-test";
  const docRef = doc(getDb(), "devices", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // TODO: document data might be required in a future.
    const data = docSnap.data();
    return docSnap.id;
  } else {
    console.log("Device ID doesn't exists, registering");
    const devicesRef = collection(getDb(), "devices");
    await setDoc(doc(devicesRef, id), {
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      model: Device.modelName,
      osVersion: Device.osVersion,
      deviceName: Device.deviceName,
    });
    return id;
  }
};

export const getAssignedSurvey = async (): Promise<Map<string, ISurveyQuestion>> => {
  const deviceId = await getDeviceId();
  const q = query(
    collection(getDb(), "assignments"),
    where("deviceId", "==", deviceId),
    where("status", "==", "active")
  );

  const snapshot = await getDocs(q);
  const results: Map<string, ISurveyQuestion> = new Map<string, ISurveyQuestion>();
  snapshot.forEach(async doc => {
    const docRef = await getDoc(doc.data().survey);
    const survey = docRef.data() as Survey;
    survey?.questions.forEach( q => results.set(q.id, q))
  });
  return results
};
