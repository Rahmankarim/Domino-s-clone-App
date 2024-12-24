import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import productData from '../../Data/productData.json';

const MiltzImageList = ({ onItemClick }) => {
  if (!productData || !Array.isArray(productData)) {
    return <Text>No product data available</Text>;
  }

  const miltz = productData.filter(item => item.category === "Meltz");

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={miltz}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() => onItemClick(item.id)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  }
});

export default MiltzImageList;