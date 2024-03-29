import React, { useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Dashboard';
import MyStack from './assets/StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';
import DarkTheme from './theme/DarkTheme'
import DefaultTheme from './theme/DefaultTheme';
import { AppContext } from './context/AppContext';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme
    }
  });

  return (
    <AppProvider>
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <AppContext.Provider value={appContext}>
      <MyStack initialRouteName='Home' screenOptions={{ headerShown: false }}/>
      </AppContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
    </AppProvider>
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
