import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/components/types'; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PaymentMethods: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const navigation = useNavigation<NavigationProp>(); 

  const paymentOptions = ['Cash', 'Credit/Debit Card'];

  const handlePlaceOrder = () => {
    if (selectedMethod) {
      if (selectedMethod === 'Credit/Debit Card') {
        navigation.navigate('CardInfo'); 
      } else {
        navigation.navigate('OrderPlaced');  
      }
    } else {
      alert('Please select a payment method');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Payment Method</Text>
      {paymentOptions.map((option, index) => (
        <View key={index} style={styles.radioOption}>
          <RadioButton
            value={option}
            status={selectedMethod === option ? 'checked' : 'unchecked'}
            onPress={() => setSelectedMethod(option)}
            color="#007BFF"
          />
          <Text style={styles.radioText}>{option}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
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
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentMethods;
