import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';

const ExercisesScreen = ({ route }) => {
  const { workout } = route.params;

  const renderItem = ({ item }) => (
    <View style={[styles.exerciseContainer, styles.shadow]}>
      <View style={styles.exerciseImageContainer}>
        <Image source={item.image} style={styles.exerciseImage} />
      </View>
      <View style={styles.exerciseInfoContainer}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseReps}>{item.reps}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises for {workout.name}</Text>
      <FlatList
        data={workout.exercises}
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
});

export default ExercisesScreen;
