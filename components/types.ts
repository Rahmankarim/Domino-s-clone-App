// Define the structure for the Product
export type AddonOption = {
    option: string;
    price: number;
  };
  
  export type Product = {
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
  
  // Define the structure for Category (for menu categories)
  export type Category = {
    id: string;
    name: string;
  };
  
  export type RootStackParamList = {
    Home: undefined;      
    Menu: undefined;      
    Stores: undefined;      
    Account: undefined;    
    Item: { itemId: number, products: Product[] };
    PaymentMethods: undefined; 
    CardInfo: undefined;
    OrderPlaced: undefined;
    Cart: undefined;
  };
  
  // Define the type for the Navigation Prop
  import { NavigationProp } from '@react-navigation/native';
  export type NavigationProps = NavigationProp<RootStackParamList>;
  
  // Optionally define route params if needed for specific screens
  export type ItemScreenRouteProps = {
    route: {
      params: {
        itemId: number;
        products: Product[];
      };
    };
  };
  
  // Define types for user authentication (if needed)
  export type User = {
    id: number;
    name: string;
    email: string;
    isAuthenticated: boolean;
  };
  
  // Define types for payment methods
  export type PaymentMethod = {
    id: string;
    name: string;
    icon: string; // Icon URL or name for the payment method
    isActive: boolean; // To track if the payment method is active
  };
  
  // Define the types for the Footer component (Navigation)
  export type FooterNavigationProps = {
    navigate: (screen: keyof RootStackParamList) => void;
  };
  
  // Optionally, define any other reusable types for your app here
  