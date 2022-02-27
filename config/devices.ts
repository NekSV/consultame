import * as Application from "expo-application";
import * as Device from "expo-device";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { getDb } from "./persistence/persistence";
export const getDeviceId = async (
  setId: React.Dispatch<React.SetStateAction<string>>
) => {
  const installationTime = await Application.getInstallationTimeAsync();
  const id = installationTime.toLocaleDateString();
  const docRef = doc(getDb(), "devices", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data());
  } else {
    console.log("Device ID doesn't exists, registering");
    const devicesRef = collection(getDb(), "devices");
    const newDevice = await setDoc(doc(devicesRef, id), {
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      model: Device.modelName,
      osVersion: Device.osVersion,
      deviceName: Device.deviceName,
    });
    console.log(newDevice)
  }
};
