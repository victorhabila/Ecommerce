import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isFirstLaunched, setIsFirstLaunched] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunched(true);
      } else {
        setIsFirstLaunched(false);
      }
    });
  }, []);

  return (
    <>
      <StackNavigator firstLaunch={isFirstLaunched} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
