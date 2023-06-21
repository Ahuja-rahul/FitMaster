import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Image, Pressable } from 'react-native';

const SettingScreen = ({ navigation }) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goToProfile} style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/icon.png')}
        />
        <Text style={styles.profileName}>John Doe</Text>
      </Pressable>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>General</Text>
      <View style={styles.settingItem}>
        <Text>Notifications</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={toggleNotification}
        />
      </View>
      <View style={styles.settingItem}>
        <Text>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingScreen;
