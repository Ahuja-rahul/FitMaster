import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Image, Modal, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notification from  'expo-notifications' 

const SettingScreen = ({ navigation }) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [profileName, setProfileName] = useState('Guest');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [reminders, setReminders] = useState([]);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');
  const [newReminderTimePickerVisible, setNewReminderTimePickerVisible] = useState(false);


  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const toggleNotification = (value) => {
    setNotificationEnabled(value);
    if (value) {
      console.log("Permision granted");
      Notification.scheduleNotificationAsync({
        content: {
          title: "Local Notification",
          body: "This is local notification",
        
        },
        trigger: {
          seconds: 3,
        },
      });
    } else {
     console.log("No permition");
    }
  };
  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleProfileNameChange = (text) => {
    setProfileName(text);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
    setNewProfileName(profileName);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSaveProfileName = () => {
    setProfileName(newProfileName);
    setModalVisible(false);
  };

  const handleAddReminder = () => {
    const newReminder = {
      id: Date.now().toString(),
      title: newReminderTitle,
      time: newReminderTime,
    };

    setReminders([...reminders, newReminder]);
    setNewReminderTitle('');
    setNewReminderTime('');
  };

  const handleDeleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };

  const handleTimePicker = () => {
    setNewReminderTimePickerVisible(true);
  };

  const handleTimePickerConfirm = (event, selectedTime) => {
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      setNewReminderTime(formattedTime);
    }
    setNewReminderTimePickerVisible(false);
  };

  const handleTimePickerCancel = () => {
    setNewReminderTimePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Profile</Text>
      <TouchableOpacity style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/icon.png')}
        />
        <Text style={styles.profileName}>{profileName}</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Settings</Text>

      <Text style={styles.title}>Profile</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Profile Name</Text>
        <Button title="Change Name" onPress={handleModalOpen} />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Body Measurement</Text>
        <Button title="Go to Measurement" onPress={goToProfile} />
      </View>
      <Text style={styles.title}>General</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={toggleNotification}
        />
     
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      <Text style={styles.title}>Reminders</Text>
      <View style={styles.addReminderContainer}>
        <TextInput
          style={styles.addReminderInput}
          placeholder="Enter reminder title"
          value={newReminderTitle}
          onChangeText={setNewReminderTitle}
        />
        <TouchableOpacity style={styles.timePickerButton} onPress={handleTimePicker}>
          <Text style={styles.timePickerButtonText}>{newReminderTime || 'Select Time'}</Text>
        </TouchableOpacity>
        <Button title="Add" onPress={handleAddReminder} />
      </View>
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text>{item.title}</Text>
            <Text style={styles.reminderTime}>{item.time}</Text>
            <TouchableOpacity onPress={() => handleDeleteReminder(item.id)}>
              <Text style={styles.deleteReminderText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {newReminderTimePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimePickerConfirm}
          onCancel={handleTimePickerCancel}
        />
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Profile Name</Text>
            <TextInput
              style={styles.modalTextInput}
              value={newProfileName}
              onChangeText={setNewProfileName}
            />
            <View style={styles.modalButtonContainer}>
              <View style={styles.modalButton}>
                <Button title="Cancel" onPress={handleModalClose} color="#666" />
              </View>
              <Button title="Save" onPress={handleSaveProfileName} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#666',
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  modalTextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    width: '100%',
    color: '#333',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 12,
  },
  modalButton: {
    paddingRight: 8,
  },
  addReminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addReminderInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 40,
  },
  timePickerButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  timePickerButtonText: {
    color: '#333',
  },
  reminderItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderTime: {
    color: '#999',
    fontSize: 12,
  },
  deleteReminderText: {
    color: 'red',
    fontSize: 12,
  },
});

export default SettingScreen;
