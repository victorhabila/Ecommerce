import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const ProductInfoScreen = () => {
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const route = useRoute();
  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
      showsHorizontalScrollIndicator={false}
    >
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
        <Feather name="mic" size={24} color="black" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#e52e0d",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  24% Off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#e52e0d",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="white"
                />
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#e52e0d",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="white" />
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          €{route?.params?.price}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total Price : {route?.params?.price}
        </Text>
        <Text style={{ color: "#e52e0d" }}>
          Free delivery tomorrow by 3pm. Orders between 10hrs,30min.
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="location" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Delivered to Victor - Franconville 95130
          </Text>
        </View>
      </View>
      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        In Stock
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#e52e0d",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderRadius: 20,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
          Add to cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#d58505",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderRadius: 20,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: "black", fontWeight: "500", fontSize: 15 }}>
          Buy Now
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
