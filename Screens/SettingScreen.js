import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Switch, Image, Modal, TextInput, Button, TouchableOpacity, FlatList, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Reminder from './components/Reminder';
import { hour, minute, scheduleReminder } from './components/Reminder';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [bodyMeasurements, setBodyMeasurements] = useState({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
  });

  useEffect(() => {
    loadProfileData();
    loadReminders();
    loadBodyMeasurements();
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

  const handleModalOpen = () => {
    setModalVisible(true);
    setNewProfileName(profileName);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSaveProfileName = () => {
    setProfileName(newProfileName);
    saveProfileData(newProfileName);
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
      globalMinutes = minutes;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      setNewReminderTime(formattedTime);
    }
    setNewReminderTimePickerVisible(false);
  };

  const handleTimePickerCancel = () => {
    setNewReminderTimePickerVisible(false);
  };

  // Load profile data from AsyncStorage on component mount
  useEffect(() => {
    loadProfileData();
    loadReminders();
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

  // Function to load profile data from AsyncStorage
  const loadProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (profileData) {
        const { profileName } = JSON.parse(profileData);
        setProfileName(profileName);
      }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  // Function to load reminders data from AsyncStorage
  const loadReminders = async () => {
    try {
      const remindersData = await AsyncStorage.getItem('remindersData');
      if (remindersData) {
        const reminders = JSON.parse(remindersData);
        setReminders(reminders);
      }
    } catch (error) {
      console.log('Error loading reminders data:', error);
    }
  };

  // Function to save profile data to AsyncStorage
  const saveProfileData = async (profileName) => {
    const profileData = { profileName };
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
    } catch (error) {
      console.log('Error saving profile data:', error);
    }
  };

  // Function to save reminders data to AsyncStorage
  const saveReminders = async () => {
    try {
      await AsyncStorage.setItem('remindersData', JSON.stringify(reminders));
    } catch (error) {
      console.log('Error saving reminders data:', error);
    }
  };

  // Update profile name state and save it to AsyncStorage
  // const handleProfileNameChange = (text) => {
  //   setProfileName(text);
  //   saveProfileData(text);
  // };

  // Save reminders data to AsyncStorage whenever it changes
  useEffect(() => {
    saveReminders();
  }, [reminders]);


 const loadBodyMeasurements = async () => {
  try {
    const bodyMeasurementsData = await AsyncStorage.getItem('bodyMeasurementsData');
    if (bodyMeasurementsData) {
      const bodyMeasurements = JSON.parse(bodyMeasurementsData);
      setBodyMeasurements(bodyMeasurements);
    }
  } catch (error) {
    console.log('Error loading body measurements data:', error);
  }
};

// Function to save body measurements data to AsyncStorage
const saveBodyMeasurements = async () => {
  try {
    await AsyncStorage.setItem('bodyMeasurementsData', JSON.stringify(bodyMeasurements));
  } catch (error) {
    console.log('Error saving body measurements data:', error);
  }
};

// Save body measurements data to AsyncStorage whenever it changes
useEffect(() => {
  saveBodyMeasurements();
}, [bodyMeasurements]);

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
       //alert('Must use physical device for Push Notifications');
       console.log("Using Emulator")
     }
   
     return token;
   }

  function add() {
    console.log(globalHours);
    scheduleReminder(globalHours, globalMinutes);
  }

  return (
    <ScrollView>
      <View style={[styles.container, darkModeEnabled && styles.darkContainer]}>
        <Text style={[styles.subtitle, darkModeEnabled && styles.darkText]}>Profile</Text>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require('../assets/icon.png')}
          />
          <Text style={[styles.profileName, darkModeEnabled && styles.darkText]}>{profileName}</Text>
        </TouchableOpacity>
  
        <Text style={[styles.subtitle, darkModeEnabled && styles.darkText]}>Settings</Text>
  
        <Text style={[styles.title, darkModeEnabled && styles.darkText]}>Profile</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Profile Name</Text>
          <Button title="Change Name" onPress={handleModalOpen} />
        </View>
        <Text style={[styles.title, darkModeEnabled && styles.darkText]}>Body Measurements</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Height</Text>
          <TextInput
            style={[styles.settingInput, darkModeEnabled && styles.darkInput]}
            placeholder="Enter height"
            value={bodyMeasurements.height}
            onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, height: text })}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Weight</Text>
          <TextInput
            style={[styles.settingInput, darkModeEnabled && styles.darkInput]}
            placeholder="Enter weight"
            value={bodyMeasurements.weight}
            onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, weight: text })}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Chest</Text>
          <TextInput
            style={[styles.settingInput, darkModeEnabled && styles.darkInput]}
            placeholder="Enter chest measurement"
            value={bodyMeasurements.chest}
            onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, chest: text })}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Waist</Text>
          <TextInput
            style={[styles.settingInput, darkModeEnabled && styles.darkInput]}
            placeholder="Enter waist measurement"
            value={bodyMeasurements.waist}
            onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, waist: text })}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Hips</Text>
          <TextInput
            style={[styles.settingInput, darkModeEnabled && styles.darkInput]}
            placeholder="Enter hips measurement"
            value={bodyMeasurements.hips}
            onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, hips: text })}
          />
        </View>
        <Text style={[styles.title, darkModeEnabled && styles.darkText]}>General</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Notifications</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={toggleNotification}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
            //trackColor={{ false: "#767577", true: "#81b0ff" }} // Customize the switch colors if needed
            //thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"} // Customize the switch thumb color if needed
          />
        </View>
  
        <Text style={[styles.title, darkModeEnabled && styles.darkText]}>Reminders</Text>
        <View style={styles.addReminderContainer}>
          <TextInput
            style={[styles.addReminderInput, darkModeEnabled && styles.darkInput]}
            placeholder="Enter reminder title"
            value={newReminderTitle}
            onChangeText={setNewReminderTitle}
          />
          <TouchableOpacity style={styles.timePickerButton} onPress={handleTimePicker}>
            <Text style={styles.timePickerButtonText}>{newReminderTime || 'Select Time'}</Text>
          </TouchableOpacity>
          <Button title="Add" onPress={add} />
        </View>
  
        <FlatList
          data={reminders}
          renderItem={({ item }) => (
            <View style={styles.reminderItem}>
              <Text style={[styles.darkText]}>{item.title}</Text>
              <Text style={[styles.reminderTime, darkModeEnabled && styles.darkText]}>{item.time}</Text>
              <TouchableOpacity onPress={() => handleDeleteReminder(item.id)}>
                <Text style={[styles.deleteReminderText, darkModeEnabled && styles.darkText]}>Delete</Text>
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
              <Text style={[styles.modalTitle, darkModeEnabled && styles.darkText]}>Change Profile Name</Text>
              <TextInput
                style={[styles.modalTextInput, darkModeEnabled && styles.darkInput]}
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
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  darkContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000', // Dark mode background color
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
  darkText: {
    color: '#FFFFFF', // Dark mode text color
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
  darkText: {
    color: '#FFFFFF', // Dark mode text color
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
    color: '#333',
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