import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import LottieView from 'lottie-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  WithSpringConfig
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const springConfig: WithSpringConfig = {
  damping: 15,
  stiffness: 100,
};

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const titleOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  useEffect(() => {
    titleOpacity.value = withDelay(
      500,
      withSpring(1, springConfig)
    );
    buttonScale.value = withDelay(
      1000,
      withSpring(1, springConfig)
    );
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Animated.View style={[styles.content, titleStyle]}>
        <LottieView
          source={require('../assets/story-animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          AI Story Generator
        </Text>
        
        <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>
          Create unique stories with the power of AI
        </Text>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, buttonStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create')}
        >
          <Text style={styles.buttonText}>Start Creating</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.adPlaceholder}>
        <Text style={[styles.adText, isDarkMode && styles.darkText]}>
          Advertisement Space
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  darkText: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    maxWidth: '80%',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6B4EFF',
    paddingVertical: 15,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  adPlaceholder: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  adText: {
    color: '#666',
    fontSize: 14,
  },
});

export default HomeScreen;