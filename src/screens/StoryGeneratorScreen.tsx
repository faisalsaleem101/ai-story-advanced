import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../context/ThemeContext';
import { generateStory } from '../services/geminiService';
import { genres } from '../constants/genres';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  WithSpringConfig
} from 'react-native-reanimated';

const springConfig: WithSpringConfig = {
  damping: 15,
  stiffness: 100,
};

const StoryGeneratorScreen = () => {
  const { isDarkMode } = useTheme();
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('short');
  const [creativity, setCreativity] = useState(0.5);
  const [genre, setGenre] = useState('fantasy');
  const [genreOpen, setGenreOpen] = useState(false);
  const [style, setStyle] = useState('random');
  const [styleOpen, setStyleOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const buttonScale = useSharedValue(1);

  const handleGenerate = async () => {
    buttonScale.value = withSequence(
      withSpring(0.95, springConfig),
      withDelay(
        100,
        withSpring(1, springConfig)
      )
    );
    
    setLoading(true);
    try {
      const story = await generateStory(
        topic,
        length,
        creativity,
        genre,
        style
      );
      // Save to history and handle the response
    } catch (error) {
      console.error('Error generating story:', error);
    }
    setLoading(false);
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.header}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
              Create Your Story
            </Text>
          </View>

          <View style={styles.lengthContainer}>
            {['Short', 'Medium', 'Long'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.lengthButton,
                  length === option.toLowerCase() && styles.activeLength,
                  isDarkMode && styles.darkButton,
                ]}
                onPress={() => setLength(option.toLowerCase())}
              >
                <Text
                  style={[
                    styles.lengthText,
                    length === option.toLowerCase() && styles.activeLengthText,
                    isDarkMode && styles.darkText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Describe your story idea..."
            placeholderTextColor={isDarkMode ? '#888' : '#666'}
            value={topic}
            onChangeText={setTopic}
            multiline
          />

          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={genreOpen}
              value={genre}
              items={genres}
              setOpen={setGenreOpen}
              setValue={setGenre}
              style={[styles.dropdown, isDarkMode && styles.darkDropdown]}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                isDarkMode && styles.darkDropdownContainer,
              ]}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <Animated.View style={[styles.generateButtonContainer, buttonAnimatedStyle]}>
            <TouchableOpacity
              style={[styles.generateButton, loading && styles.loadingButton]}
              onPress={handleGenerate}
              disabled={loading}
            >
              <Text style={styles.generateButtonText}>
                {loading ? 'Creating Magic...' : 'Generate Story'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  lengthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lengthButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkButton: {
    backgroundColor: '#333',
  },
  activeLength: {
    backgroundColor: '#6B4EFF',
  },
  lengthText: {
    fontSize: 16,
    color: '#000',
  },
  activeLengthText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  dropdownWrapper: {
    marginBottom: 20,
    zIndex: 5000,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 15,
  },
  darkDropdown: {
    backgroundColor: '#333',
    borderColor: '#444',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderRadius: 15,
  },
  darkDropdownContainer: {
    backgroundColor: '#333',
    borderColor: '#444',
  },
  generateButtonContainer: {
    marginTop: 20,
  },
  generateButton: {
    backgroundColor: '#6B4EFF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#6B4EFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loadingButton: {
    opacity: 0.7,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StoryGeneratorScreen;