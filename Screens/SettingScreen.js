import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Image, Modal, TextInput, Button, TouchableOpacity } from 'react-native';

const SettingScreen = ({ navigation }) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [profileName, setProfileName] = useState('Guest');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
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

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Profile</Text>
      <View onPress={goToProfile} style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/icon.png')}
        />
        <Text style={styles.profileName}>{profileName}</Text>
        
      </View>
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
      <Text style={styles.subtitle}>Profile</Text>
      <View style={styles.settingItem}>
        <Text>Profile Name</Text>
        <Button title="Change Name" onPress={handleModalOpen} />
      </View>
      <View style={styles.settingItem}>
        <Text>Boby Measurement</Text>
        <Button title="Go to measurement" onPress={goToProfile} />
      </View>
      
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
              <View style={{ paddingRight: 8 }}>
                <Button title="Cancel" onPress={handleModalClose} />
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalTextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default SettingScreen;