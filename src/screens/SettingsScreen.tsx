import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const settingsOptions = [
    {
      title: 'Account',
      icon: 'account',
      onPress: () => {},
    },
    {
      title: 'Languages',
      icon: 'translate',
      onPress: () => {},
    },
    {
      title: 'Theme',
      icon: isDarkMode ? 'weather-night' : 'weather-sunny',
      onPress: toggleTheme,
    },
    {
      title: 'About Us',
      icon: 'information',
      onPress: () => {},
    },
    {
      title: 'Privacy Policy',
      icon: 'shield-check',
      onPress: () => {},
    },
    {
      title: 'Terms of Use',
      icon: 'file-document',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Icon
            name="account-circle"
            size={80}
            color={isDarkMode ? '#fff' : '#000'}
          />
          <Text style={[styles.email, isDarkMode && styles.darkText]}>
            faisalsaleem104@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          General
        </Text>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.option, isDarkMode && styles.darkOption]}
            onPress={option.onPress}
          >
            <View style={styles.optionLeft}>
              <Icon
                name={option.icon}
                size={24}
                color={isDarkMode ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, isDarkMode && styles.darkText]}>
                {option.title}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={24}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  email: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  darkText: {
    color: '#fff',
  },
  settingsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkOption: {
    borderBottomColor: '#333',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#000',
  },
});

export default SettingsScreen;