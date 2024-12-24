import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const CardInfo = ({ route }) => {
  const navigation = useNavigation();
  const { total } = route.params;

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handlePay = () => {
    navigation.navigate('OrderPlaced');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardIcons}>
        <Text style={styles.cardIconText}>Visa</Text>
        <Text style={styles.cardIconText}>MasterCard</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Cardholder name (exactly as shown on card)"
        value={cardholderName}
        onChangeText={setCardholderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Card number"
        value={cardNumber}
        keyboardType="numeric"
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="MM / YY"
        value={expiryDate}
        keyboardType="numeric"
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Security code"
        value={securityCode}
        keyboardType="numeric"
        onChangeText={setSecurityCode}
      />
      <TouchableOpacity
        style={[styles.button, !(cardholderName && cardNumber && expiryDate && securityCode) && styles.disabledButton]}
        onPress={handlePay}
        disabled={!(cardholderName && cardNumber && expiryDate && securityCode)}
      >
        <Text style={styles.buttonText}>Pay Rs.{total}</Text> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  cardIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  cardIconText: {
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default CardInfo;
