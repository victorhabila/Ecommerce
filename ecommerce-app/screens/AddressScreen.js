import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const { params } = useRoute();
  let address = params;

  console.log("edit address data", address);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken); // Log the entire token to inspect its structure
          const userId = decodedToken.userId; // Adjust this line if the key is different
          setUserId(userId);
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchUser();

    if (address) {
      setName(address.name || "");
      setMobileNo(address.mobileNo || "");
      setHouseNo(address.houseNo || "");
      setStreet(address.street || "");
      setLandmark(address.landmark || "");
      setPostalCode(address.postalCode || "");
    }
  }, [address]);
  //console.log("Decoded Token:", decodedToken);
  //console.log(userId);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    axios
      .post("http://192.168.1.12:8000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Addresses added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
      });
  };

  const handleUpdateAddress = () => {
    const updatedAddress = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    axios
      .put(`http://192.168.1.12:8000/addresses/${address._id}`, {
        userId,
        address: updatedAddress,
      })
      .then((response) => {
        Alert.alert("Success", "Address updated successfully");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to update address");
        console.log("error", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 50, backgroundColor: "#f9f9f9" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          backgroundColor: "#e52e0d",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            textAlign: "center",
            color: "white",
          }}
        >
          {address ? "Edit this address" : "Add a new Address"}
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              Full Name (First and Last Name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              style={{
                padding: 12,
                borderColor: "#ddd",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
              }}
            />
          </View>

          {/* Mobile Number */}
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              Mobile Number
            </Text>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholder="Enter your mobile number"
              placeholderTextColor="#999"
              style={{
                padding: 12,
                borderColor: "#ddd",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
              }}
            />
          </View>

          {/* Address Details */}
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              Flat, House No, Building, Company
            </Text>
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              placeholder="Enter address details"
              placeholderTextColor="#999"
              style={{
                padding: 12,
                borderColor: "#ddd",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
              }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              Area, Street, Sector, Village
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholder="Enter area details"
              placeholderTextColor="#999"
              style={{
                padding: 12,
                borderColor: "#ddd",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
              }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              Landmark
            </Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholder="Eg. Near Apollo Hospital"
              placeholderTextColor="#999"
              style={{
                padding: 12,
                borderColor: "#ddd",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
              }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              Pincode
            </Text>
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholder="Enter Pincode"
              placeholderTextColor="#999"
              style={{
                padding: 12,
                borderColor: "#ddd",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
              }}
            />
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={() => {
              if (address._id) {
                handleUpdateAddress();
              } else {
                handleAddAddress();
              }
            }}
            style={{
              backgroundColor: "#e52e0d",
              paddingVertical: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
              {address ? "Save" : "Add Address"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
