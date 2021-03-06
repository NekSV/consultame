import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import { CensusComponent } from "./components";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { initDatabase } from './config/persistence/persistence';
import { getDeviceId } from './config/device';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "green",
    accent: "yellow",
  },
};
export default function App() {
  const [id, setId] = useState("");
  
  useEffect(() => {
    // Set-up Firestore config.
    initDatabase();
    // Get installation ID
    const getDeviceInfo = async () => {
      const id = await getDeviceId();
      setId(id);
    }
    getDeviceInfo();
  });
  useEffect(()=> {
    console.log(`Current Device ID ${id}`);
  }, [id]);
  return (
    <PaperProvider theme={theme}>
      <CensusComponent />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}