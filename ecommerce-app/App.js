import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./store";
import { ModalPortal } from "react-native-modals";
import { StripeProvider } from "@stripe/stripe-react-native";
import { UserContext } from "./UserContext";
import { STRIPE_PAYMENT_KEY } from "@env";

export default function App() {
  const STRIPE_KEY = `${STRIPE_PAYMENT_KEY}`;
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
      <Provider store={store}>
        <UserContext>
          <StripeProvider publishableKey={STRIPE_KEY}>
            <StackNavigator firstLaunch={isFirstLaunched} />
          </StripeProvider>
          <ModalPortal />
        </UserContext>
      </Provider>
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
