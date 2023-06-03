import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const MyWorkoutScreen = () => {
  const [workout, setWorkout] = useState('');

  const handleStartWorkout = () => {
    // Implement your logic to start the workout
    setWorkout('Started');
  };

  return (
    <View>
      <Text>My Workout Screen</Text>
      <Text>Workout: {workout}</Text>
      <Button title="Start Workout" onPress={handleStartWorkout} />
    </View>
  );
};

export default MyWorkoutScreen;

