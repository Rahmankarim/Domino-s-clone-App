import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
const Footer= () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Menu')}>
        <Ionicons name="pizza-outline" size={24} color="#fff" />
        <Text style={styles.footerText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Stores')}>
          <Ionicons name="storefront" size={24} color="#fff" />
          <Text style={styles.footerText}>Stores</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person" size={24} color="#fff" />
          <Text style={styles.footerText}>Account</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#002D62',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerButton: { alignItems: 'center' },
  footerText: { fontSize: 12, color: '#fff', marginTop: 4 },
});

export default Footer;
