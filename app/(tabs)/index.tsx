import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AppNavigator from './../../navigation/AppNavigator'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationIndependentTree> 
                <AppNavigator />
        </NavigationIndependentTree>

    </SafeAreaProvider>
  );
}
