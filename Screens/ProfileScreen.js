import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { myMeasurements } from './Data/workouts';

const ProfileScreen = () => {
  const [measurements, setMeasurements] = useState(myMeasurements);
  const [editingIndex, setEditingIndex] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleAddMeasurement = () => {
    if (height.trim() === '' || weight.trim() === '') {
      return;
    }

    const newMeasurement = {
      date: new Date().toDateString(),
      height: parseInt(height),
      weight: parseInt(weight),
    };

    setMeasurements([...measurements, newMeasurement]);
    setHeight('');
    setWeight('');
  };

  const handleEditMeasurement = (index) => {
    const measurementToEdit = measurements[index];
    setEditingIndex(index);
    setHeight(measurementToEdit.height.toString());
    setWeight(measurementToEdit.weight.toString());
  };

  const handleSaveMeasurement = () => {
    if (height.trim() === '' || weight.trim() === '') {
      return;
    }

    const updatedMeasurement = {
      date: measurements[editingIndex].date,
      height: parseInt(height),
      weight: parseInt(weight),
    };

    const updatedMeasurements = [...measurements];
    updatedMeasurements[editingIndex] = updatedMeasurement;
    setMeasurements(updatedMeasurements);
    setEditingIndex(null);
    setHeight('');
    setWeight('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setHeight('');
    setWeight('');
  };

  const handleRemoveMeasurement = (index) => {
    const updatedMeasurements = [...measurements];
    updatedMeasurements.splice(index, 1);
    setMeasurements(updatedMeasurements);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.select({ ios: 0, android: 25 })}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.title}>Profile</Text> */}
        <Text style={styles.subtitle}>Body Measurements</Text>
        {measurements.map((measurement, index) => (
          <View key={index} style={styles.measurementItem}>
            <View style={styles.measurementData}>
              <View>
                <Text>Height: {measurement.height} cm</Text>
                <Text>Weight: {measurement.weight} kg</Text>
              </View>
              <Text style={styles.date}>{measurement.date}</Text>
            </View>
            {editingIndex === index ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Height (cm)"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Weight (kg)"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                />
                <View style={styles.buttonContainer}>
                  <Button title="Save" onPress={handleSaveMeasurement} />
                  <Button title="Cancel" onPress={handleCancelEdit} color="red" />
                </View>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEditMeasurement(index)} />
                <Button title="Remove" onPress={() => handleRemoveMeasurement(index)} color="red" />
              </View>
            )}
          </View>
        ))}
        {editingIndex === null && (
          <View style={styles.addContainer}>
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            <Button title="Add Measurement" onPress={handleAddMeasurement} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  measurementItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  measurementData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    alignSelf: 'flex-end',
    marginBottom: 4,
    marginRight: 8,
  },
  editContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  addContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ProfileScreen;
