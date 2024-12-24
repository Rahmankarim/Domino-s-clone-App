import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import supabase from '@/Lib/SupabaseClient';

// Define your navigation stack types
type RootStackParamList = {
  Home: undefined; // 'Home' screen does not expect any parameters
  // Add other routes as needed
};

const Orders: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Use navigation with the type of your stack
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCartItems = async () => {
      const items: any = [];
      const totalAmount = items.reduce((sum: any, item: any) => sum + item.price, 0);
      setCartItems(items);
      setTotal(totalAmount);
    };

    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    navigation.navigate('Home'); // No TypeScript error here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Order Summary</Text>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>{item.name}</Text>
          <Text>Rs. {item.price}</Text>
        </View>
      ))}
      <Text style={styles.total}>Total: Rs. {total}</Text>
      <TouchableOpacity onPress={handlePlaceOrder} style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Orders;
