import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.12:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.12:8000/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);
  console.log("orders", orders);
  return (
    <ScrollView
      style={{ padding: 10, flex: 1, backgroundColor: "white", marginTop: 55 }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Welcome, {user?.name}
      </Text>

      {/* Quick Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Your Orders</Text>
        </Pressable>
        <Pressable style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Buy Again</Text>
        </Pressable>
        <Pressable onPress={logout} style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Logout</Text>
        </Pressable>
      </View>

      {/* Orders Section */}
      <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 20 }}>
        Your Recent Orders
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable style={styles.orderCard} key={order._id}>
              {/* Order Date */}
              <Text style={styles.orderDate}>
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </Text>

              {/* Product Image */}
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{product.name}</Text>
                </View>
              ))}

              {/* Order Details */}
              <View style={{ marginVertical: 8 }}>
                <Text style={styles.orderStatus}>
                  Payment: {order.paymentMethod}
                </Text>
                <Text style={styles.orderTotal}>
                  Total: ${order.totalPrice}
                </Text>
              </View>

              {/* View Details Button */}
              <Pressable style={styles.viewDetailsButton}>
                <Text style={{ color: "#fff" }}>View Details</Text>
              </Pressable>
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  quickActionButton: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
  },
  quickActionText: {
    textAlign: "center",
    fontWeight: "500",
  },
  orderCard: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    width: 200, // Set width to accommodate details
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "normal",
  },
  orderDate: {
    fontSize: 12,
    color: "#888",
  },
  orderStatus: {
    fontSize: 14,
    color: "#2e8b57",
    fontWeight: "600",
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  viewDetailsButton: {
    marginTop: 10,
    backgroundColor: "#e52e0d",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
});
