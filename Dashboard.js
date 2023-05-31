import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import MyWorkoutScreen from './MyWorkoutScreen';
import StackNavigator from './assets/StackNavigator';


// Define your screen components
// const HomeScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home Screen</Text>
//     </View>
// );

// const MyworkoutScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Workout Screen</Text>
//     </View>
// );

const SettingsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings Screen</Text>
    </View>
);

// Create the bottom tab navigator
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
            component={SettingsScreen}
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
