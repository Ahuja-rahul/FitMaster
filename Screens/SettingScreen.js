import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Switch, Image, Modal, TextInput, Button, TouchableOpacity, FlatList, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Reminder from './components/Reminder';
import { hour, minute, scheduleReminder } from './components/Reminder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

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
  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext)




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
    const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 53, 0);

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

      console.log("Using Emulator")
    }

    return token;
  }

  function add() {
    alert(`Reminder for ${globalHours}:${globalMinutes} has been added.`);
    scheduleReminder(globalHours, globalMinutes, newReminderTitle);
  }

  return (
    <ScrollView>
      <View style={[styles.settingText, isDarkTheme && styles.darkText]}>
      <Text style={[styles.title, isDarkTheme && styles.darkText]}>Profile</Text>
        <TouchableOpacity style={[styles.profileContainer, isDarkTheme && styles.darkText && styles.darkContainer]}>
          <Image
            style={styles.profileImage}
            source={require('../assets/icon.png')}
          />
          <Text style={[styles.title, isDarkTheme && styles.darkText]}>{profileName}</Text>
        </TouchableOpacity>



 
        <View style={styles.settingItem}>
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Profile Name</Text>
          <Button title="Change Name" onPress={handleModalOpen} />
        </View>
        <Text style={[styles.title, isDarkTheme && styles.darkText]}>Body Measurements</Text>
        <View style={styles.settingItem}>        
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Height</Text>
          <TextInput
            style={[styles.settingText, styles.input, isDarkTheme && styles.darkText]}
            placeholder="Enter height in cm"
            placeholderTextColor={isDarkTheme ? "#999" : "#ccc"}
            value={bodyMeasurements.height}
            onChangeText={(text) => {
              // Check if the input is a positive number before updating the state
              if (/^\d*\.?\d*$/.test(text)) {
                setBodyMeasurements({ ...bodyMeasurements, height: text });
              }
            }}
            keyboardType="numeric" // Only allow numeric input
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Weight</Text>
          <TextInput
            style={[styles.settingText, styles.input, isDarkTheme && styles.darkText]}
            placeholder="Enter weight"
            placeholderTextColor={isDarkTheme ? "#999" : "#ccc"}
            value={bodyMeasurements.weight}
            onChangeText={(text) => {
              // Check if the input is a positive number before updating the state
              if (/^\d*\.?\d*$/.test(text)) {
                setBodyMeasurements({ ...bodyMeasurements, weight: text });
              }
            }}
            keyboardType="numeric" // Only allow numeric input
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Chest</Text>
          <TextInput
            style={[styles.settingText,  styles.input,isDarkTheme && styles.darkText]}
            placeholder="Enter chest measurement"
            placeholderTextColor={isDarkTheme ? "#999" : "#ccc"}
            value={bodyMeasurements.chest}
            onChangeText={(text) => {
              // Check if the input is a positive number before updating the state
              if (/^\d*\.?\d*$/.test(text)) {
                setBodyMeasurements({ ...bodyMeasurements, chest: text });
              }
            }}
            keyboardType="numeric" // Only allow numeric input
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Waist</Text>
          <TextInput
            style={[styles.settingText, styles.input, isDarkTheme && styles.darkText]}
            placeholder="Enter waist measurement"
            placeholderTextColor={isDarkTheme ? "#999" : "#ccc"}
            value={bodyMeasurements.waist}
            onChangeText={(text) => {
              // Check if the input is a positive number before updating the state
              if (/^\d*\.?\d*$/.test(text)) {
                setBodyMeasurements({ ...bodyMeasurements, waist: text });
              }
            }}
            keyboardType="numeric" // Only allow numeric input
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Hips   </Text>
          <TextInput
            style={[styles.settingText, styles.input, isDarkTheme && styles.darkText]}
            placeholder="Enter hips measurement"
            placeholderTextColor={isDarkTheme ? "#999" : "#ccc"}
            value={bodyMeasurements.hips}
            onChangeText={(text) => {
              // Check if the input is a positive number before updating the state
              if (/^\d*\.?\d*$/.test(text)) {
                setBodyMeasurements({ ...bodyMeasurements, hips: text });
              }
            }}
            keyboardType="numeric" // Only allow numeric input
          />
        </View>
        <Text style={[styles.title, isDarkTheme && styles.darkText]}>General</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Notifications</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={toggleNotification}
          />
        </View>

        {/* <View style={styles.settingItem}>
  <Text style={[styles.settingText, darkModeEnabled && styles.darkText]}>Dark Mode</Text>
  <Switch
    value={darkModeEnabled}
    onValueChange={setDarkModeEnabled}
  />
</View> */}

        <View style={[styles.settingItem, isDarkTheme && styles.darkText]}>
          <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Dark Mode</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={(value) => setIsDarkTheme(value)}
          />
        </View>


        <Text style={[styles.subtitle, isDarkTheme && styles.darkText]}>Reminders</Text>
        <View style={styles.addReminderContainer}>
          <TextInput
            style={[styles.addReminderInput, isDarkTheme && styles.darkText]}
            placeholder="Enter reminder title"
            placeholderTextColor={isDarkTheme ? "#999" : "#ccc"}
            value={newReminderTitle}
            onChangeText={setNewReminderTitle}
          />
          <TouchableOpacity style={[styles.timePickerButton, isDarkTheme && styles.darkContainer]} onPress={handleTimePicker}>
            <Text style={[styles.timePickerButtonText, isDarkTheme && styles.darkText]}>{newReminderTime || 'Select Time'}</Text>
          </TouchableOpacity>
          <Button title="Add" onPress={add} />
        </View>



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
          <View style={[styles.modalContainer, isDarkTheme && styles.darkText && styles.darkBox]}>
            <View style={[styles.modalContent, isDarkTheme && styles.darkText && styles.darkContainer]}>
              <Text style={[styles.title, isDarkTheme && styles.darkText]}>Change Profile Name</Text>
              <TextInput
                style={[styles.subtitle, isDarkTheme && styles.darkText]}
                value={newProfileName}
                onChangeText={setNewProfileName}
              />
              <View style={[styles.modalButtonContainer, isDarkTheme && styles.darkText]}>
                <View style={styles.modalButtonis}>
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    color: '#333',
    paddingLeft: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#666',
    paddingLeft: 10,
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
    paddingLeft: 10,
    paddingRight: 10,
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
  darkProfileContainer: {
    backgroundColor: '#333',
    borderColor: '#666',
  },
  darkTextInput: {
    backgroundColor: '#333',
    borderColor: '#666',
    color: '#FFFFFF',
  },
  darkBox: {
    backgroundColor: '#333333', // Dark mode background color for the box
  },
  
  
});


export default SettingScreen;