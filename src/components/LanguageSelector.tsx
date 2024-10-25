import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageSelect = async (lang: string) => {
    await setLanguage(lang);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.languageButton, isDarkMode && styles.darkButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.languageText, isDarkMode && styles.darkText]}>
          {availableLanguages.find(lang => lang.value === language)?.label || 'Select Language'}
        </Text>
        <Icon name="chevron-down" size={24} color={isDarkMode ? '#fff' : '#000'} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModalContent]}>
            <Text style={[styles.modalTitle, isDarkMode && styles.darkText]}>
              Select Language
            </Text>
            <FlatList
              data={availableLanguages}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    language === item.value && styles.selectedLanguage,
                    isDarkMode && styles.darkLanguageItem,
                  ]}
                  onPress={() => handleLanguageSelect(item.value)}
                >
                  <Text style={[
                    styles.languageItemText,
                    language === item.value && styles.selectedLanguageText,
                    isDarkMode && styles.darkText,
                  ]}>
                    {item.label}
                  </Text>
                  {language === item.value && (
                    <Icon name="check" size={24} color="#6B4EFF" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
  darkButton: {
    backgroundColor: '#333',
  },
  languageText: {
    fontSize: 16,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  darkModalContent: {
    backgroundColor: '#1E1E1E',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkLanguageItem: {
    borderBottomColor: '#333',
  },
  selectedLanguage: {
    backgroundColor: '#f0f0f0',
  },
  languageItemText: {
    fontSize: 16,
    color: '#000',
  },
  selectedLanguageText: {
    color: '#6B4EFF',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#6B4EFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSelector;