import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderPlaced = () => {
  const navigation = useNavigation();

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.text}>Thank you for your purchase.</Text>
        <Text style={styles.text}>
          Your order is being processed and will be delivered soon.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleContinueShopping} style={styles.button}>
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    maxWidth: 400,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderPlaced;
