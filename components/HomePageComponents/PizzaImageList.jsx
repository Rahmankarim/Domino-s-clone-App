import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import productData from '../../Data/productData.json';

const PizzaImageList = ({ onItemClick }) => {

  if (!productData || !Array.isArray(productData)) {
    return <Text>No product data available</Text>;  // Show a fallback message
  }

  const pizzas = productData.filter(item => item.category === "Pizzas");

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <TouchableOpacity 
              key={pizza.id} 
              style={styles.productContainer} 
              onPress={() => onItemClick(pizza.id)}  // Trigger onItemClick with pizza id
            >
              <Image 
                source={{ uri: pizza.image }} 
                style={styles.productImage} 
              />
              <Text style={styles.productTitle}>{pizza.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No pizzas found</Text>  
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

export default PizzaImageList;
