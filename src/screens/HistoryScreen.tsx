import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

// Dummy data for demonstration
const dummyStories = [
  {
    id: '1',
    title: 'an adventure to find the fc',
    content: 'In the heart of the dense Amazon rainforest, lay a rumor so enticing that adventurers from all corners of the globe were drawn to its mysteri...',
    date: 'Thu, Oct 24, 2024',
    time: '6:48 PM',
  },
  {
    id: '2',
    title: 'a story of a lost city',
    content: 'Once upon a time, in a land of mystical creatures and whimsical beings, there existed a lost city that had been hidden from the world for ...',
    date: 'Thu, Oct 24, 2024',
    time: '6:48 PM',
  },
];

const HistoryScreen = () => {
  const { isDarkMode } = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.storyCard, isDarkMode && styles.darkStoryCard]}
    >
      <View style={styles.storyHeader}>
        <View style={styles.titleContainer}>
          <Icon name="clock-outline" size={24} color="#6B4EFF" />
          <Text style={[styles.storyTitle, isDarkMode && styles.darkText]}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon
            name="dots-vertical"
            size={24}
            color={isDarkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.storyContent, isDarkMode && styles.darkText]}>
        {item.content}
      </Text>
      
      <Text style={[styles.storyDate, isDarkMode && styles.darkText]}>
        {item.date} {item.time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>
        History
      </Text>
      <FlatList
        data={dummyStories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  darkStoryCard: {
    backgroundColor: '#1E1E1E',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  storyContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  storyDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default HistoryScreen;