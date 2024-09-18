import { Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const dotComponent = ({ selected }) => {
    return (
      <View
        style={{
          width: 20,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: selected ? 1 : 0,
          borderRadius: 20,
          borderColor: selected ? "#f8b6a3" : "black",

          padding: 10,
          margin: 5,
        }}
      >
        <View
          style={{
            width: 10,
            height: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: selected ? "#e52e0d" : "#f8b6a3",
          }}
        ></View>
      </View>
    );
  };
  return (
    <Onboarding
      onSkip={() => navigation.replace("Main")}
      onDone={() => navigation.replace("Main")}
      DotComponent={dotComponent}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/oneA.png")}
              style={{ width: 240, height: 240 }}
            />
          ),
          title: "Happy Shopping",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/twoA.png")}
              style={{ width: 240, height: 240 }}
            />
          ),
          title: "Discount Payment",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/threeA.png")}
              style={{ width: 240, height: 240 }}
            />
          ),
          title: "Shop Now",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
