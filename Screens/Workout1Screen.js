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
      image: require('../assets/Workout1screens/Pull-ups.jpg'),
    },
    {
      id: 2,
      name: 'Lat Pulldowns',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screens/LatPulldowns.jpg'),
    },
    {
      id: 3,
      name: 'Dumbbell Rows',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screens/DumbbellRows.jpg'),
    },
    {
      id: 4,
      name: 'Barbell Rows',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screens/BarbellRows.jpg'),
    },
    {
      id: 5,
      name: 'Hammer Curls',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screens/HammerCurls.jpg'),
    },
    {
      id: 6,
      name: 'Alternating Dumbbell Curls',
      reps: '12 reps and 3 sets',
      image: require('../assets/Workout1screens/AlternatingDumbbellCurls.jpg'),
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
