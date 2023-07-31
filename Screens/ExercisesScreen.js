import React, { useEffect ,useState, useContext} from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../context/AppContext'; 

const ExercisesScreen = ({ route }) => {
  const { workout } = route.params;
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const { colors, isDarkTheme } = useContext(AppContext);

  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleWorkoutPress = (workout) => {
    setSelectedWorkout(workout);
  };
  const handleCloseModal = () => {
    setSelectedWorkout(null);
  };

  // Function to save the exercises of a workout in AsyncStorage
  const saveExercisesToAsyncStorage = async (workoutId, exercises) => {
    try {
      await AsyncStorage.setItem(`@exercises_${workoutId}`, JSON.stringify(exercises));
    } catch (error) {
      console.error('Error saving exercises to AsyncStorage:', error);
    }
  };

  // Function to load the exercises of a workout from AsyncStorage
  const loadExercisesFromAsyncStorage = async (workoutId) => {
    try {
      const exercisesString = await AsyncStorage.getItem(`@exercises_${workoutId}`);
      if (exercisesString) {
        const exercises = JSON.parse(exercisesString);
        // Do something with the loaded exercises, if needed
      }
    } catch (error) {
      console.error('Error loading exercises from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Load exercises from AsyncStorage when the component mounts
    loadExercisesFromAsyncStorage(workout.id);
  }, [workout.id]);

  const renderItem = ({ item }) => (
    <View style={[styles.exerciseContainer, styles.shadow && isDarkTheme && styles.darkText && styles.darkBox]}>
      <View style={[styles.exerciseImageContainer , isDarkTheme && styles.darkText]}>
        <Image source={item.image} style={styles.exerciseImage} />
      </View>
      <View style={[styles.exerciseInfoContainer ,isDarkTheme && styles.darkText]}>
        <Text style={[styles.exerciseName,isDarkTheme && styles.darkText]}>{item.name}</Text>
        <Text style={[styles.exerciseReps, isDarkTheme && styles.darkText]}>{item.reps}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme && styles.darkText && styles.darkContainer]}>
      <Text style={[styles.title, isDarkTheme && styles.darkText]}>Exercises for {workout.name}</Text>
      <FlatList
        data={workout.exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {selectedWorkout && (
          <Modal animationType="fade" transparent={true} visible={true}>
            <View style={[styles.modalContainer, isDarkTheme && styles.darkText && styles.darkBox ]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleCloseModal}
                style={[styles.modalContent, isDarkTheme && styles.darkText && styles.darkContainer ]}
              >
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Ionicons name="close-circle-outline" size={30} color={isDarkTheme ? '#FFFFFF' : 'black'} />
                </TouchableOpacity>
                <Image source={selectedWorkout.image} style={styles.enlargedWorkoutImage} />
                <Text style={[styles.enlargedWorkoutName, isDarkTheme && styles.darkText]}>{selectedWorkout.name}</Text>
                <Text style={[styles.enlargedWorkoutReps, isDarkTheme && styles.darkText]}>{selectedWorkout.reps}</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: {
    
    backgroundColor: '#000000', // Dark mode background color
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'gray',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
  },
  exerciseImageContainer: {
    alignItems: 'flex-start',
  },
  exerciseInfoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  exerciseImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  exerciseReps: {
    fontSize: 16,
    marginTop: 5,
  },
  darkContainer: {
    
    backgroundColor: '#000000', // Dark mode background color
  },
  androidPadding: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  workoutPressed: {
    transform: [{ scale: 1.1 }],
    shadowOpacity: 0.5,
    elevation: 6,
  },
  workoutImageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  workoutInfoContainer: {
    flex: 2,
    marginLeft: 20,
  },
  workoutImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: 5,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  workoutReps: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  enlargedWorkoutImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  enlargedWorkoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  enlargedWorkoutReps: {
    fontSize: 20,
  },
  darkText: {
    color: '#FFFFFF', // Dark mode text color
  },
  darkBox: {
    backgroundColor: '#333333', // Dark mode background color for the box
},
closeButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 1,
},
});

export default ExercisesScreen;
