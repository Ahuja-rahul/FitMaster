import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './Screens/HomeScreen';
import MyWorkoutScreen from './Screens/MyWorkoutScreen';
import SearchScreen from './Screens/SearchScreen'; 
import SettingScreen from './Screens/SettingScreen';


const Tab = createBottomTabNavigator();

const Dashboard = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Search" 
      component={SearchScreen} 
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="My Workout"
      component={MyWorkoutScreen}
      options={{
        tabBarLabel: 'My Workout',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="fitness-center" size={24} color="black" />
        )
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <Icon name="settings-outline" color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
);

export default Dashboard;
