import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window"); // Get device width for responsive design

const CustomImageSlider = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current; // Animated value to track scroll position
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % images.length; // Increment index, reset to 0 if end is reached
      flatListRef.current.scrollToOffset({
        offset: currentIndex.current * width,
        animated: true,
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  // Render individual images
  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // Use native driver for better performance
        )}
        renderItem={renderItem}
      />

      {/* Indicator dots */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dot, { transform: [{ scale }], opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  imageContainer: {
    width, // Use the full width of the screen for the container
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width, // Set image width to fill the screen
    height: width * 0.6, // Adjust height as needed (currently 60% of the width)
    resizeMode: "cover",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#333",
    marginHorizontal: 7,
  },
});

export default CustomImageSlider;
