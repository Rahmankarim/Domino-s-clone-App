import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; 

const Stores = () => {
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null); 

  useEffect(() => {
    // Store data initialization
    const storeData = [
      {
        id: 1,
        name: "Domino's Store Karachi - Main Boulevard",
        address: "Shop 23, Main Boulevard, Karachi, Sindh",
        latitude: 24.8607,
        longitude: 67.0011
      },
      {
        id: 2,
        name: "Domino's Store Lahore - Model Town",
        address: "Block C, Model Town, Lahore, Punjab",
        latitude: 31.5204,
        longitude: 74.3587
      },
      {
        id: 3,
        name: "Domino's Store Islamabad - F-6 Markaz",
        address: "F-6 Markaz, Islamabad, Capital Territory",
        latitude: 33.6844,
        longitude: 73.0479
      },
      {
        id: 4,
        name: "Domino's Store Rawalpindi - Saddar",
        address: "Shop 5, Saddar, Rawalpindi, Punjab",
        latitude: 33.6844,
        longitude: 73.0477
      },
      {
        id: 5,
        name: "Domino's Store Peshawar - University Road",
        address: "University Road, Peshawar, Khyber Pakhtunkhwa",
        latitude: 34.0152,
        longitude: 71.5249
      },
      {
        id: 6,
        name: "Domino's Store Multan - Khanewal Road",
        address: "Khanewal Road, Multan, Punjab",
        latitude: 30.1575,
        longitude: 71.5249
      }
    ];

    setStores(storeData);

    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          setUserLocation(location.coords);
          setLoading(false); // Stop loading once the location is fetched
        } else {
          Alert.alert('Permission Denied', 'Unable to access your location');
          setLoading(false); // Stop loading on permission denial
        }
      } catch (error) {
        console.error("Error fetching location: ", error);
        Alert.alert('Error', 'Failed to fetch location. Please try again.');
        setLoading(false); // Stop loading in case of an error
      }
    };

    getLocation();
  }, []);

  if (loading || !userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002D62" />
      </View>
    );
  }

  const renderStoreItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.storeCard} 
      onPress={() => setSelectedStore(item)} // Update selectedStore when pressed
    >
      <Text style={styles.storeName}>{item.name}</Text>
      <Text style={styles.storeAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Store Finder</Text>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView 
          style={styles.map}
          region={selectedStore ? {
            latitude: selectedStore.latitude,
            longitude: selectedStore.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          } : {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              title={store.name}
              description={store.address}
            />
          ))}
        </MapView>
      </View>

      {/* Store List */}
      <FlatList
        data={stores}
        renderItem={renderStoreItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.storeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#002D62',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 300,
  },
  map: {
    flex: 1,
  },
  storeList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  storeCard: {
    backgroundColor: '#002D62',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  storeAddress: {
    fontSize: 14,
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Stores;
