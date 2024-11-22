import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = ({ route }) => {
  const { item, selectedSize, totalAmount } = route.params || {};
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([
    {
      id: item?.id || 0,
      name: item?.name || "Unknown Item",
      size: selectedSize || item?.size || "Standard",
      price: totalAmount || item?.price || 0,
      quantity: 1,
    },
  ]);

  const [voucher, setVoucher] = useState("");

  const deliveryCharges = 129;
  const discount = 180;

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const grandTotal = itemsTotal + deliveryCharges - discount;
    return grandTotal;
  };

  const confirmOrderBtn = () => {
    navigation.navigate("PaymentMethods", {
      item: { cartItems, total: calculateTotal() },
    });
  };

  useEffect(() => {
    if (item) {
      setCartItems([
        {
          id: item.id,
          name: item.name,
          size: selectedSize,
          price: totalAmount,
          quantity: 1,
        },
      ]);
    }
  }, [item, selectedSize, totalAmount]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Voucher Section */}
      <View style={styles.voucherContainer}>
        <Text style={styles.sectionTitle}>Add a Voucher</Text>
        <View style={styles.voucherInputContainer}>
          <TextInput
            style={styles.voucherInput}
            placeholder="Enter a voucher code"
            value={voucher}
            onChangeText={setVoucher}
          />
          <TouchableOpacity style={styles.voucherButton}>
            <Text style={styles.voucherButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Details */}
      <Text style={styles.sectionTitle}>Order Details</Text>
      {cartItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <View>
            <Text style={styles.itemName}>
              {item.name} | {item.size}
            </Text>
            <Text style={styles.selectedItem}>Rs. {item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrease(item.id)}>
              <Ionicons name="remove-circle" size={24} color="#f00" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrease(item.id)}>
              <Ionicons name="add-circle" size={24} color="#00f" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <Ionicons name="trash" size={24} color="#f00" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Delivery Instructions */}
      <Text style={styles.instructionsTitle}>
        Delivery Instructions (Optional)
      </Text>
      <TextInput
        style={styles.instructionsInput}
        placeholder="Instructions for Delivery Expert"
        multiline
      />

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total</Text>
          <Text style={styles.summaryText}>
            Rs.{" "}
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Delivery Charges</Text>
          <Text style={styles.summaryText}>Rs. {deliveryCharges}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>POS Fee</Text>
          <Text style={styles.summaryText}>Rs. 0</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Your Discount</Text>
          <Text style={styles.summaryText}>Rs. {discount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Grand Total</Text>
          <Text style={styles.summaryTitle}>Rs. {calculateTotal()}</Text>
        </View>
      </View>

      {/* Confirm Order Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmOrderBtn}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  voucherContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemName: { fontSize: 16 },
  selectedItem: { color: 'grey' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityText: { marginHorizontal: 10 },
  removeButton: { padding: 10 },
  instructionsTitle: { marginTop: 20, fontSize: 16 },
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    height: 80,
  },
  summaryContainer: { marginTop: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  summaryText: { fontSize: 16 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold' },
  confirmButton: { backgroundColor: 'green', padding: 10, alignItems: 'center', marginTop: 20, borderRadius: 8 },
  confirmButtonText: { color: 'white', fontSize: 16 },
  voucherInputContainer: { flexDirection: 'row', alignItems: 'center' },
  voucherInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  voucherButton: {
    backgroundColor: '#00f',
    padding: 10,
    marginLeft: 8,
    borderRadius: 4,
  },
  voucherButtonText: { color: 'white', fontSize: 16 },
});

export default Cart;
