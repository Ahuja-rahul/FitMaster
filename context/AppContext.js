import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to save the dark mode state in AsyncStorage
  const saveDarkModeState = async () => {
    try {
      await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(isDarkTheme));
    } catch (error) {
      console.error('Error saving dark mode state:', error);
    }
  };

  // Function to load the dark mode state from AsyncStorage
  const loadDarkModeState = async () => {
    try {
      const darkModeString = await AsyncStorage.getItem('@isDarkTheme');
      if (darkModeString !== null) {
        setIsDarkTheme(JSON.parse(darkModeString));
      } else {
        // If the value is not found in AsyncStorage, use the device appearance
        const deviceColorScheme = Appearance.getColorScheme();
        setIsDarkTheme(deviceColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading dark mode state:', error);
    }
  };

  useEffect(() => {
    loadDarkModeState();
  }, []);

  useEffect(() => {
    // Save dark mode state to AsyncStorage whenever it changes
    saveDarkModeState();
  }, [isDarkTheme]);

  return (
    <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </AppContext.Provider>
  );
};
