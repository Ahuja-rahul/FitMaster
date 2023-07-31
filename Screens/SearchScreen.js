import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { data } from './Data/workouts'; // Import created workouts list
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal'; // Import the modal component
import { myWorkouts } from './MyWorkoutScreen';

var workouts;

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(data);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { colors, isDarkTheme } = useContext(AppContext);
  const [createdWorkouts, setCreatedWorkouts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false); // State to control the visibility of the custom modal

  // Function to save the workouts to AsyncStorage
  const saveWorkoutsToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@myWorkouts', JSON.stringify(myWorkouts));
      console.log("save data: " + JSON.stringify(myWorkouts));
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

  const loadWorkoutList = async () => {
    try {
      const workoutsString = await AsyncStorage.getItem('@myWorkouts');
      if (workoutsString) {
        workouts = JSON.parse(workoutsString);
        setCreatedWorkouts(workouts);
        workouts = workoutsString;
      }
    } catch (error) {
      console.error('Error loading workouts from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWorkoutList();
    });

    // Cleanup the event listener when the component unmounts
    return unsubscribe;
  }, [navigation]); // Make sure to add `navigation` to the dependency array


  const handleAddToMyWorkout = (selectedItem) => {
    // Show the custom modal with the list of created workouts to select from
    setModalVisible(true);
  };

  const handleWorkoutSelection = (workout) => {
    // Handle workout selection here using the previously stored selected item
    const updatedWorkouts = [...selectedWorkouts, selectedItem];
    setSelectedWorkouts(updatedWorkouts);
    console.log(JSON.stringify(selectedWorkouts));
  
    // Add the selected exercise to the chosen workout
    workout.exercises.push(selectedItem);
  
    // Save the updated workouts to AsyncStorage
    saveWorkoutsToAsyncStorage();
  
    // Show a success message
    // Alert.alert('Exercise Added', `${selectedItem.name} added to ${workout.name}`);
    Alert.alert('Exercise Added');

  
    // Hide the modal
    setModalVisible(false);
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

      {/* Custom Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          {createdWorkouts.map((workout) => (
            <TouchableOpacity
              key={workout.name}
              onPress={() => handleWorkoutSelection(workout)}
            >
              <Text style={styles.modalItemText}>{workout.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={[styles.modalItemText, styles.modalItemCancel]}>Cancel</Text>
          </TouchableOpacity>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  modalItemText: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: 'center',
  },
  modalItemCancel: {
    color: 'red',
  },
});

export default SearchScreen;