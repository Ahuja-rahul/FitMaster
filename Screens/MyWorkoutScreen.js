import React, { useState, useEffect , useContext} from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myWorkouts } from './Data/workouts';
import { AppContext } from '../context/AppContext';

const MyWorkoutScreen = ({ navigation }) => {
  const [createdWorkouts, setCreatedWorkouts] = useState([]);
  const { colors, isDarkTheme } = useContext(AppContext);

  // Function to save the created workouts in AsyncStorage
  const saveWorkoutsToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@myWorkouts', JSON.stringify(myWorkouts));
    } catch (error) {
      console.error('Error saving workouts to AsyncStorage:', error);
    }
  };

  // Function to load the created workouts from AsyncStorage
  const loadWorkoutsFromAsyncStorage = async () => {
    try {
      const workoutsString = await AsyncStorage.getItem('@myWorkouts');
      if (workoutsString) {
        const workouts = JSON.parse(workoutsString);
        setCreatedWorkouts(workouts);
      }
    } catch (error) {
      console.error('Error loading workouts from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Load workouts from AsyncStorage when the component mounts
    loadWorkoutsFromAsyncStorage();
  }, []);

  const handleCreateWorkout = () => {
    // Show an input dialog to create a new workout
    Alert.prompt('Create a New Workout', 'Enter workout name:', (name) => {
      if (name) {
        const newWorkout = {
          id: createdWorkouts.length + 1,
          name,
          exercises: [], // Initialize with an empty array of exercises for the new workout
        };
        myWorkouts.push(newWorkout);
        setCreatedWorkouts([...createdWorkouts, newWorkout]);
        saveWorkoutsToAsyncStorage(); // Save the updated workouts to AsyncStorage
      }
    });
  };

  const handleDeleteWorkout = (workoutId) => {
    // Find the index of the workout in the array
    const index = createdWorkouts.findIndex((workout) => workout.id === workoutId);
    if (index !== -1) {
      // Remove the workout from the array
      createdWorkouts.splice(index, 1);
      setCreatedWorkouts([...createdWorkouts]);
      saveWorkoutsToAsyncStorage(); // Save the updated workouts to AsyncStorage
    }
  };

  const handleSelectWorkout = (selectedWorkout) => {
    navigation.navigate('My Workouts', { workout: selectedWorkout });
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={[styles.workoutItemContainer, isDarkTheme && styles.darkContainer ]}>
      <TouchableOpacity style={styles.workoutItem} onPress={() => handleSelectWorkout(item)}>
        <Text style={[styles.workoutName, isDarkTheme && styles.darkText]}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteWorkout(item.id)} style={[styles.deleteButton, isDarkTheme && styles.darkBox]}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  
  

  return (
    <View style={[styles.container, isDarkTheme && styles.darkText && styles.darkBox && styles.darkContainer]}>
      <Button title="Create Workout" onPress={handleCreateWorkout} />
      <Text style={[styles.subheader, isDarkTheme && styles.darkText && styles.darkBox && styles.darkContainer]}>Created Workouts:</Text>
      <FlatList
        data={createdWorkouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#000000', // Dark mode background color
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#478484', 
  },
  workoutItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  workoutItem: {
    flex: 1,
    padding: 10,
  },
  workoutName: {
    fontSize: 18,
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  darkText: {
    color: '#FFFFFF', // Dark mode text color
  },
  darkBox: {
    backgroundColor: '#333333', // Dark mode background color for the box
  },
});

export default MyWorkoutScreen;
