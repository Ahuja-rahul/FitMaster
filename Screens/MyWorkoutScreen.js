import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { data, myWorkouts } from './Data/workouts';

const MyWorkoutScreen = ({ navigation }) => {
  const [workout, setWorkout] = useState('');
  const [createdWorkouts, setCreatedWorkouts] = useState([]);

  const handleCreateWorkout = () => {
    // Show an input dialog to create a new workout
    Alert.prompt('Create a New Workout', 'Enter workout name:', (name) => {
      if (name) {
        const newWorkout = {
          id: myWorkouts.length + 1,
          name,
          exercises: [], // Initialize with an empty array of exercises for the new workout
        };
        myWorkouts.push(newWorkout);
        setCreatedWorkouts([...createdWorkouts, newWorkout]);
      }
    });
  };

  const handleSelectWorkout = (selectedWorkout) => {
    navigation.navigate('My Workouts', { workout: selectedWorkout });
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectWorkout(item)}>
      <View style={{ padding: 10 }}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Button title="Create Workout" onPress={handleCreateWorkout} />
      <Text>Created Workouts:</Text>
      <FlatList
        data={createdWorkouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MyWorkoutScreen;
