import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ImageCardGrid = ({ data, onItemClick }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => onItemClick(item.id)}>
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
});

export default ImageCardGrid;
