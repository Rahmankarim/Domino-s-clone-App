import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import productsData from '../Data/productData.json'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';

type AddonOption = {
  option: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  addons?: {
    size?: AddonOption[];
    crust?: AddonOption[];
    sauce?: AddonOption[];
    extraToppings?: AddonOption[];
    topping?: AddonOption[];
  };
};

type Category = {
  id: string;
  name: string;
};

interface MenuProps {
  navigation: NavigationProp<any>; 
}

const { width } = Dimensions.get('window');

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Pizzas');
  const sectionListRef = useRef<SectionList<Product> | null>(null);

  const categories: Category[] = [
    { id: '1', name: 'Pizzas' },
    { id: '2', name: 'Sides' },
    { id: '3', name: 'Meltz' },
    { id: '4', name: 'Desserts' },
    { id: '5', name: 'Drinks' },
  ];

  const groupedProducts = categories.map((category) => ({
    title: category.name,
    data: productsData.filter((product) => product.category === category.name),
  }));

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
    const sectionIndex = categories.findIndex((item) => item.name === category);
    if (sectionListRef.current && sectionIndex !== -1) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  const navigateToItemPage = (item: Product) => {
    navigation.navigate('Item', { itemId: item.id, products: productsData });
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item.name)}>
      <Text
        style={[
          styles.category,
          activeCategory === item.name && styles.activeCategory,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.card, { width: width / 2 - 20 }]}
      onPress={() => navigateToItemPage(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.price}>Rs. {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* Category List */}
        <FlatList
          data={categories}
          horizontal
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        />

        {/* Product List */}
        <SectionList
          ref={sectionListRef}
          sections={groupedProducts}
          renderItem={({ item }) => (
            <FlatList
              data={[item]}
              renderItem={renderProduct}
              keyExtractor={(product) => product.id.toString()}
              numColumns={2}
              scrollEnabled={false}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.heading}>{title}</Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* End of Page Component */}
      </View>

    </SafeAreaProvider>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categories: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  category: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    padding: 5,
  },
  activeCategory: {
    color: '#e63946',
    borderBottomWidth: 2,
    borderBottomColor: '#e63946',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  cardDescription: {
    color: '#666',
    fontSize: 12,
    marginVertical: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#000',
    textAlign: 'center',
  },
});
