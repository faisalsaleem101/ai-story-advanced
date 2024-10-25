import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { sendEmail } from '../services/emailService';

const ContactScreen = () => {
  const { isDarkMode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSending(true);
    try {
      await sendEmail({
        to: 'faisalsaleem101@hotmail.com',
        subject: `Contact Form Submission from ${name}`,
        body: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
      
      Alert.alert('Success', 'Message sent successfully');
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Image
        source={require('../assets/contact-illustration.png')}
        style={styles.illustration}
      />
      
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Full Name"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.messageInput, isDarkMode && styles.darkInput]}
        placeholder="Message"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          sending && styles.disabledButton
        ]}
        onPress={handleSubmit}
        disabled={sending}
      >
        <Text style={styles.submitButtonText}>
          {sending ? 'Sending...' : 'Send Message'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  illustration: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  messageInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6B4EFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#4a3eb1',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactScreen;