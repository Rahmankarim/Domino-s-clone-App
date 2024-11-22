import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
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
    .then((response) => response.json())
      .then((data) => {
        setCardData(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  
    }, []);

  const filterCategory = (category) => {
    return cardData.filter(item => item.category === category);
  };

  const handleItemClick = (itemId) => {
    const item = cardData.find((product) => product.id === itemId);
    if (item) {
      navigation.navigate('Item', { itemId: item.id, products: cardData });
    }
  };
  const handleItemClickList = (itemId) => {
    const item = cardListData.find((product) => product.id === itemId);
    if (item) {
      navigation.navigate('Item', { itemId: item.id, products: cardListData });
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
    <ScrollView style={styles.container}> 
      <View style={styles.header}>
        <Image source={require('./../assets/images/logo.png')} style={styles.logo} />
      </View>
      <BannerSlider />
      <Text style={styles.welcomeText}>Welcome to Domino's!</Text>

      {/* Pizzas Section */}
      <Text style={styles.PizzasText}>Pizzas</Text>
      <PizzaImageList onItemClick={handleItemClickList} />
      <ImageCardGrid 
        data={filterCategory("Pizzas")} 
        onItemClick={handleItemClick} 
      /> 

      {/* Sides Section */}
      <Text style={styles.PizzasText}>Sides</Text>
      <SlidesImageList onItemClick={handleItemClickList} />
      <ImageCardGrid 
        data={filterCategory("Sides")} 
        onItemClick={handleItemClick} 
      />

      {/* Meltz Section */}
      <Text style={styles.PizzasText}>Meltz</Text>
      <MiltzImageList onItemClick={handleItemClickList} />
      <ImageCardGrid 
        data={filterCategory("Meltz")} 
        onItemClick={handleItemClick} 
      />

      {/* Desserts Section */}
      <Text style={styles.PizzasText}>Desserts</Text>
      <DessertImageList onItemClick={handleItemClickList} />
      <ImageCardGrid 
        data={filterCategory("Desserts")} 
        onItemClick={handleItemClick} 
      />

      {/* Drinks Section */}
      <Text style={styles.PizzasText}>Drinks</Text>
      <ColdImageList onItemClick={handleItemClickList} />
      <ImageCardGrid 
        data={filterCategory("Drinks")} 
        onItemClick={handleItemClick} 
      />

      {/* End of Page Section */}
      <EndofPage />
    </ScrollView> 
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
