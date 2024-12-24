import { NavigationProp } from '@react-navigation/native';

// Define the structure for the AddonOption
export type AddonOption = {
  option: string;
  price: number;
};

// Define the structure for Product (including addons and additional properties)
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

export type CartItem = {
  productId: number;
  quantity: number;
};

export type FavoriteItem = {
  id: number;
  dateAdded: string;
};

export type FavoritesState = {
  items: FavoriteItem[];
  loading?: boolean;
  error?: string;
};

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Stores: undefined;
  Item: { itemId: string; products: any[] };
  PaymentMethods: undefined;
  CardInfo: undefined;
  OrderPlaced: undefined;
  Cart: undefined;
  MyDetails: undefined;
  Orders: undefined;
  Help: undefined;
  Settings: undefined;
  Account: undefined;
  Favorites: undefined; 
};
export type NavigationProps = NavigationProp<RootStackParamList>;

// Define route params if needed for specific screens
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
  icon: string;
  isActive: boolean;
};

// Define the types for the Footer component (Navigation)
export type FooterNavigationProps = {
  navigate: (screen: keyof RootStackParamList) => void;
};

// Add Favorites related component props
export type FavoritesScreenProps = {
  navigation: NavigationProps;
  route: {
    params: RootStackParamList['Favorites'];
  };
};

// Add Favorites action types
export type FavoritesAction = 
  | { type: 'ADD_FAVORITE'; payload: number }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Add Favorites context type
export type FavoritesContextType = {
  favorites: FavoritesState;
  addFavorite: (productId: number) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
};

// Add type for favorites storage
export type FavoritesStorage = {
  getFavorites: () => Promise<FavoriteItem[]>;
  saveFavorites: (favorites: FavoriteItem[]) => Promise<void>;
  clearFavorites: () => Promise<void>;
};

// Add types for favorites API responses
export type FavoritesApiResponse = {
  success: boolean;
  data?: {
    favorites: FavoriteItem[];
  };
  error?: string;
};