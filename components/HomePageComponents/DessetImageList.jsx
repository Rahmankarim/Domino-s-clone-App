import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import productData from '../../Data/productData.json';

const DessertImageList = ({ onItemClick }) => {

  if (!productData || !Array.isArray(productData)) {
    return <Text>No product data available</Text>;
  }

  const desserts = productData.filter(item => item.category === "Desserts");

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        {desserts.length > 0 ? (
          desserts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productContainer} 
              onPress={() => onItemClick(item.id)} // Trigger onItemClick with item id
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.productImage} 
              />
              <Text style={styles.productTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No items found</Text>  
        )}
      </ScrollView>
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
  },
});

export default DessertImageList;
