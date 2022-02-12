import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Application from 'expo-application';
import { SensoComponent } from './components';

export default function App() {
  const [id, setId] = useState("");
  useEffect(() => {
    Application.getInstallationTimeAsync().then(value => setId(value.toUTCString()))
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app! {id}</Text>
      <SensoComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
