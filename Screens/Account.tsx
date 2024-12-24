import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MyDetails: undefined;
  Orders: undefined;
  Favorites: undefined;  
  Help: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Account: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const options: { id: keyof RootStackParamList; icon: keyof typeof Ionicons.glyphMap; title: string }[] = [
    { id: 'MyDetails', icon: 'person-outline', title: 'My Details' },
    { id: 'Orders', icon: 'receipt-outline', title: 'Orders' },
    { id: 'Favorites', icon: 'heart-outline', title: 'Favorites' },  
    { id: 'Help', icon: 'help-circle-outline', title: 'Help' },
    { id: 'Settings', icon: 'settings-outline', title: 'Settings' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Account Options</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionBox}
            onPress={() => navigation.navigate(option.id)} 
            accessibilityLabel={`Navigate to ${option.title}`}
            accessibilityRole="button"
          >
            <Ionicons name={option.icon} size={32} color="#007BFF" />
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionBox: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default Account;
