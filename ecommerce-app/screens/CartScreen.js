import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartReducer";
import { TouchableOpacity } from "react-native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const navigation = useNavigation();

  console.log(cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#e52e0d",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 10,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput
            placeholder="Search for products"
            placeholderTextColor="grey"
            style={{ color: "black" }}
          />
        </Pressable>
        {/* <Feather name="mic" size={24} color="black" /> */}
      </View>

      {cart.length > 0 ? (
        <View>
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>€{total}</Text>
          </View>
          <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

          <Pressable
            onPress={() => navigation.navigate("Confirm")}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text>Proceed to checkout ({cart.length}) items</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            marginTop: 140,
            flexDirection: "colume",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/empty.jpg")}
            style={{ width: 240, height: 240 }}
          />
          <Text>Oh!, Your cart is empty. Please add item to cart.</Text>

          <View>
            <Text
              style={{
                color: "#e52e0d",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Happy Shopping
            </Text>
          </View>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 16,
            }}
          />
        </View>
      )}

      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>

              <View>
                <Text numberOfLines={4} style={{ width: 160, marginTop: 10 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                  €{item?.price}
                </Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
              }}
            >
              {/* <Pressable
                onPress={() => navigation.navigate("Test")}
                style={{
                  backgroundColor: "#e52e0d",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text style={{ color: "white" }}>Save For Later</Text>
              </Pressable> */}
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
