import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const TestScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const { userId, setUserId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  //fetch addresses
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.12:8000/addresses/${userId}`
      );

      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                key={index}
                style={[
                  {
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ccc",
                    borderRadius: 15,
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text style={{ color: "white" }}>&#10003;</Text>
                ) : (
                  <Text style={{ color: "white" }}>{index + 1}</Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View>
          <Text>Select Delivery Address</Text>

          {addresses?.map((item, index) => (
            <View
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingBottom: 17,
                marginVertical: 7,
                borderRadius: 6,
              }}
            >
              {selectedAddress && selectedAddress._id === item?._id ? (
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              ) : (
                <Entypo
                  onPress={() => setSelectedAdress(item)}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}
              <View style={{ marginLeft: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.houseNo}, {item?.landmark}
                </Text>

                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.street}
                </Text>

                <Text style={{ fontSize: 15, color: "#181818" }}>
                  India, Bangalore
                </Text>

                <Text style={{ fontSize: 15, color: "#181818" }}>
                  phone No : {item?.mobileNo}
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  pin code : {item?.postalCode}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 7,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                  >
                    <Text>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                  >
                    <Text>Remove</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                  >
                    <Text>Set as Default</Text>
                  </Pressable>
                </View>

                <View>
                  {selectedAddress && selectedAddress._id === item?._id && (
                    <Pressable
                      onPress={() => setCurrentStep(1)}
                      style={{
                        backgroundColor: "#e52e0d",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Deliver to this Address
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
