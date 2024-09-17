import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("error message", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    //using axios to send request
    axios
      .post("http://192.168.1.12:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;

        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login error", "Invalid email");
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{ width: 160, height: 155, marginTop: 40 }}
          source={{
            uri: "https://seeklogo.com/images/M/m-design-logo-09A5D82F03-seeklogo.com.png",
          }}
        />
      </View>

      <View styles={styles.signin_welcome}>
        <Text style={styles.signInText}>Sign In</Text>
        <Text style={styles.welcomeText}>
          Welcome back! Glad to see you again.
        </Text>
      </View>

      <View style={styles.inputContainer}>
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
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: 340,
        }}
      >
        <TouchableOpacity>
          <Text style={{ color: "black", fontSize: 12 }}>
            Keep me logged in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forget Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInButtonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ alignItems: "center", fontSize: 16, color: "grey" }}>
          Dont have an account? Sign Up.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    color: "black",
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
    backgroundColor: "#dd1576",
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
