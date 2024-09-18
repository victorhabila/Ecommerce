import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>€{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        //onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#e52e0d",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{ color: "white" }}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={{ color: "white" }}>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
