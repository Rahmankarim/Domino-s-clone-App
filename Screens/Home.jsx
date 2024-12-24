import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BannerSlider from "../components/HomePageComponents/bannerSlider";
import ImageCardGrid from "../components/HomePageComponents/ImageCardGrid";
import PizzaImageList from '../components/HomePageComponents/PizzaImageList';  
import SlidesImageList from '../components/HomePageComponents/SlidesImageList';
import MiltzImageList from '../components/HomePageComponents/MiltzImageList';  
import DessertImageList from "../components/HomePageComponents/DessetImageList";
import ColdImageList from "../components/HomePageComponents/ColdImageList";
import EndofPage from "../components/EndofPage";
import ProductData from "../Data/productData.json";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [cardListData, setCardListData] = useState(ProductData);  
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Rahmankarim/Domino-sData/main/DominosData.json')
      .then(response => response.json())
      .then(data => {
        setCardData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filterCategory = (category) => {
    return cardData.filter(item => item.category === category);
  };

  const handleItemClick = (itemId) => {
    const item = cardData.find(product => product.id === itemId);
    if (item) {
      navigation.navigate('Item', { itemId: item.id, products: cardData });
    }
  };

  const handleItemClickList = (itemId) => {
    const item = cardListData.find(product => product.id === itemId);
    if (item) {
      navigation.navigate('Item', { itemId: item.id, products: cardListData });
    }
  };

  const sections = [
    { type: 'header', data: [null] },
    { type: 'banner', data: [null] },
    { type: 'welcome', data: [null] },
    { type: 'category', title: 'Pizzas', horizontalList: PizzaImageList, data: filterCategory("Pizzas") },
    { type: 'category', title: 'Sides', horizontalList: SlidesImageList, data: filterCategory("Sides") },
    { type: 'category', title: 'Meltz', horizontalList: MiltzImageList, data: filterCategory("Meltz") },
    { type: 'category', title: 'Desserts', horizontalList: DessertImageList, data: filterCategory("Desserts") },
    { type: 'category', title: 'Drinks', horizontalList: ColdImageList, data: filterCategory("Drinks") },
    { type: 'footer', data: [null] }
  ];

  const renderItem = ({ item, index }) => {
    const section = sections[index];

    switch (section.type) {
      case 'header':
        return (
          <View style={styles.header}>
            <Image source={require('./../assets/images/logo.png')} style={styles.logo} />
          </View>
        );
      case 'banner':
        return <BannerSlider />;
      case 'welcome':
        return <Text style={styles.welcomeText}>Welcome to Domino's!</Text>;
      case 'category':
        const HorizontalList = section.horizontalList;
        return (
          <View>
            <Text style={styles.PizzasText}>{section.title}</Text>
            <HorizontalList onItemClick={handleItemClickList} />
            <ImageCardGrid data={section.data} onItemClick={handleItemClick} />
          </View>
        );
      case 'footer':
        return <EndofPage />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002D62" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={sections}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  PizzasText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002D62',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});

export default Home;