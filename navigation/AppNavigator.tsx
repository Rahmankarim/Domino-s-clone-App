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
import MyDetails from "@/Screens/MyDetails";
import Orders from "@/Screens/Order";
import Help from "@/components/Help";
import Settings from "@/Screens/Settings";
import Account from "@/Screens/Account";
import Favorites from "@/Screens/Favourites"; 
import { FavoritesProvider } from "@/components/HomePageComponents/FavoritesContext.tsx";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <FavoritesProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Menu" component={Menu} options={{ title: "Menu" }} />
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
          <Stack.Screen name="Cart" component={Cart} options={{ title: "Cart" }} />
          <Stack.Screen
            name="MyDetails"
            component={MyDetails}
            options={{ title: "My Details" }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{ title: "Orders" }}
          />
          <Stack.Screen name="Help" component={Help} options={{ title: "Help" }} />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: "Settings" }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ title: "Account" }}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{ title: "Favorites" }}
          />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </SafeAreaProvider>
    </FavoritesProvider>
  );
};

export default AppNavigator;
