import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const Item = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itemId, products } = route.params || {}; 

  if (!itemId || !products) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const item = products.find((product) => product.id === itemId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddOnChange = (category, option) => {
    setSelectedAddOns((prevSelectedAddOns) => ({
      ...prevSelectedAddOns,
      [category]: option,
    }));
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const calculateTotalAmount = () => {
    const basePrice = selectedSize
      ? item.sizes?.find((size) => size.name === selectedSize)?.price || 0
      : 0;

    let addOnsTotal = 0;
    Object.keys(selectedAddOns).forEach((key) => {
      const addonOption = selectedAddOns[key];
      const addon = item.addons?.[key]?.find((addon) => addon.option === addonOption);
      if (addon) {
        addOnsTotal += addon.price;
      }
    });

    return basePrice + addOnsTotal;
  };

  const getSelectedAddOns = () => {
    return Object.keys(selectedAddOns)
      .filter((key) => selectedAddOns[key] !== null)
      .map((key) => `${key}: ${selectedAddOns[key]}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>

        {item.sizes && (
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeTitle}>Select Size</Text>
            {item.sizes.map((size, index) => (
              <View key={index} style={styles.sizeOption}>
                <RadioButton
                  value={size.name}
                  status={selectedSize === size.name ? 'checked' : 'unchecked'}
                  onPress={() => handleSizeChange(size.name)}
                />
                <Text>{size.name} - Rs. {size.price}</Text>
              </View>
            ))}
          </View>
        )}

        {item.addons &&
          Object.keys(item.addons).map((addonCategory) => (
            <View key={addonCategory} style={styles.addonCategoryContainer}>
              <Text style={styles.addonCategory}>{addonCategory}</Text>
              {item.addons[addonCategory].map((addon, index) => (
                <View key={index} style={styles.addonOption}>
                  <RadioButton
                    value={addon.option}
                    status={selectedAddOns[addonCategory] === addon.option ? 'checked' : 'unchecked'}
                    onPress={() => handleAddOnChange(addonCategory, addon.option)}
                  />
                  <Text style={styles.addonOptionText}>
                    {addon.option} - Rs. {addon.price}
                  </Text>
                </View>
              ))}
            </View>
          ))}
      </ScrollView>

      <View style={styles.addToCartButtonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            const selectedItems = getSelectedAddOns();
            navigation.navigate('Cart', {
              item,
              selectedSize,
              selectedAddOns: selectedItems,
              totalAmount: calculateTotalAmount(),
            });
          }}
        >
          <Text style={styles.addToCartButtonText}>
            {`Add to Cart - Rs. ${calculateTotalAmount()}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingBottom: 120, // Ensure proper scrolling
  },
  image: {
    width: '100%',
    height: width * 0.6,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  sizeContainer: {
    marginBottom: 20,
  },
  sizeTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  sizeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: width * 0.05,
  },
  addonCategoryContainer: {
    marginBottom: 20,
  },
  addonCategory: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  addonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: width * 0.05,
  },
  addonOptionText: {
    fontSize: width * 0.04,
    color: '#555',
    marginLeft: 10,
  },
  addToCartButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    padding: 10,
    alignItems: 'center',
  },
  addToCartButton: {
    width: '100%',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default Item;
