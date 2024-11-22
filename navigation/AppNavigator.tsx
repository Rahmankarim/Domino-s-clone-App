import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Menu from "../Screens/Menu";
import Home from "../Screens/Home";
import Stores from "../Screens/Stores";
import Item from "../Screens/Item";
import PaymentMethods from "../Screens/PaymentMethods";
import CardInfo from "../Screens/CardInfo";
import OrderPlaced from "../Screens/OrderPlaced";
import Footer from "../components/Footer";

import { RootStackParamList } from "../components/types";
import Cart from "@/Screens/Cart";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Menu" 
            component={Menu} 
            options={{ title: "Menu" }} 
          />
          <Stack.Screen 
            name="Stores" 
            component={Stores} 
            options={{ title: "Store Finder" }} 
          />
          <Stack.Screen 
            name="Item" 
            component={Item} 
            options={{ title: "Item Details" }} 
          />
          <Stack.Screen 
            name="PaymentMethods" 
            component={PaymentMethods} 
            options={{ title: "Select Payment Method" }} 
          />
          <Stack.Screen 
            name="CardInfo" 
            component={CardInfo} 
            options={{ title: "Enter Card Details" }} 
          />
          <Stack.Screen 
            name="OrderPlaced" 
            component={OrderPlaced} 
            options={{ title: "Order Confirmation" }} 
          />

          <Stack.Screen 
            name="Cart" 
            component={Cart} 
            options={{ title: "Cart" }} 
          />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
