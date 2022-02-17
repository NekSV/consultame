import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Application from "expo-application";
import { CensusComponent } from "./components";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

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
    Application.getInstallationTimeAsync().then((value) =>
      setId(value.toUTCString())
    );
  });
  return (
    <PaperProvider theme={theme}>
      <CensusComponent />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}