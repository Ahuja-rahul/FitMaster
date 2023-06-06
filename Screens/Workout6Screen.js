import { StyleSheet, Text, View, Pressable, SafeAreaView, Platform, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Workout6Screen = () => {
  const navigation = useNavigation();

  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
  };

 
const workouts = [
  {
    id: 1,
    name: 'Barbell Squat with Chains',
    reps: '10 reps',
    image: require('../assets/Workout6screen/BarbellSquatwithChains.gif'),
  },
  {
    id: 2,
    name: 'Bulgarian Split Squats',
    reps: '12 reps',
    image: require('../assets/Workout6screen/BulgarianSplitSquats.gif'),
  },
  {
    id: 3,
    name: 'Pistol Squats',
    reps: '12 reps',
    image: require('../assets/Workout6screen/PistolSquats.gif'),
  },
  {
    id: 4,
    name: 'Standing Barbell Overhead Press',
    reps: '12 reps',
    image: require('../assets/Workout6screen/StandingBarbellOverheadPress.gif'),
  },
  {
    id: 5,
    name: 'Handstand Push-ups',
    reps: '12 reps',
    image: require('../assets/Workout6screen/HandstandPushups.gif'),
  },
  {
    id: 6,
    name: 'Arnold Press',
    reps: '12 reps',
    image: require('../assets/Workout6screen/ArnoldPress.gif'),
  },
  {
    id: 7,
    name: 'Dumbbell Lateral Raises',
    reps: '12 reps',
    image: require('../assets/Workout6screen/DumbbellLateralRaises.gif'),
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

export default Workout6Screen;

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
    marginBottom: 5,
    borderColor: 'gray',
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      ios: {
        // No shadow styles for iOS
      },
    }),
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
    marginTop: 10,
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


