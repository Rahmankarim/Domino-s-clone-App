import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [locationAccess, setLocationAccess] = React.useState(true);
  const [language, setLanguage] = React.useState('en');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Enable Notifications */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      {/* Enable Dark Mode */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Location Access */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Allow Location Access</Text>
        <Switch value={locationAccess} onValueChange={setLocationAccess} />
      </View>

      {/* Language Selection */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Select Language</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="German" value="de" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default Settings;
