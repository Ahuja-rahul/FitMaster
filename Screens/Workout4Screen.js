import { StyleSheet, Text, View, Pressable, SafeAreaView, Platform, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Workout4Screen = () => {
  const navigation = useNavigation();

  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
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
        <View style={styles.toolbar}>
          <Pressable onPress={() => handleBoxPress('Dash')}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.content}>
          {workouts.map((workout) => (
            <View key={workout.id} style={styles.workoutContainer}>
              <View style={styles.workoutImageContainer}>
                <Image source={workout.image} style={styles.workoutImage} />
              </View>
              <View style={styles.workoutInfoContainer}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutReps}>{workout.reps}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workout4Screen;

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
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutImageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  workoutInfoContainer: {
    flex: 2,
    marginLeft: 20,
  },
  workoutImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
});
