import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { data, myWorkouts } from './Data/workouts'; // Import created workouts list
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(data);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const { colors, isDarkTheme } = useContext(AppContext);

  // Function to save the workouts to AsyncStorage
  const saveWorkoutsToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@myWorkouts', JSON.stringify(myWorkouts));
    } catch (error) {
      console.error('Error saving workouts to AsyncStorage:', error);
    }
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);

    const filtered = data.filter(
      (workout) =>
        workout.name.toLowerCase().includes(query.toLowerCase()) ||
        workout.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWorkouts(filtered);
  };

  const handleAddToMyWorkout = (selectedItem) => {
  // Show a dialog box to select a workout from the created workouts list
  const workoutsList = myWorkouts.map((workout) => ({
    text: workout.name,
    onPress: () => {
      const updatedWorkouts = [...selectedWorkouts, selectedItem];
      setSelectedWorkouts(updatedWorkouts);

      // Add the selected exercise to the chosen workout
      workout.exercises.push(selectedItem);

      // Save the updated workouts to AsyncStorage
      saveWorkoutsToAsyncStorage();

      // Show a success message
      Alert.alert('Exercise Added', `${selectedItem.name} added to ${workout.name}`);
    },
  }));

  // Add a cancel option to the workouts list
  workoutsList.push({
    text: 'Cancel',
    style: 'cancel', // This will display the button as a cancel button on iOS
    onPress: () => {
      // Do nothing, as the user has canceled the action
    },
  });

  // Show a dialog with the list of created workouts to select from
  Alert.alert('Select a Workout', '', workoutsList);
};


  const renderItem = ({ item }) => (
    <View style={[styles.workoutContainer, isDarkTheme && styles.darkText]}>
      <View style={[styles.workoutImageContainer, isDarkTheme && styles.darkText]}>
        <Image source={item.image} style={styles.workoutImage} />
      </View>
      <View style={[styles.workoutInfoContainer, isDarkTheme && styles.darkText]}>
        <Text style={[styles.workoutName, isDarkTheme && styles.darkText]}>{item.name}</Text>
        <Text style={[styles.workoutName, isDarkTheme && styles.darkText]}>{item.reps}</Text>
      </View>
      <TouchableOpacity onPress={() => handleAddToMyWorkout(item)}>
        <Ionicons name="add-circle" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  let title = null;
  if (searchQuery !== '' && filteredWorkouts.length > 0) {
    title = <Text style={styles.title}>Results for: {searchQuery}</Text>;
  }

  return (
    <View style={[styles.container, isDarkTheme && styles.darkText]}>
      <View style={[styles.toolbar, isDarkTheme && styles.darkText]}>
        <TextInput
          style={[styles.searchInput, isDarkTheme && styles.darkText]}
          placeholder="Search workouts..."
          placeholderTextColor={isDarkTheme ? '#999' : '#ccc'}
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
        />
      </View>
      {title}
      <FlatList
        data={filteredWorkouts}
        renderItem={renderItem}
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderColor: 'gray',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  workoutImageContainer: {
    alignItems: 'flex-start',
  },
  workoutInfoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  workoutImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  darkText: {
    color: '#FFFFFF', // Dark mode text color
  },
  darkBox: {
    backgroundColor: '#333333', // Dark mode background color for the box
  },
});

export default SearchScreen;
