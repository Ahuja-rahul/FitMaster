import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export var hour;
export var minute;

export default function Reminder() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
}

export async function scheduleReminder(hour, minute, newReminderTitle) {
  // Get the current date and time.
  const now = new Date();

  // Set the time you want the notification to be triggered (e.g., 10:00 AM).
  var notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

  // If the notification time is in the past, add one day to it to ensure it triggers tomorrow.
  if (notificationTime < now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }

  // Calculate the number of seconds between the current time and the notification time.
  const secondsUntilNotification = (notificationTime.getTime() - now.getTime()) / 1000;

  // Check if the time interval is greater than 0.
  if (secondsUntilNotification <= 0) {
    // You can throw an error here or handle it gracefully as per your requirements.
    throw new Error('Time interval for notification must be greater than 0 seconds.');
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to get up.",
      body: newReminderTitle,
      data: { data: 'goes here' },
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

  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  return token;
}