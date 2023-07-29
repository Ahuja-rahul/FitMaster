import { StyleSheet, Text, View, Pressable, SafeAreaView, Platform, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Workout1Screen = () => {
  const navigation = useNavigation();

  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const workouts = [
    {
      id: 1,
      name: 'Pull-ups',
      reps: '8 reps and 3 sets',
      image: require('../assets/Workout1screen/Pullups.gif'),
    },
    {
      id: 2,
      name: 'Lat Pulldowns',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/LatPulldowns.gif'),
    },
    {
      id: 3,
      name: 'Dumbbell Rows',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/DumbbellRows.gif'),
    },
    {
      id: 4,
      name: 'Barbell Rows',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/BarbellRows.gif'),
    },
    {
      id: 5,
      name: 'Hammer Curls',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/HammerCurls.gif'),
    },
    {
      id: 6,
      name: 'Alternating Dumbbell Curls',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && styles.androidPadding]}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.toolbar}>
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

export default Workout1Screen;

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
});
