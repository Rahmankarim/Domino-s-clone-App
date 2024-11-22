import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PaymentMethods = ({ route }) => {
  const { item } = route.params || {};
  const { cartItems, total } = item;

  const navigation = useNavigation();

  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentOptions = ["Cash", "Credit/Debit Card"];

  const handlePlaceOrder = () => {
    if (selectedMethod) {
      if (selectedMethod === "Credit/Debit Card") {
        navigation.navigate("CardInfo", { total });
      } else {
        navigation.navigate("OrderPlaced");
      }
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.subHeader}>Payment Method</Text>

        {paymentOptions.map((option, index) => (
          <View key={index} style={styles.radioOption}>
            <RadioButton
              value={option}
              status={selectedMethod === option ? "checked" : "unchecked"}
              onPress={() => setSelectedMethod(option)}
              color="#007BFF"
            />
            <Text style={styles.radioText}>{option}</Text>
          </View>
        ))}

        <Text style={styles.price}>Rs. {total.toString()}</Text>

        <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D32F2F",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentMethods;
