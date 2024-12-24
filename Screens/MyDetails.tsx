import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import supabase from '@/Lib/SupabaseClient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/components/types';

const MyDetails: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [hasExistingData, setHasExistingData] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const { data, error } = await supabase
      .from('user_details')
      .select('*')
      .single();

    if (data) {
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setHasExistingData(true);
    }
  };

  const handleSaveDetails = async () => {
    if (name && email && phone && address) {
      const operation = hasExistingData ? 
        supabase.from('user_details').update({ name, email, phone, address }) :
        supabase.from('user_details').insert([{ name, email, phone, address }]);

      const { error } = await operation;

      if (error) {
        alert('Error saving details: ' + error.message);
      } else {
        alert('Details saved successfully!');
        navigation.navigate('Home');
      }
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Details</Text>
      {hasExistingData ? (
        <View>
          <Text style={styles.label}>Name: {name}</Text>
          <Text style={styles.label}>Email: {email}</Text>
          <Text style={styles.label}>Phone: {phone}</Text>
          <Text style={styles.label}>Address: {address}</Text>
          <TouchableOpacity 
            onPress={() => setHasExistingData(false)} 
            style={styles.button}
          >
            <Text style={styles.buttonText}>Edit Details</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity onPress={handleSaveDetails} style={styles.button}>
            <Text style={styles.buttonText}>Save Details</Text>
          </TouchableOpacity>
        </>
      )}
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MyDetails;