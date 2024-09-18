import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    //sending post request to the backend

    axios
      .post("http://192.168.1.12:8000/register", user)
      .then((response) => {
        console.log("Server response:", response); // Debugging line
        Alert.alert(
          "Registration successful",
          "You have been registered successfully."
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering."
        );
        console.log("Registration failed", error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{ width: 160, height: 155, marginTop: 30 }}
          source={
            {
              //uri: "https://seeklogo.com/images/M/m-design-logo-09A5D82F03-seeklogo.com.png",
            }
          }
        />
      </View>

      <View styles={styles.signin_welcome}>
        <Text style={styles.signInText}>Sign Up</Text>
        <Text style={styles.welcomeText}>
          Welcome back! Glad to see you again.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputIcons}>
          <FontAwesome5
            style={styles.matIcon}
            name="user-circle"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.inputIcons}>
          <MaterialIcons
            style={styles.matIcon}
            name="email"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>

        <View style={styles.inputIcons}>
          <FontAwesome
            style={styles.matIcon}
            name="lock"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <View style={styles.signInButtonContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ alignItems: "center", fontSize: 16, color: "grey" }}>
          Already have an account? Sign in.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },

  image: {
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    fontSize: 26,
    color: "black",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: "black",
    marginBottom: 10,
  },

  signin_welcome: {
    marginTop: 150,
    alignItems: "center",
  },

  inputContainer: {
    marginTop: 20,
  },

  input: {
    width: 300,
    borderRadius: 10,
    marginVertical: 10,
    color: "grey",
  },

  matIcon: {
    marginLeft: 8,
    fontSize: 24,
    color: "grey",
  },

  inputIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f5f5f5",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },

  forgotPassword: {
    fontSize: 12,
    color: "#42a5f5",
    fontWeight: "500",
  },
  signInButtonContainer: {
    marginTop: 80,
  },
  signInButton: {
    width: 340,
    backgroundColor: "#e52e0d",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
