import React, { useState, useContext } from 'react';
import {StyleSheet,Text,View,Pressable,SafeAreaView,Platform,Image,ScrollView,Modal,TouchableOpacity,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

const Banner3 = () => {
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const { colors, isDarkTheme } = useContext(AppContext);

  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleWorkoutPress = (workout) => {
    setSelectedWorkout(workout);
  };

  const workouts = [
    {
      id: 1,
      name: 'High Knees',
      reps: '8 reps and 3 sets',
      image: require('../assets/Workout1screen/Pullups.gif'),
    },
    {
      id: 2,
      name: 'Mountain Climbers',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/LatPulldowns.gif'),
    },
    {
      id: 3,
      name: 'Plank Jacks',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/DumbbellRows.gif'),
    },
    {
      id: 4,
      name: 'Speed Skaters',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/BarbellRows.gif'),
    },
    {
      id: 5,
      name: 'Tuck Jumps',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/HammerCurls.gif'),
    },
    {
      id: 6,
      name: 'Jump Squats',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
    },
    {
        id: 7,
        name: 'Butt Kicks',
        reps: '12 reps and 3 sets',
        image: require('../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
      },
      {
        id: 8,
        name: 'Jump lunges',
        reps: '12 reps and 3 sets',
        image: require('../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
      },
      {
        id: 9,
        name: 'Russian twists',
        reps: '12 reps and 3 sets',
        image: require('../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
      },
      {
        id: 10,
        name: 'Curtsy Squats',
        reps: '12 reps and 3 sets',
        image: require('../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
      },
  ];

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && styles.androidPadding, isDarkTheme && styles.darkText]}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={[styles.toolbar, isDarkTheme && styles.darkText]}></View>
        <View style={[styles.content, isDarkTheme && styles.darkContainer]}>
          {workouts.map((workout) => (
            <Pressable
              key={workout.id}
              onPress={() => handleWorkoutPress(workout)}
              style={({ pressed }) => [
                styles.workoutContainer,
                pressed ? styles.workoutPressed : {},
                isDarkTheme && styles.darkBox, // Add the darkBox style for background color
              ]}
            >
              <View style={styles.workoutImageContainer}>
                <Image source={workout.image} style={styles.workoutImage} />
              </View>
              <View style={styles.workoutInfoContainer}>
                <Text style={[styles.workoutName, isDarkTheme && styles.darkText]}>{workout.name}</Text>
                <Text style={[styles.workoutReps, isDarkTheme && styles.darkText]}>{workout.reps}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {selectedWorkout && (
          <Modal animationType="fade" transparent={true} visible={true}>
            <View style={[styles.modalContainer, isDarkTheme && styles.darkText]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelectedWorkout(null)}
                style={[styles.modalContent, isDarkTheme && styles.darkText]}
              >
                <Image source={selectedWorkout.image} style={styles.enlargedWorkoutImage} />
                <Text style={[styles.enlargedWorkoutName, isDarkTheme && styles.darkText]}>{selectedWorkout.name}</Text>
                <Text style={[styles.enlargedWorkoutReps, isDarkTheme && styles.darkText]}>{selectedWorkout.reps}</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#000000', // Dark mode background color
  },
  androidPadding: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
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
});

export default Banner3;