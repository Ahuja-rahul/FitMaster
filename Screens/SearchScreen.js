import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { data, myWorkouts } from './Data/workouts';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(data);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const { colors, isDarkTheme } = useContext(AppContext);

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
    // Ask user to select a workout before adding an exercise
    Alert.alert(
      'Select a Workout',
      'Choose a workout from the list below:',
      [
        ...myWorkouts.map((item) => ({
          text: item.name,
          onPress: () => handleAddToWorkout(selectedItem, item),
        })),
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleAddToWorkout = (selectedItem, selectedWorkout) => {
    const updatedWorkouts = [...selectedWorkouts, selectedItem];
    setSelectedWorkouts(updatedWorkouts);
    selectedWorkout.exercises.push(selectedItem); // Add the selected exercise to the selected workout
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
          style={[styles.searchInput,, isDarkTheme && styles.darkText]}
          placeholder="Search workouts..."
          placeholderTextColor={isDarkTheme ? "#999" : "#ccc"}
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