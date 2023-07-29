import React, { useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Dashboard';
import MyStack from './assets/StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DarkTheme from '/Users/krunalparmar/MAP/SEM3/Cpstone/FitMaster/theme/DarkTheme.js';
import DefaultTheme from '/Users/krunalparmar/MAP/SEM3/Cpstone/FitMaster/theme/DefaultTheme.js';
import { AppContext } from './context/AppContext';
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme
    }
  });

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <AppContext.Provider value={appContext}>
      <MyStack initialRouteName='Home' screenOptions={{ headerShown: false }}/>
      </AppContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
