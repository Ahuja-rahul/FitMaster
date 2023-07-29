import React, { useState } from 'react';
import {StyleSheet,Text,View,Pressable,SafeAreaView,Platform,Image,ScrollView,Modal,TouchableOpacity,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Workout4Screen = () => {
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleWorkoutPress = (workout) => {
    setSelectedWorkout(workout);
  };

  const workouts = [
    {
      id: 1,
      name: 'Incline Dumbbell Press ',
      reps: '12 reps and 4 sets, increse weight each set',
      image: require('../assets/Workout4screen/InclineDumbbellPress.gif'),
      
    },
    {
      id: 2,
      name: 'Close-Grip Bench Press',
      reps: '12 reps and 4 sets, increse weight each set',
      image: require('../assets/Workout4screen/CloseGripBenchPress.gif'),
    },
    {
      id: 3,
      name: 'Ring Push-Ups',
      reps: '12 reps and 4 sets, increse weight each set',
      image: require('../assets/Workout4screen/RingPush-Ups.gif'),
    },
    {
      id: 4,
      name: 'Dumbbell Floor Press',
      reps: '12 reps and 4 sets, increse weight each set',
      image: require('../assets/Workout4screen/DumbbellFloorPress.gif'),
    },
    {
      id: 5,
      name: 'Plyometric Push-Ups',
      reps: '12 reps and 4 sets, increse weight each set',
      image: require('../assets/Workout4screen/PlyometricPushUps.gif'),
    },
    {
      id: 6,
      name: 'Cable Crossove',
      reps: '12 reps and 4 sets, increse weight each set',
      image: require('../assets/Workout4screen/CableCrossover.gif'),
    },
    {
      id: 7,
      name: 'Weighted Dips',
      reps: '25 reps 4 sets no rest',
      image: require('../assets/Workout4screen/WeightedDips.gif'),
    },
    {
      id: 8,
      name: 'Dimond Push-Ups',
      reps: '25 reps 4 sets no rest',
      image: require('../assets/Workout4screen/DiamondPushUps.gif'),
    },
    {
      id: 9,
      name: 'Both arms dumbbell',
      reps: '25 reps 4 sets no rest',
      image: require('../assets/Workout4screen/Botharmsdumbbell.gif'),
    },
  ];
  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && styles.androidPadding]}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.toolbar}></View>
        <View style={styles.content}>
          {workouts.map((workout) => (
            <Pressable
              key={workout.id}
              onPress={() => handleWorkoutPress(workout)}
              style={({ pressed }) => [
                styles.workoutContainer,
                pressed ? styles.workoutPressed : {},
              ]}
            >
              <View style={styles.workoutImageContainer}>
                <Image source={workout.image} style={styles.workoutImage} />
              </View>
              <View style={styles.workoutInfoContainer}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutReps}>{workout.reps}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        {selectedWorkout && (
          <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelectedWorkout(null)}
                style={styles.modalContent}
              >
                <Image source={selectedWorkout.image} style={styles.enlargedWorkoutImage} />
                <Text style={styles.enlargedWorkoutName}>{selectedWorkout.name}</Text>
                <Text style={styles.enlargedWorkoutReps}>{selectedWorkout.reps}</Text>
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
});

export default Workout4Screen;
