import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/types';
import { useFavorites } from './../components/HomePageComponents/FavoritesContext.tsx';
import { MaterialIcons } from '@expo/vector-icons';
import { FavoriteItem } from './../components/HomePageComponents/FavoritesContext.tsx'; // Import the type

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Favorites'>;

const Favorites: React.FC = () => {
  const { state: { favorites }, removeFavorite } = useFavorites();
  const navigation = useNavigation<NavigationProp>();

  const handleItemClick = (itemId: number) => {
    navigation.navigate('Item', {
      itemId: itemId.toString(),
      products: favorites 
    });
  };

  const renderFavoriteItem = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleItemClick(item.id)} style={styles.itemDetails}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.dateText}>
            Added on: {new Date(item.dateAdded).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => removeFavorite(item.id)} 
        style={styles.removeButton}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite items yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  removeButton: {
    padding: 10,
  },
});

export default Favorites;