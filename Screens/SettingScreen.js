import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Switch, Image, Modal, TextInput, Button, TouchableOpacity, FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Reminder from './components/Reminder';
import { hour, minute, scheduleReminder } from './components/Reminder';


var globalHours = 23;
var globalMinutes = 59;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const toggleNotification = async (value) => {
    setNotificationEnabled(value);
    if (value) {
      await schedulePushNotification();
    } else {
      console.log("No permission");
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
      globalHours = hours;
      const minutes = selectedTime.getMinutes();
      globalMinutes = minutes
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
      {/* <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View> */}

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
        <Button title="Add" onPress={add()} />
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

async function schedulePushNotification() {

 // Get the current date and time.
 const now = new Date();

 // Set the time you want the notification to be triggered (e.g., 10:00 AM).
 const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 2, 0);

 // If the notification time is in the past, add one day to it to ensure it triggers tomorrow.
 if (notificationTime < now) {
   notificationTime.setDate(notificationTime.getDate() + 1);
 }

 // Calculate the number of seconds between the current time and the notification time.
 const secondsUntilNotification = (notificationTime.getTime() - now.getTime()) / 1000;


  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Workout Boost 🏋️‍♀️",
      body: 'Good morning! Time to sweat it out and start your day with an energizing workout! 🏋️‍♂️💪',
    },
    trigger: { seconds: secondsUntilNotification },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


function add(){

  console.log(globalHours)
  scheduleReminder(globalHours, globalMinutes)
 }

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