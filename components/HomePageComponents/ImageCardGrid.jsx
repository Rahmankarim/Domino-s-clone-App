import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from './FavoritesContext.tsx';

const ImageCardGrid = ({ data, onItemClick }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite({
        id: item.id,
        name: item.name,
        image: item.image,
        dateAdded: new Date().toISOString()
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onItemClick(item.id)}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
            defaultSource={require('../../assets/images/logo.png')}
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        {item.name && <Text style={styles.name}>{item.name}</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => toggleFavorite(item)}
      >
        <MaterialIcons
          name={isFavorite(item.id) ? "favorite" : "favorite-border"}
          size={24}
          color={isFavorite(item.id) ? "#ff0000" : "#000000"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString() || item.name?.toString()}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
  }
});

export default ImageCardGrid;