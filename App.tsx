import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';

import HomeScreen from './src/screens/HomeScreen';
import StoryGeneratorScreen from './src/screens/StoryGeneratorScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ContactScreen from './src/screens/ContactScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PaperProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  switch (route.name) {
                    case 'Home':
                      iconName = focused ? 'home' : 'home-outline';
                      break;
                    case 'Create':
                      iconName = focused ? 'pencil' : 'pencil-outline';
                      break;
                    case 'History':
                      iconName = focused ? 'history' : 'history';
                      break;
                    case 'Contact':
                      iconName = focused ? 'email' : 'email-outline';
                      break;
                    case 'Settings':
                      iconName = focused ? 'cog' : 'cog-outline';
                      break;
                    default:
                      iconName = 'circle';
                  }

                  return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6B4EFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: '#1E1E1E',
                  borderTopWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  height: 60,
                  paddingBottom: 8,
                  paddingTop: 8,
                },
                tabBarLabelStyle: {
                  fontSize: 12,
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen 
                name="Create" 
                component={StoryGeneratorScreen}
                options={{ title: 'Create Story' }}
              />
              <Tab.Screen name="History" component={HistoryScreen} />
              <Tab.Screen name="Contact" component={ContactScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}