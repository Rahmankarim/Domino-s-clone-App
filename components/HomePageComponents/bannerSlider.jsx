import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    { image: require("./../../assets/images/T1.jpg"), caption: "Chicken Seekh Khabab" },
    { image: require("./../../assets/images/T2.jpg"), caption: "Super Loaded Pan Pizza" },
    { image: require("./../../assets/images/T3.jpg"), caption: "Delicious Loaded Pizza" },
    { image: require("./../../assets/images/T4.jpg"), caption: "Loaded Fries" },
    { image: require("./../../assets/images/T5.png"), caption: "MyBox Sides With Drinks" },

  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  return (
    <View style={styles.sliderContainer}>
      {/* <TouchableOpacity onPress={prevSlide} style={styles.navButton}>
        <Text style={styles.navText}>&#8592;</Text>
      </TouchableOpacity> */}
      <View style={styles.slide}>
        <Image source={banners[currentIndex].image} style={styles.image} />
        <Text style={styles.caption}>{banners[currentIndex].caption}</Text>
      </View>
      {/* <TouchableOpacity onPress={nextSlide} style={styles.navButton}>
        <Text style={styles.navText}>&#8594;</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  caption: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 24,
    color: "#333",
  },
});

export default BannerSlider;
