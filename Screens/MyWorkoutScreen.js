import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { myWorkouts } from './Data/workouts';
import { AppContext } from '../context/AppContext';
import Modal from 'react-native-modal'; // Import the react-native-modal library
import { v4 as uuidv4 } from 'uuid';

export var myWorkouts = []
export default MyWorkoutScreen = ({ navigation }) => {
  const [createdWorkouts, setCreatedWorkouts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const { colors, isDarkTheme } = useContext(AppContext);
  myWorkouts = createdWorkouts

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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); // Toggle the state to show/hide the modal
  };

  const handleCreateWorkout = () => {
    // Show the custom modal to create a new workout
    toggleModal();
  };

  const handleCreateNewWorkout = () => {
    if (newWorkoutName) {
      const newWorkout = {
        id: uuidv4(), 
        name: newWorkoutName,
        exercises: [], // Initialize with an empty array of exercises for the new workout
      };

      setCreatedWorkouts([...createdWorkouts, newWorkout]);
      //myWorkouts = createdWorkouts
      myWorkouts.push(newWorkout)
      saveWorkoutsToAsyncStorage();
     
    }
    toggleModal(); // Close the modal after creating the workout
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
    <View style={styles.workoutItemContainer}>
      <TouchableOpacity style={styles.workoutItem} onPress={() => handleSelectWorkout(item)}>
        <Text style={styles.workoutName}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteWorkout(item.id)} style={styles.deleteButton}>
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
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create a New Workout</Text>
          <TextInput
            style={styles.input}
            value={newWorkoutName}
            onChangeText={setNewWorkoutName}
            placeholder="Enter workout name"
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={toggleModal} style={[styles.modalButton, styles.cancelButton]}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateNewWorkout} style={[styles.modalButton, styles.createButton]}>
              <Text style={styles.modalButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  createButton: {
    backgroundColor: 'green',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});