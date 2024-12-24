import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export type FavoriteItem = {
  id: number;
  name: string;
  image: string;
  dateAdded: string;
};

type FavoritesState = {
  favorites: FavoriteItem[];
};

type FavoritesAction = 
  | { type: 'ADD_FAVORITE'; payload: FavoriteItem }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'SET_FAVORITES'; payload: FavoriteItem[] };

type FavoritesContextType = {
  state: FavoritesState;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

// Reducer
const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.some(f => f.id === action.payload.id)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return { ...state, favorites: state.favorites.filter(f => f.id !== action.payload) };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

// Context Provider
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  useEffect(() => {
    // Load favorites from AsyncStorage on initialization
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          dispatch({ 
            type: 'SET_FAVORITES', 
            payload: JSON.parse(storedFavorites) 
          });
        }
      } catch (error) {
        console.error('Error loading favorites', error);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    // Save favorites to AsyncStorage whenever they change
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      } catch (error) {
        console.error('Error saving favorites', error);
      }
    };
    saveFavorites();
  }, [state.favorites]);

  const addFavorite = (item: FavoriteItem) => {
    dispatch({ 
      type: 'ADD_FAVORITE', 
      payload: { ...item, dateAdded: new Date().toISOString() } 
    });
  };

  const removeFavorite = (id: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  };

  const isFavorite = (id: number) => {
    return state.favorites.some(f => f.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ state, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Create Context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Custom Hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};